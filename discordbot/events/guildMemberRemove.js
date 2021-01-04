// This event executes when a new member leaves the server. 

module.exports = async (client, member) => {
    //Counts members when member gets added.
    client.guilds.cache.get('794658347412226099').channels.cache.get('794664438983557140').setName('Member Count: ' + client.guilds.cache.get('794658347412226099').memberCount);
    client.logger.log(`User left! New member count: ${client.guilds.cache.get('794658347412226099').memberCount}`);

    // Load the guild's settings
    const settings = client.getSettings(member.guild);

    // If goodbye is off, don't proceed (don't goodbye the user)
    if (settings.goodbyeEnabled !== "true") return;

    // Replace the placeholders in the goodbye message with actual data
    const goodbyeMessage = settings.goodbyeMessage.replace("{{user}}", member.user.tag);

    // Send the goodbye message to the goodbye channel
    // There's a place for more configs here.
    member.guild.channels.cache.find(c => c.name === settings.goodbyeChannel).send(goodbyeMessage).catch(console.error);

};