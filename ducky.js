
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const moment = require('moment')
require('moment-duration-format')
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();

fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})



//  WATCHING  : !ping izliyor
//  LISTENING : !ping dinliyor
//  PLAYING   : !ping oynuyor 
//  STREAMING : !ping yayında
////----------------------- READY KISMI -----------------------\\\\
client.on('ready', () => {
    client.user.setPresence({ activity: { name: 'Ducky ❤️ Rich' }, status: 'idle' })
    client.channels.cache.get('819480047978414130').join() // ses kanalı İD
    console.log(`Bot ${client.user.tag} Adı İle Giriş Yaptı!`);
  })
////----------------------- CONFİG KISMI -----------------------\\\\
client.config = {
    vipRoles: ['819433976849760268'], //vip
    unregisteres: ['819433983443075093','819433984546963506'], // kayıtsız
    maleRoles: ['819433981413687336','819433982138515456'], // erkek
    girlRoles: ['819433979270266880','819433980084355093'], // bayan


    duckytoken: 'token', // TOKEN
    mods: ["819433955882827776","819433957954551819","819433969203675136","819433969896390686"], // kayıt yapıcak kısıler. yt rolu olsa bile yaz.
    channelID: '819434111483379733', // kayıt kanalı

    tag: 'Rîch', // tag
    booster: '817702206756487199', // booster rol

    tik: '817876526292664331', //TİK GİRCEN
    no: '817876526590197801', //TİK GİRCEN
    webhookurl: '819478391450501160', //WEBHOOKURL GİRCEN
    webhooktoken: 'token', //WEBHOOKTOKEN GİRCEN
    chatChannel: '819434128276455444', //CHAT KANALI
    yönetim: ['819433955882827776','819433957954551819','819433969203675136'] // vip alcak kısıler
}
////----------------------- PREFİX KISMI -----------------------\\\\
client.on('message', message => {
    const prefix = ".";// prefix
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
})
////----------------------- HEM ETİKET HEMDE TAG ROL KISMI -----------------------\\\\
client.on("userUpdate", async function(oldUser, newUser) { // 
    const guildID = "814601804092276776"//sunucu
    const roleID = ('819433976380522536')//taglırolü
    const tag = ('Rîch')//tag
    const chat = ('814601805756891188')// chat
    const log2 = ('819479247659204620') // log kanalı
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#2F3136').setTimestamp().setFooter('Ducky Was Here!');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(` ${newUser} isminden \`Rîch\` çıkartarak ailemizden ayrıldı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} ismine \`Rîch\` alarak ailemize katıldı!`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == "0033" && newUser.discriminator !== "0033") {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} etiketinden \`0033\` çıkartarak ailemizden ayrıldı!`))
        } else if (oldUser.discriminator !== "0033" && newUser.discriminator == "0033") {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} etiketine \`0033\` alarak ailemize katıldı!`))
        }
    }
  
  })
/////////////////////////////// TAG ROL 2 ////////////////////////////////
client.on("guildMemberAdd", member => {
    let sunucuid = ('814601804092276776'); 
    let tag = ('Rîch'); ///TAG
    let rol = ('819433976380522536'); //TAGROLÜ İD
  if(member.user.username.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
    .setAuthor(member.displayName, member.user.avatarURL({ dynamic: true }))
        .setColor('2F3136')
        .setDescription(`<@${member.id}> adlı üye sunucumuza taglı bir şekilde giriş yaptı!`)
        .setTimestamp()
        .setFooter('Ducky Was Here!')
       client.channels.cache.get('819479272238350376').send(tagalma)
  }
  })
////----------------------- HOŞGELDİN MESAJI KISMI -----------------------\\\\
const welcome = new Discord.WebhookClient(client.config.webhookurl, client.config.webhooktoken)


client.on('guildMemberAdd', (member) => {

    const mapping = {
        " ": "",
        "0": "<a:ducky_0:817870765080838155>", 
        "1": "<a:ducky_1:817870765209813034>",
        "2": "<a:ducky_2:817870765365526588>",
        "3": "<a:ducky_3:817870765160136785>",
        "4": "<a:ducky_4:817870765382303794>",
        "5": "<a:ducky_5:817870765327122504>",
        "6": "<a:ducky_6:817870765499482142>",
        "7": "<a:ducky_7:817870765470253116>",
        "8": "<a:ducky_8:817870765491093555>",
        "9": "<a:ducky_9:817870765189365781>",
    };
    var toplamüye = member.guild.memberCount
    var emotoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
    let memberDay = (Date.now() - member.user.createdTimestamp);
    let duckyhg = moment.duration(memberDay).format("Y [Yıl], M [Ay], W [Hafta], DD [Gün]")
    let duckywasheredostum = moment.duration(memberDay).format("DD [Gün], HH [saat], mm [dakika]")
    if (memberDay > 604800000) {
       welcome.send(`<a:rich:819448550231900170> Rich'e hoşgeldin ${member} - (\`${member.id}\`) :tada: :tada:
 
<a:rich:819448550231900170> Hesabın **${duckyhg}** önce açılmış. 

<a:rich:819448550231900170> Sunucuya giren herkes <#819434113245249536> kanalındaki kuralları okumuş sayılacaktır!

<a:rich:819448550231900170> Seninle birlikte **${emotoplamüye}** üyeye ulaştık. Kayıt olabilmek için tag almalı (\`Rîch #0033\`) veya boost basmalısın! <@&819433969896390686> rolündeki yetkililer seninle ilgilenecektir. `)
    } else {
        client.channels.cache.get(client.config.channelID).send(
        new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
        .setDescription(`${member}, adlı kullanıcı sunucuya katıldı!  Hesabı **${duckywasheredostum}** önce açıldığı için ona <@&819433977688752138> verildi! `)
        .setTimestamp()
        .setColor('2F3136')
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setFooter(`Ducky Was Here!`))
        member.roles.add('819433977688752138') //ŞÜPHELİ ROL İD
        member.roles.remove(client.config.unregisteres)
    }
})

////----------------------- TAG MESAJ KISMI -----------------------\\\\
client.on('message', msg => {
    if (msg.content === '!tag') {
        msg.channel.send(`\`Rîch \n #0033\``); // tagı yazınız
    } else if (msg.content === '-tag') {
        msg.channel.send(`\`Rîch \n #0033\``);// tagı yazınız
    } else if (msg.content === '.tag') {
        msg.channel.send(`\`Rîch \n #0033\``);// tagı yazınız
    } 
});

client.on("guildMemberAdd", member => {
    member.roles.add(client.config.unregisteres); 
    const otorol = new Discord.MessageEmbed()
    .setAuthor(member.displayName, member.user.avatarURL({ dynamic: true }))
        .setColor('2F3136')
        .setDescription(`<@${member.id}> adlı kullanıcıya (<@&819433983443075093>, <@&819433984546963506>) verildi!`)
        .setTimestamp()
        .setFooter('Ducky Was Here!')
       client.channels.cache.get('819479621715361792').send(otorol)
  });

client.login(client.config.duckytoken)//token
