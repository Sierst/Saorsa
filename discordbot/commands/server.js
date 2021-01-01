module.exports = {
	name: 'server',
	description: 'Display info about this server.',
	aliases: ['serverinfo', 'serverstats'],
	execute(message) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};
