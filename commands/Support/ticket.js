const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton, MessageCollector, MessageSelectMenu } = require("discord.js");
const axios = require("axios").default;
const wait = require("util").promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Create a ticket!"),
    isInDev: true,
  async execute(interaction) {

     
    const user = interaction.user;

    console.warn(`This command is in development!`)

   




  },
};
