module.exports = {
	name: 'ping',
	description: 'Tests if messages can be read and sent. If bot replies \'Pong\', the command works.',
	cooldown: 5,
	execute(message, args) {
    message.channel.send('Pong.');
	},
};
