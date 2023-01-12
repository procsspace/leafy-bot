const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const { MessageEmbed } = require("discord.js");


module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            if (command.isInDev) {
                logger.warn(`Command ${interaction.commandName} is in development!`);
                const errorEmbed = new MessageEmbed()
                    .setTitle(`Command Error - ${interaction.commandName}`)
                    .setDescription(`This command is in development!`)
                    .setColor("RED")
                    .setTimestamp();
                interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                return;
            }
        
            if (command.isStaffOnly && !interaction.member.roles.cache.has("996941131591974982")) {
                logger.warn(`Command ${interaction.commandName} is staff only!`);
                const errorEmbed = new MessageEmbed()
                    .setTitle(`Command Error - ${interaction.commandName}`)
                    .setDescription(`This command is staff only!`)
                    .setColor("RED")
                    .setTimestamp();
                interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                return;
            }
		
		command.execute(interaction);
        } catch (error) {
            logger.error(error);
            const errorEmbed = new MessageEmbed()
                .setTitle(`Command Error - ${interaction.commandName}`)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor("RED")
                .setTimestamp();
            interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
	},
};
