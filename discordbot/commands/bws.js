module.exports = {
	name: 'bws',
	description: 'osu! Tournament BWS Calculator',
	execute(message, args) {
    const rank = args[0]
    const badges = args[1]
    const bws = rank**(0.9937**(badges**2))
		if (badges == 1)
		message.channel.send('With rank **' + rank + '** and **' + badges + '** badge, the BWS rank is: __**' + Math.round(bws) + '**__.\n\n*Formula used: rank^(0.9937^(badges^2))*');
		else if (badges !== 1)
		message.channel.send('With rank **' + rank + '** and **' + badges + '** badges, the BWS rank is: __**' + Math.round(bws) + '**__.\n\n*Formula used: rank^(0.9937^(badges^2))*');
	},
};
