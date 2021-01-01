module.exports = {
	name: 'kick',
	description: 'Kicks a user. Must have admin perms to do so.',
  execute(message, args) {
    if(!message.member.roles.cache.find(r => r.name === "Server Admin")) { return message.channel.send('You do not have the required permissions.')};
		let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) { return message.channel.send('You need to specify which person to kick!') };
		if(!member.kickable) { return message.channel.send('I am unable to kick this user!')};
		let reason = args.slice(1).join(' ');
		if(!reason) {
			member.send('You have been kicked from **' + message.channel.guild.name + '**.')
			member.kick()
			message.channel.send('**' + member.user.tag + '** has been kicked from the server.')
			console.log(member.user.tag + ' has been kicked from ' + message.channel.guild.name)
		};
		if(reason) {
			member.send('You have been kicked from **' + message.channel.guild.name + '**. Reason: **' + reason + '**.')
			member.kick()
			message.channel.send('**' + member.user.tag + '** has been kicked from the server.')
			console.log(member.user.tag + ' has been kicked from ' + message.channel.guild.name + '. Reason: ' + reason)
		}
	},
};
