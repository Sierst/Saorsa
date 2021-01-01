module.exports = {
	name: 'unban',
	description: 'Unbans a user. Must have admin perms to do so.',
  execute(message, args) {
    if(!message.member.roles.cache.find(r => r.name === "Server Admin")) { return message.channel.send('You do not have the required permissions.')};
		let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) { return message.channel.send('You need to specify which person to unban!') };

	},
};
