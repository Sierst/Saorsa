module.exports = {
	name: 'userinfo',
	description: 'Display info about yourself.',
	execute(message, args) {
    if (!args) {
		return console.log(message);
    }

    var user = args[0];
    return message.channel.send(`**Username:** ${message.user.username}\n**Your ID:** ${message.user.id}`)
	},
};
