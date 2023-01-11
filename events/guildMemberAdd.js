const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {

        const welcomeMessage = ["A Wild {user} appeared!", "Welcome {user}!", "Welcome to the server {user}! Hope you enjoy your stay!", "Looks like {user} brought pizza!"]

        const randomWelcomeMessage = welcomeMessage[Math.floor(Math.random() * welcomeMessage.length)].replace('{user}',`<@!${member.user.id}>`);
        
        const embed = new MessageEmbed()
            .setTitle(`Welcome to ${member.guild.name}`)
            .setDescription(`${randomWelcomeMessage}`)
            .setColor('PURPLE')
            .setTimestamp()
            .setFooter(`User ID: ${member.user.id}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))


        await member.guild.channels.cache.get(process.env.joinChannel).send({ embeds: [embed] });


        await member.roles.add(process.env.memberRole);


        logger.info(`New member: ${member.user.tag}`);
        logger.info(`Gave ${member.user.tag} the ${member.guild.roles.cache.get(process.env.memberRole).name} role`);



    }
};