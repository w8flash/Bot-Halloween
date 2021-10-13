const { MessageEmbed, ReactionCollector } = require("discord.js");
const { Collection } = require('discord.js');
const halloween = require('../../models/halloween');
const { EMOTEMBED: defaults } = require("../../config.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;

  const settings = await client.getGuild(message.guild);
  halloween.findOne({ userID: message.author.id }, async(err, data) => {
    if(err) throw err;
    if(!data) {
      data = new halloween({
        guildID: message.guild.id,
        userID: message.author.id,
        pumpkin: 0,
        gold_pumpkin: 0,
        level: 0
      })
      data.save();
    } else {
      return;
    }
  });
  //------------------------------------------------------
  //GET PUMPKIN
  let amount = Math.floor(Math.random()* (50 - 0) + 0);
  //console.log(amount)
  if(amount > 40) {
    message.react('896116032358457344');
    const filterReaction = (reaction, user) => users.id === message.author.id && !users.bot;
    const collectorReaction = await new ReactionCollector(message, filterReaction);
    collectorReaction.on('collect', async (reaction, user) => {
      //console.log(reaction)
      switch(reaction._emoji.name){
        case 'halloween':
          //console.log(user)
          if(user.bot == true) return;
          halloween.findOne({ userID: user.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
              data = new halloween({
                guildID: message.guild.id,
                userID: user.id,
                pumpkin: 0,
                gold_pumpkin: 0,
                level: 0
              })
              data.save();
            } else {
              let newPumpkin = data.pumpkin + 1;
              await data.updateOne({ pumpkin: newPumpkin });
              data.save();
              const pumpkin = new MessageEmbed()
                .setColor(defaults.dcolor)
                .setDescription(`${defaults.pumpkin} Tu viens d'obtenir \`1\` citrouille ! [\`${data.pumpkin + data.gold_pumpkin + 1}\`]`)
              user.send({ embeds: [pumpkin]})
              collectorReaction.stop("Times up!");
              message.reactions.removeAll();
              //message.delete();
            }
          });
        break;
      }
    });
  }

  if(amount == 7) {
    message.react('896125290844160031');
    const filterReaction = (reaction, user) => users.id === message.author.id && !users.bot;
    const collectorReaction = await new ReactionCollector(message, filterReaction);
    collectorReaction.on('collect', async (reaction, user) => {
      if (user != client.user)
      //console.log(reaction)
      switch(reaction._emoji.name){
        case 'gold_pumpkin':
          //console.log(user)
          if(user.bot == true) return;
          halloween.findOne({ userID: user.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
              data = new halloween({
                guildID: message.guild.id,
                userID: user.id,
                pumpkin: 0,
                gold_pumpkin: 0,
                level: 0
              })
              data.save();
            } else {
              let newPumpkin = data.pumpkin + 10;
              let newGPumpkin = data.gold_pumpkin + 1;
              await data.updateOne({ pumpkin: newPumpkin });
              await data.updateOne({ gold_pumpkin: newGPumpkin });
              data.save();
              const pumpkin = new MessageEmbed()
                .setColor(defaults.dcolor)
                .setDescription(`${defaults.pumpkin} Tu viens d'obtenir \`10\` citrouilles ! [\`${data.pumpkin + 10}\`]`)
              const gold_pumpkin = new MessageEmbed()
                .setColor('#d2af1c')
                .setDescription(`${defaults.gold_pumpkin} Tu viens d'obtenir \`1\` citrouilles dorée ! [\`${data.gold_pumpkin + 1}\`]`)
              user.send({ embeds: [pumpkin]})
              user.send({ embeds: [gold_pumpkin]})
              collectorReaction.stop("Times up!");
              message.reactions.removeAll();
              //message.delete();
            }
          });
        break;
      }
    });
  }
  //------------------------------------------------------
  if (!message.content.startsWith(settings.prefix)) return;
  const args = message.content.slice(settings.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  if (!command) return;

  const embedowner = new MessageEmbed()
    .setColor(defaults.wcolor)
    .setDescription(`${defaults.warning} Hop hop hop ! Seul \`flashh#7777\` peut utiliser cet commande !`)
  if (command.help.owner && message.author.id !== '512718827046567936') return message.reply({ embeds: [embedowner] });

  const embedargs = new MessageEmbed()
    .setColor(defaults.rcolor)
    .setDescription(`${defaults.erreur} Voici comment utiliser la commande: \`${settings.prefix}${command.help.name} ${command.help.usage}\` !`)
  if (command.help.args && !args.length) {
    if (command.help.usage) return message.reply({ embeds: [embedargs] });
  };

  if(!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection());
  }

  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown || 5) * 1000;
  //console.log(client.cooldowns);

  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

    if (timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      const embedcd = new MessageEmbed()
        .setColor(defaults.rcolor)
        .setDescription(`${defaults.erreur} Merci d'attendre \`${timeLeft.toFixed(0)}\` seconde(s) avant de ré-utiliser la commande \`${command.help.name}\` !`)
      return message.reply({ embeds: [embedcd] });
    }
  }

  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  command.run(client, message, args);
  //-----------------------------------------------
};