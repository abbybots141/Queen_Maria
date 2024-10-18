let { smd } = require("../lib");

// Clear chat command
smd({
    pattern: 'clear',
    fromMe: true,
    desc: 'delete whatsapp chat',
    type: 'whatsapp'
}, async (message, match) => { 
    try {   
        await message.bot.chatModify({
            delete: true,
            lastMessages: [{
                key: message.key,
                messageTimestamp: message.messageTimestamp
            }]
        }, message.jid);
        await message.send('_Cleared!_');
    } catch (e) { 
        message.error(`${e}\n\nCommand: clear`, e, false);
    }
});

// Archive chat command
smd({
    pattern: 'archive',
    fromMe: true,
    desc: 'archive whatsapp chat',
    type: 'whatsapp'
}, async (message, match) => {
    try {
        const lstMsg = {
            message: message.message,
            key: message.key,
            messageTimestamp: message.messageTimestamp
        };
        await message.bot.chatModify({
            archive: true,
            lastMessages: [lstMsg]
        }, message.jid);
        await message.send('_Archived_');
    } catch (e) { 
        message.error(`${e}\n\nCommand: archive`, e, false);
    }
});

// Unarchive chat command
smd({
    pattern: 'unarchive',
    fromMe: true,
    desc: 'unarchive whatsapp chat',
    type: 'whatsapp'
}, async (message, match) => {
    try {
        const lstMsg = {
            message: message.message,
            key: message.key,
            messageTimestamp: message.messageTimestamp
        };
        await message.bot.chatModify({
            archive: false,
            lastMessages: [lstMsg]
        }, message.jid);
        await message.send('_Unarchived_');
    } catch (e) { 
        message.error(`${e}\n\nCommand: unarchive`, e, false);
    }
});

// Pin chat command
smd({
    pattern: 'chatpin',
    alias: ["pinchat"],
    fromMe: true,
    desc: 'pin a chat',
    type: 'whatsapp'
}, async (message, match) => {
    try {
        await message.bot.chatModify({
            pin: true
        }, message.jid);
        await message.send('_Pinned_');
    } catch (e) { 
        message.error(`${e}\n\nCommand: chatpin`, e, false);
    }
});

// Unpin chat command
smd({
    pattern: 'unpin',
    alias: ["unpinchat", "chatunpin"],
    fromMe: true,
    desc: 'unpin a chat',
    type: 'whatsapp'
}, async (message, match) => {
    try {
        await message.bot.chatModify({
            pin: false
        }, message.jid);
        await message.send('_Unpinned_');
    } catch (e) { 
        message.error(`${e}\n\nCommand: unpin`, e, false);
    }
});

// Mark chat as read command
smd({
    pattern: 'markread',
    fromMe: true,
    desc: 'mark as read',
    type: 'whatsapp'
}, async (message, match) => {
    try {
        await message.react("🍁");
        await message.bot.chatModify(
            { markRead: true, lastMessages: [message] }, 
            message.jid
        );
    } catch (e) { 
        message.error(`${e}\n\nCommand: markread`, e, false);
    }
});

// Mark chat as unread command
smd({
    pattern: 'markunread',  
    fromMe: true,
    desc: 'mark as unread',
    type: 'whatsapp'
}, async (message, match) => {
    try {
        let msg = await message.send("🍁", {}, "react");
        console.log({ msg });
        await message.bot.chatModify(
            { markRead: false, lastMessages: [message] }, 
            message.jid
        );
    } catch (e) { 
        message.error(`${e}\n\nCommand: markunread`, e, false);
    }
});

// Unmute chat command
smd({
    pattern: 'unmutechat',
    fromMe: true,
    desc: 'unmute a chat',
    type: 'whatsapp'
}, async (message, match) => {
    try {
        await message.bot.chatModify({ mute: null }, message.jid);
        await message.send('_Chat Unmuted!_');
    } catch (e) { 
        message.error(`${e}\n\nCommand: unmutechat`, e, false);
    }
});

