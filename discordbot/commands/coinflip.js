exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    let result = Math.random();
    if (result < 0.5) {
        return message.channel.send(`Coinflip result: **Heads**`);
    } else {
        return message.channel.send(`Coinflip result: **Tails**`)
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["flip", "coin"],
    permLevel: "User"
};

exports.help = {
    name: "coinflip",
    category: "Miscelaneous",
    description: "Flips a coin.",
    usage: "coinflip"
};