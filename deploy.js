const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const Logger = require('./utils/Logger');
const logger = new Logger({ debug: true });
const dotenv = require("dotenv");

dotenv.config();

const commands = [];

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {

    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {

	const command = require(`./commands/${folder}/${file}`);
	commands.push(command.data.toJSON());

    }
}

const rest = new REST({ version: '9' }).setToken(process.env.token);

rest.put(Routes.applicationGuildCommands("1010371358254977104", "1062574590406172692"), { body: commands })
	.then(() => logger.info("(/) Successfully registered application commands. (/)"))
	.catch(console.error);