// Change profile name command
smd({
    pattern: 'profilename',
    fromMe: true,
    desc: 'To change your profile name',
    type: 'whatsapp'
}, async (message, match) => {
    try {
        match = match || message.reply_message.text;
        if (!match) return await message.send('*Need Name!*\n*Example: profilename your name*.');
        await message.bot.updateProfileName(match);
        await message.send('_Profile name updated!_');
    } catch (e) { 
        message.error(`${e}\n\nCommand: profilename`, e, false);
    }
});

// ============================ PRIVACY SETTINGS ============================

// Get privacy settings command
smd({
    pattern: 'getprivacy',
    fromMe: true,
    desc: 'get your privacy settings',
    type: 'whatsapp settings'
}, async (message, match) => {
    const {
        readreceipts,
        profile,
        status,
        online,
        last,
        groupadd,
        calladd
    } = await message.bot.fetchPrivacySettings(true);
    const msg = `*♺ WhatsApp Privacy Settings*

*ᝄ Name :* ${(message.fromMe && message.pushName ? message.pushName : message.bot.user.name).split("\n").join("  ")}
*ᝄ Number :* ${message.user.split("@")[0]}

*ᝄ Online :* ${online}
*ᝄ Profile :* ${profile}
*ᝄ Last Seen :* ${last}
*ᝄ WhatsApp Status :* ${status}
*ᝄ Read Receipt :* ${readreceipts}

*ᝄ Who Can Add in Group :* ${groupadd}
*ᝄ Who Can Call :* ${calladd}`;
    let img = await message.getpp(message.user);
    await message.send(img, {
        caption: msg
    }, 'img');
});

// Change last seen privacy command
smd({
    pattern: 'lastseen',
    fromMe: true,
    desc: 'to change last seen privacy',
    type: 'whatsapp settings'
}, async (message, match) => {
    try {
        if (!match) return await message.send(`_*Example:-* .lastseen all_\n_to change last seen privacy settings_`);
        const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!available_privacy.includes(match)) return await message.send(`_Action must be *${available_privacy.join(' / ')}* values_`);
        await message.bot.updateLastSeenPrivacy(match);
        await message.send(`_Privacy settings *last seen* updated to *${match}*_`);
    } catch (e) { 
        message.error(`${e}\n\nCommand: lastseen`, e, false);
    }
});

// Change online privacy command
smd({
    pattern: 'online',
    fromMe: true,
    desc: 'to change online privacy',
    type: 'whatsapp settings'
}, async (message, match) => {
    try {
        if (!match) return await message.send(`_*Example:-* .online all_\n_to change *online* privacy settings_`);
        const available_privacy = ['all', 'match_last_seen'];
        if (!available_privacy.includes(match)) return await message.send(`_Action must be *${available_privacy.join('/')}* values_`);
        await message.bot.updateOnlinePrivacy(match);
        await message.send(`_Privacy updated to *${match}*_`);
    } catch (e) { 
        message.error(`${e}\n\nCommand: online`, e, false);
    }
});

// Change profile picture privacy command
smd({
    pattern: 'mypp',
    fromMe: true,
    desc: 'privacy setting for profile picture',
    type: 'whatsapp settings'
}, async (message, match) => {
    try {
        if (!match) return await message.send(`_*Example:-* .mypp all_\n_to change *profile picture* privacy settings_`);
        const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!available_privacy.includes(match)) return await message.send(`_Action must be *${available_privacy.join('/')}* values_`);
        await message.bot.updateProfilePicturePrivacy(match);
        await message.send(`_Privacy updated to *${match}*_`);
    } catch (e) { 
        message.error(`${e}\n\nCommand: mypp`, e, false);
    }
});

// Change status privacy command
smd({
    pattern: 'mystatus',
    fromMe: true,
    desc: 'privacy for my status',
    type: 'whatsapp settings'
}, async (message, match) => {
    try {
        if (!match) return await message.send(`_*Example:-* .mystatus all_\n_to change *status* privacy settings_`);
        const available_priv