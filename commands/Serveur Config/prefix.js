const { MessageEmbed, Message } = require("discord.js");
const { Collection } = require("mongoose");
const { EMOTEMBED: defaults } = require("../../config.js");

module.exports.run = async (client, message, args) => {
  const settings = await client.getGuild(message.guild);

  const oldPrefix = settings.prefix;

  const noargs = new MessageEmbed()
    .setColor(defaults.rcolor)
    .setDescription(`${defaults.erreur} Veuillez saisir un prefix !`)
  if (!args[0]) return message.reply({ embeds: [noargs] })

  const argslength = new MessageEmbed()
    .setColor(defaults.rcolor)
    .setDescription(`${defaults.erreur} Veuillez saisir un prefix contenant moins de 4 caractère !`)
  if (args[0].length > 3) return message.reply({ embeds: [argslength] })

  await client.updateGuild(message.guild, {
    prefix: args[0]
  })
  const newprefix = new MessageEmbed()
    .setColor(defaults.dcolor)
    .setDescription(`<a:prefix:880866625312677888> Prefix mis à jour ➔ \`${args[0]}\``)
    .setFooter(`Ancien prefix: ${oldPrefix}`)
  return message.channel.send({ embeds: [newprefix] });
};

module.exports.help = {
  name: "prefix",
  aliases: [''],
  category: 'Serveur Config',
  description: "Change le prefix du bot sur le serveur.",
  cooldown: 1,
  usage: '<prefix>',
  args: true,
  perm: true,
};