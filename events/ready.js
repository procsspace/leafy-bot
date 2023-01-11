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

    setInterval(async () => {
 axios.get("https://procs.space/api/changelog").then((res) => {
      

    let version = res.data[0].name;
    let addedChanges = res.data[0].added;
    let removedChanges = res.data[0].removed;
    let date = res.data[0]._date;

    const embed = new MessageEmbed()
      .setTitle(`New Update!`)
      .setDescription(`Version: ${version}\n\nAdded:\n${addedChanges}\n\nRemoved:\n${removedChanges}`)
      .setFooter(`Date: ${date}`)
    

      client.channels.cache.get(process.env.changelog).messages.fetch({ limit: 1 }).then((messages) => {
        const lastMessage = messages.first();
       
        if (lastMessage.content !== version + " <@&1062577215289696286>") {
          client.channels.cache.get(process.env.changelog).send({ embeds: [embed], content: `${version} <@&1062577215289696286>` });
        }
        else {
          logger.warn("No new updates!");
        }
      })

    }).catch((err) => {
      console.log(err);
    });
      }, 300000);

   

  },
};
