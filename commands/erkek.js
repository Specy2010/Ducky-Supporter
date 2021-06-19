const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'erkek',
    aliases: ['erkek', 'e', 'man', 'boy'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#2F3136').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Lucas Was Here!');
        let embed2 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#2F3136').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Lucas Was Here!');
        if (!client.config.mods.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!")).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Lütfen bir kullanıcı etiketleyip tekrar deneyiniz.\n `.e @Lucas/ID`")).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));

        let name = args[1]
        if (!name) return message.channel.send(embed.setDescription("Lütfen kullanıcı için isim yazınız.\n `.e @Lucas/ID Lucas`")).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));

        let age = args[2]
        if (!age) return message.channel.send(embed.setDescription("Lütfen kullanıcı için isim yazınız.\n `.e @Lucas/ID Lucas 17`")).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));


        message.guild.members.cache.get(member.id).setNickname(`† ${name} | ${age}`).then(message.react(client.config.tik));
        db.push(`isimler_${member.id}`, ` \`${name} | ${age}\` (<@&819433981413687336>)`);
        db.set(`kayıt_${member.id}`, true)
        db.add(`erkek_${message.author.id}`, 1)
        db.add(`toplam_${message.author.id}`, 1)
        await message.guild.members.cache.get(member.id).roles.remove(client.config.unregisteres)
        await message.guild.members.cache.get(member.id).roles.add(client.config.maleRoles)
        await message.guild.channels.cache.get(client.config.chatChannel).send(`${member} \`Sunucumuza Hoşgeldin!\``)
        message.channel.send(embed2.setDescription(`${member} adlı kullanıcı \`${name} | ${age}\` isminde, (<@&819433981413687336>,<@&819433982138515456>) olarak kayıt edildi! `)
  
        )
    }
}
