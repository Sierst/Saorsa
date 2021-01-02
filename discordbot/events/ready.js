module.exports = async client => {
    //Counts members when bot goes online.
    client.guilds.cache.get('794658347412226099').channels.cache.get('794664438983557140').setName('Member Count: ' + client.guilds.cache.get('794658347412226099').memberCount)
    
    // Log that the bot is online.
    client.logger.log(`Logged in as ${client.user.tag}. New member count: ${client.guilds.cache.get('794658347412226099').memberCount}`, "ready");

    // Make the bot "play the game" which is the help command with default prefix.
    client.user.setActivity(`${client.settings.get("default").prefix}help`, { type: "LISTENING" });
};