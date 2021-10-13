const { Client } = require('discord.js');

module.exports = {

  TOKEN: "",
  DBCONNECTION: "",

  GUILDSETTINGS: {
    prefix: "++",
  },

  EMOTEMBED: {
    dcolor: '#f26b27',
    vcolor: '#5fca23',
    rcolor: '#b12320',
    wcolor: '#f15d4a',
    succes: '<:succes:880794764612624394>',
    erreur: '<:erreur:880794764620988467>',
    warning: '<a:interdit:880794764746817566>',
    level: '<a:xp:880794764688117780>',
    pumpkin: '<:halloween:896116032358457344>',
    gold_pumpkin: '<:gold_pumpkin:896125290844160031>'
  }
}

// eval client.emit("guildCreate", message.guild);