let fs = require('fs');
const mongoose = require("mongoose");
const Logger = require('../utils/Logger');
const logger = new Logger({ debug: true });
const axios = require('axios').default;
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.clear();
    logger.info(`Logged in as ${client.user.tag}!`);

   


      client.user.setActivity(`https://procs.space`, {
        type: "WATCHING",
      });
    
    client.user.setStatus("dnd");


    // Connect to the database
    mongoose.connect(process.env.mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error:"));

    db.once("open", () => {
      logger.info("Connected to the database!");
    });

    // Ping https://procsBot.stelladev.repl.co every 4 minutes to keep the bot alive
    setInterval(() => {
      axios.get(process.env.URL);
    }
    , 240000);

   

  },
};
