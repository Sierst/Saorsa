module.exports = async (client, member) => {
    //Counts members when member gets added.
    client.guilds.cache.get('794658347412226099').channels.cache.get('794664438983557140').setName('Member Count: ' + client.guilds.cache.get('794658347412226099').memberCount);
    client.logger.log(`User joined! New member count: ${client.guilds.cache.get('794658347412226099').memberCount}`);
    console.log(`User joined!`);
    // Load the guild's settings
    const settings = client.getSettings(member.guild);

    // If welcome is off, don't proceed (don't welcome the user)
    if (settings.welcomeEnabled !== "true") return;

    // Replace the placeholders in the welcome message with actual data
    const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

    // Send the welcome message to the welcome channel
    // There's a place for more configs here.
    member.guild.channels.cache.find(c => c.name === settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};