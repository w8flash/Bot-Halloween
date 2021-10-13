const mongoose = require("mongoose");
const { Guild, Halloween } = require("../models/index");

module.exports = async client => {
  //---------------------
  //Serveur
  //---------------------
  client.createGuild = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = new Guild(merged);
    createGuild.save().then(g => console.log(`Nouveau serveur -> ${guild.guildID}`));
  };
  
  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };

  //---------------------
  //Halloween
  //---------------------
  client.getUsers = async guild => {
    const data = await Halloween.find({ guildID: guild.id });
    if (data) return data;
    else return;
  }

  client.createHalloween = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createHalloween = new Halloween(merged);
    createHalloween.save().then(g => console.log(`Nouveau Halloween -> ${guild.guildID}`));
  };

  client.getHalloween = async guild => {
    const data = await Halloween.findOne({ guildID: guild.id });
    if (data) return data;
  };

  client.updateHalloween = async (guild, settings) => {
    let data = await client.getHalloween(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };
};
