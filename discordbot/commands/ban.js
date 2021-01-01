module.exports = {
	name: 'ban',
	description: 'Bans a user. Must have admin perms to do so.',
  execute(message, args) {
    if(!message.member.roles.cache.find(r => r.name === "Server Admin")) { return message.channel.send('You do not have the required permissions.')};
		let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) { return message.channel.send('You need to specify which person to ban!') };
		if(!member.bannable) { return message.channel.send('I am unable to ban this user!')};
		let reason = args.slice(1).join(' ');
		if(!reason) {
			member.send('You have been banned from **' + message.channel.guild.name + '**.')
			member.ban()
			message.channel.send('**' + member.user.tag + '** has been banned from the server.')
		};
		if(reason) {
			member.send('You have been banned from **' + message.channel.guild.name + '**. Reason: **' + reason + '**.')
			member.ban()
			message.channel.send('**' + member.user.tag + '** has been banned from the server.')
		}
	},
};
