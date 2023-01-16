const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const { MessageEmbed } = require("discord.js");
const ticketSchema = require("../models/ticket");


module.exports = {
	name: 'messageCreate',
	execute(message) {
       
        const ticketChannel = message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.username}`);

        console.log(message)
        if (ticketChannel) {
            ticketSchema.findOne({ "author.id": message.author.id }, async (err, ticket) => {
                if (err) logger.error(err);
                if (!ticket) return;

                ticket.messages.push({
                    id: message.id,
                    content: message.content,
                    author: {
                        id: message.author.id,
                        username: message.author.username,
                        discriminator: message.author.discriminator,
                        avatar: message.author.avatarURL({ dynamic: true }),
                    },
                    timestamp: message.createdAt,
                    embeds: message.embeds,
                    attachments: message.attachments,

                })

                await ticket.save().then(() => {
                    logger.debug(`Saved message ${message.id} to ticket ${ticket._id}`);
                })
            })
        }
        
	},
};
