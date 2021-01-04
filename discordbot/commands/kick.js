exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    // Check if user has permission to kick user
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.error(settings.Language, 'USER_PERMISSION', 'KICK_MEMBERS').then(m => m.delete({ timeout: 10000 }));

    // Check if bot has permission to kick user
    if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
        client.logger.error(`Missing permission: \`KICK_MEMBERS\` in [${message.guild.id}].`);
        return message.error(settings.Language, 'MISSING_PERMISSION', 'KICK_MEMBERS').then(m => m.delete({ timeout: 10000 }));
    }

    // Get user and reason
    const member = client.getUsers(message, args);
    const reason = (args.join(' ').slice(22)) ? args.join(' ').slice(22) : message.translate(settings.Language, 'NO_REASON');

    // Make sure user isn't trying to punish themselves
    if (member[0].user.id == message.author.id) return message.error(settings.Language, 'MODERATION/SELF_PUNISHMENT').then(m => m.delete({ timeout: 10000 }));

    // Make sure user user does not have ADMINISTRATOR permissions
    if (member[0].hasPermission('ADMINISTRATOR')) return message.error(settings.Language, 'MODERATION/TOO_POWERFUL').then(m => m.delete({ timeout: 10000 }));

    // Kick user with reason
    try {
        await member[0].kick({ reason: reason });
        message.success(settings.Language, 'MODERATION/SUCCESSFULL_KICK', member[0].user).then(m => m.delete({ timeout: 3000 }));
        client.Stats.KickedUsers++;
    } catch (err) {
        if (client.config.debug) client.logger.error(`${err.message} - command: kick.`);
        message.error(settings.Language, 'ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Admin"
};

exports.help = {
    name: "kick",
    category: "Admin",
    description: "Kicks a member from the server.",
    usage: "kick <user mention/ID> [reason]"
};