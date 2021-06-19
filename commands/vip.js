const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'vip',
    aliases: ['special', 'vip'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#2F3136').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Lucas Was Here!');
        let embed2 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#2F3136').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Lucas Was Here!');

        if (!client.config.yönetim.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!")).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Lütfen bir kullanıcı etiketleyip tekrar deneyiniz.\n `.vip @Lucas/ID`")).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));

        await message.guild.members.cache.get(member.id).roles.add(client.config.vipRoles)
        message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`${member} adlı kullanıcıya <@&819433976849760268> rolü verildi`).setColor('#2F3136').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Lucas Was Here!')).then(message.react(client.config.tik));

    }
}