const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const { MessageEmbed } = require("discord.js");


module.exports = {
	name: 'messageCreate',
	execute(message) {
        // Use regex to check if the message contained the client's id
        if (/<@!?(\d+)>/.test(message.content)) {
            // If it did, get the client's id
            const id = message.client.user.id;
            // If the message contained the client's id, check if the id was in the message
            if (message.content.includes(id)) {
                // If the id was in the message, send a message to the channel
                const embed = new MessageEmbed()
                .setTitle(`Message Prefix Error`)
                .setDescription(`My prefix is \`/\`!`)
                .setColor("RED")
                .setTimestamp();
    
                return message.reply({ embeds: [embed] }).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                        setTimeout(() => {
                            message.delete();
                        }, 2000)
                    }, 5000);
                })
            }
        }
	},
};