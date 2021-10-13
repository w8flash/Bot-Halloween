const { MessageEmbed } = require("discord.js");
const { EMOTEMBED: defaults } = require("../../config.js");

module.exports.run = async (client, message, args) => {
  const top = new MessageEmbed()
    .setColor(defaults.dcolor)
    .setTitle("<a:leaderboard:880794764688121887> Classement Citrouille")
    .setThumbnail(client.user.avatarURL({ dynamic: true }))
    .setDescription("Voici le classement de citrouille de RDC.")
    //.setFooter(`Total: ${client.guilds.cache.size} | RDC`)

  await client.getUsers(message.guild).then(p => {
    //console.log(p);é
    //console.log(p.=)
    i=0;
    p.sort((a, b) => (a.pumpkin < b.pumpkin) ? 1 : -1).splice(0, 20).
    forEach(e => {
      i=i+1;
      let place = "";
      if(i == 1) {
        place = "<a:top_1:880794764776185896>"
      } else if(i == 2) {
        place = "<a:top_2:880794764650348544>"
      } else if(i == 3) {
        place = "<a:top_3:880794764251910185>"
      }
      top.addField(`${place} Position [${i}]`, `<@${e.userID}> | \`${e.pumpkin + e.gold_pumpkin}\` <:candy:896127373039243375>`)
      //console.log(e.userID)
    });
  });
  message.channel.send({ embeds: [top]})
};

module.exports.help = {
  name: "classement",
  aliases: [''],
  category: 'information',
  description: "Permet d'afficher la liste des serveurs ou est présent le bot.",
  cooldown: 5,
  usage: '',
  args: false,
};