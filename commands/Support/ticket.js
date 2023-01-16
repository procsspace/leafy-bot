const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton, MessageCollector, MessageSelectMenu } = require("discord.js");
const axios = require("axios").default;
const wait = require("util").promisify(setTimeout);
const staffRole = "1062576768940249088";
const ticketSchema = require("../../models/ticket");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Create a ticket!")
        .addStringOption(option =>
            option
                .setName("category")
                .setDescription("The category for the ticket")
                .setRequired(true)
                .addChoices(
                    { name: 'Bug Report', value: 'ticket_bug' },
                    { name: 'User Report', value: 'ticket_reportUser' },
                    { name: 'Other', value: 'ticket_other' },


                )),
    isInDev: false,
    isStaffOnly: false,
    async execute(interaction) {
        const category = interaction.options.getString("category");
        const guild = interaction.guild;
        

        
        const newTicket = new ticketSchema({
            category: category,
            author: {
                id: interaction.user.id,
                tag: interaction.user.tag,
                username: interaction.user.username,
                avatar: interaction.user.avatarURL({ dynamic: true }),
            },

            // For each person that has staffRole as a role, add them to the staff array
            staff: guild.members.cache.filter(member => member.roles.cache.has(staffRole)).map(member => {
                return {
                    id: member.id,
                    tag: member.user.tag,
                    username: member.user.username,
                    avatar: member.user.avatarURL({ dynamic: true }),
                }
            }),



        })
            await newTicket.save().then(async (ticket) => {
                const ticketChannel = await guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: "GUILD_TEXT",
                    parent: "1064667325707591741",
                    topic: `Ticket ID: ${ticket._id}`,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ADD_REACTIONS", "ATTACH_FILES", "EMBED_LINKS"],
                        },
                        {
                            id: guild.roles.everyone,
                            deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ADD_REACTIONS", "ATTACH_FILES", "EMBED_LINKS"],
                        },
                        {
                            id: staffRole,
        
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ADD_REACTIONS", "ATTACH_FILES", "EMBED_LINKS"],
                        }
                    ],
                });
        
          
        
               
                    const embed = new MessageEmbed()
                        .setTitle(`Ticket`)
                        .setColor("RED")
                        .setDescription(`Your ticket has been created!`)
                        .setTimestamp();
        
                    await interaction.reply({ embeds: [embed], ephemeral: true });
        
        
                    
        
                   
        
                    
        
        
        
                    const embed2 = new MessageEmbed()
                        .setTitle(`Ticket`)
                        .setColor("RED")
                        .setDescription(`Thank you for contacting support! Please be patient while we get back to you.`)
                        .setTimestamp();
        
                    await ticketChannel.send({ embeds: [embed2], content: `<@&${staffRole}>` });
        
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('closeTicket')
                                .setLabel('Close Ticket')
                                .setStyle('DANGER')
                        );
        
                    await ticketChannel.send({ content: `Ticket created by ${interaction.user.tag}`, components: [row] });
        
                    const filter = i => i.customId === 'closeTicket' && i.user.id === interaction.user.id;
                    const collector = ticketChannel.createMessageComponentCollector({ filter, time: 60000 });
        
                    collector.on('collect', async i => {
                        if (i.customId === 'closeTicket') {
                            await i.deferUpdate();
                           i.channel.send({ content: `Ticket closed by ${interaction.user.tag}`, components: [] }).then(async () => {
                                setTimeout(async () => {
                                    await ticketChannel.delete();
                                    ticketSchema.findByIdAndDelete(ticket._id, (err) => {
                                        if (err) console.log(err);

                                        console.log(`Deleted ticket ${ticket._id}`);
                                    })
                                }, 5000);
                           })
                        }
                    });
            })
            
            

       

        

    },
};
