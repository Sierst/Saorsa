module.exports = {
	name: 'status',
	description: 'Sets the bot status',
  aliases: ['botstatus', 'setstatus'],
	execute(message, args) {
    if(!message.member.roles.cache.find(r => r.name === "Server Admin")) { return message.channel.send('You do not have the required permissions.')};
    var action = args[0];
    if (action !== ['PLAYING', 'WATCHING', 'LISTENING']) {
      return message.channel.send('Invalid action!');
    }
    var status = args.slice(1).join(' ');
    client.user.setActivity(status, { type: action });
	},
};
