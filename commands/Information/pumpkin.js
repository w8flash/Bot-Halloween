const { MessageEmbed } = require("discord.js");
const { EMOTEMBED: defaults } = require("../../config.js");
const halloween = require('../../models/halloween');

module.exports.run = async (client, message, args) => {
  const settings = await client.getHalloween(message.guild);
  halloween.findOne({ userID: message.author.id }, async(err, data) => {
      if(err) throw err;
      if(!data) {
        return;
      } else {
        const halloween = new MessageEmbed()
          .setColor(defaults.dcolor)
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .setTitle(`<:candy:896127373039243375> Profil Halloween`)
          .setDescription(`
          ${defaults.pumpkin} **Citrouille:** \`${data.pumpkin}\`
          ${defaults.gold_pumpkin} **Citrouille Dorée:** \`${data.gold_pumpkin}\`
          `)
        message.channel.send({ embeds:[halloween] })
      }
  });
};

module.exports.help = {
  name: "pumpkin",
  aliases: [''],
  category: 'information',
  description: "Renvoie",
  cooldown: 5,
  usage: '',
  args: false
};
