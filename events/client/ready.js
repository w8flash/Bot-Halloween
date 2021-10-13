const { Message, MessageEmbed } = require("discord.js");

module.exports = client => {

  const guild = [];
  client.guilds.cache.map(e => guild.push(e));
  guild.forEach(async g => {
    const data = await client.getGuild(g);
    if (!data){
      client.createGuild({ guildID: g.id })
      //client.createHalloween({ guildID: g.id });
    } 

  });

  let activities = [
    //`$help | ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} membres`,
    `Jouer à huis clos, c'est comme jouer dans un cimetière.`,
    `Je`,
    `Eh bien, me voilà. Quels sont vos deux autres vœux ?`,
    `Je suis le résultat d'un 20 naturel.`,
    `Être bizarre est l'effet secondaire de la génialité.`,
    `Je ne suis pas en ligne, c'est juste une illusion d'optique.`,
    `Jeter de l'ombre comme des confettis.`,
    `J'ai perdu la tête. Je reviens dans cinq minutes.`,
    `Secrètement un sorcier.`,
    `Je ne suis pas spécial, je suis une édition limitée.`,
    `Dieu est vraiment créatif. Je veux dire, regarde-moi.`,
  ], i = 0;

  setInterval(() => client.user.setPresence({ activities: [{ name: `${activities[i ++ % activities.length]}`, type: 'WATCHING' }], status: 'dnd' }), 60000);   
};