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
            .setDescription("The question for the poll (Split with | for multiple answers)")
            .setRequired(true)),
    isInDev: false,
    isStaffOnly: true,
  async execute(interaction) {

     




  },
};
