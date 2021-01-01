const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

client.queue = new Map();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`!help`, { type: 'LISTENING' })
    let myGuild = client.guilds.cache.get('794658347412226099');
    let memberCount = myGuild.memberCount;
    let memberCountChannel = myGuild.channels.cache.get('794664438983557140');
    memberCountChannel.setName('Member Count: ' + memberCount)
        .then(result => console.log('Updated Member Count VC. New count: ' + memberCount))
        .catch(error => console.log('Couldn\'t update Member Count VC'))
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'new-members');
    if (!channel) return;
    channel.send(`${member} joined the server.`);

    let myGuild = client.guilds.cache.get('794658347412226099');
    let memberCount = myGuild.memberCount;
    let memberCountChannel = myGuild.channels.cache.get('794664438983557140');
    memberCountChannel.setName('Member Count: ' + memberCount)
        .then(result => console.log('Updated Member Count VC. New count: ' + memberCount))
        .catch(error => console.log('Couldn\'t update Member Count VC'))
});

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'new-members');
    if (!channel) return;
    channel.send('**' + member.user.username + '** left the server.');

    let myGuild = client.guilds.cache.get('794658347412226099');
    let memberCount = myGuild.memberCount;
    let memberCountChannel = myGuild.channels.cache.get('794664438983557140');
    memberCountChannel.setName('Member Count: ' + memberCount)
        .then(result => console.log('Updated Member Count VC. New count: ' + memberCount))
        .catch(error => console.log('Couldn\'t update Member Count VC'))
});

//commands
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.channel.send('There was an error trying to execute that command!');
    }
});

//Fun Replies
client.on('message', msg => {
    if (msg.author.bot) return;
    var funReply = msg.content.toLowerCase();
    if (funReply.includes('lyoshka')) { msg.channel.send('This song is about a tragic love.') }
    else if (funReply.includes('hime hime')) { msg.channel.send('Suki Suki Daisuki') }
    else if (funReply.includes('dame da ne')) { msg.channel.send('dame yo dame na no yo') }
    else if (funReply.includes('united')) { msg.channel.send('haha stan can\'t pass united') }
    else if (funReply.includes('owo')) { msg.channel.send('what\'s this?') }
    else if (funReply.includes('\\o/')) { msg.channel.send('\\o/') }
    else if (funReply.includes('o/')) { msg.channel.send('\\o') }
    else if (funReply.includes('\\o')) { msg.channel.send('o/') }
});

client.login(token);