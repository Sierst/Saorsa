module.exports = (client, member) => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'new-members');
    if (!channel) return;
    channel.send(`${member} joined the server.`);

    let myGuild = client.guilds.cache.get('794658347412226099');
    let memberCount = myGuild.memberCount;
    let memberCountChannel = myGuild.channels.cache.get('794664438983557140');
    memberCountChannel.setName('Member Count: ' + memberCount)
        .then(result => console.log('Updated Member Count VC. New count: ' + memberCount))
        .catch(error => console.log('Couldn\'t update Member Count VC'))
}