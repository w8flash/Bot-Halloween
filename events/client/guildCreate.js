const db = require('../../models/guild');

module.exports = async (client, guild) => {
  db.findOne({ guildID: guild.id }, async(err, data) => {
    if(err) throw err;
    if(!data) {
      /*const halloween = {
        guildID: guild.id,
      };*/
      await client.createGuild({guildID: guild.id});
      //await client.createHalloween(halloween);
    } else {
      return;
    }
  });
};