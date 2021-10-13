const { MessageEmbed } = require("discord.js");
const { EMOTEMBED: defaults } = require("../../config.js");

module.exports.run = async (client, message, args) => {
 const guilds = client.guilds.cache
  .sort((a, b) => b.memberCount - a.memberCount)
  .first(10);

  const description = guilds
    .map((guild, index) => {
      return `\`${index + 1}.\` ${guild.name} ➔ \`${guild.memberCount}\` membres`;
    }).join("\n");

  const top = new MessageEmbed()
    .setColor(defaults.dcolor)
    .setTitle("<a:leaderboard:880794764688121887> Classement Serveurs")
    .setDescription(description)
    .setFooter(`Total: ${client.guilds.cache.size} | Event Halloween`)
  message.channel.send({ embeds: [top] });
};

module.exports.help = {
  name: "bot-serveur",
  aliases: [''],
  category: 'information',
  description: "Permet d'afficher la liste des serveurs ou est présent le bot.",
  cooldown: 5,
  usage: '',
  args: false,
};