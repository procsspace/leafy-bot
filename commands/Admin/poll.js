const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton, MessageCollector, MessageSelectMenu } = require("discord.js");
const axios = require("axios").default;
const wait = require("util").promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Create a poll!")
    .addStringOption(option =>
        option.setName("question")
            .setDescription("The question for the poll")
            .setRequired(true)),
    isInDev: false,
    isStaffOnly: true,
  async execute(interaction) {

     


    const question = interaction.options.getString("question");
    

   
    const embed = new MessageEmbed()
    .setTitle(`Poll`)
    .setDescription(`${question}`)
    .setFooter(`Poll created by ${interaction.user.tag}`)
    .setTimestamp();


    await interaction.channel.send({ embeds: [embed] }).then(async (msg) => {

        await msg.react("👍");
        await msg.react("👎");
        await msg.react("🤷");
    })

    await interaction.reply({ content: `Poll created!`, ephemeral: true });
   
  },
};
