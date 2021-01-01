module.exports = {
	name: 'roll',
	description: 'Rolls a random number. If no number is given, it will roll between 1 and 100.',
	execute(message, args) {
    var max = 100
    if (!isNaN(args[0])) {
      if (args[0] < 1) {
        return message.channel.send('Number has to be 1 or more.')
      }
      else {
        max = args[0]
      }
    }
    var roll = Math.random() * max
    message.channel.send('Your random number is: **' + Math.round(roll) + "**.")
  },
};
