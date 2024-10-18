let bots = false;
const { 
    smd, 
    botpic,
    send,
    Config, 
    tlang, 
    sleep,
    smdBuffer,
    prefix,
    bot_
} = require('../lib');
const Levels = require("discord-xp");

try {
    if (isMongodb) Levels.setURL(mongodb);
} catch (error) {
    console.error("Failed to set MongoDB URL:", error);
}

//============================================================================
let utd = false;

// Command to turn on/off auto levelup
smd({
    pattern: "levelup",
    desc: "Turn On/Off auto levelup",
    fromMe: true,
    category: "level",
    use: "<on/off>",
    filename: __filename,
}, async (message, text) => {
    try {
        if (!global.isMongodb) {
            return await message.reply(message.isCreator ? 
                `*_Add MONGODB_URI to use these cmds_*` : 
                `*_Please ask my Owner to add MONGODB_URI!*`);
        }
        let bgmm = await bot_.findOne({ id: `bot_${message.user}` }) || await bot_.new({ id: `bot_${message.user}` });
        let toggle = text.toLowerCase().trim();

        if (toggle === 'on' || toggle === 'enable' || toggle === 'act') {
            if (bgmm.levelup === 'true') return await message.reply("*levelup already enabled!*");
            await bot_.updateOne({ id: `bot_${message.user}` }, { levelup: 'true' });
            return await message.reply("*levelup successfully enabled*");
        } else if (toggle === 'off' || toggle === 'disable' || toggle === 'deact') {
            if (bgmm.levelup === 'false') return await message.reply("*levelup already disabled*");
            await bot_.updateOne({ id: `bot_${message.user}` }, { levelup: 'false' });
            return await message.reply("*levelup successfully deactivated*");
        } else {
            return await message.reply(`*_Use on/off to enable/disable levelup!_*`);
        }
    } catch (e) {
        await message.error(`${e}\n\nCommand: levelup`, e);
    }
});

// Command to show user profile
smd({
    cmdname: "profile",
    info: "Shows profile of user.",
    type: "level",
    use: "<@user>",
    filename: __filename,
}, async (message) => {
    try {
        if (!global.isMongodb) {
            return await message.reply(message.isCreator ? 
                `*_Add MONGODB_URI to use these cmds_*` : 
                `*_Please ask my Owner to add MONGODB_URI!*`);
        }
        let meh = message.sender;
        if (message.isCreator) {
            meh = message.reply_message ? message.reply_message.sender : 
                  message.mentionedJid[0] ? message.mentionedJid[0] : 
                  message.sender || message.sender;
        }

        var bio = await message.bot.fetchStatus(meh);
        var bioo = bio.status;

        const userq = await Levels.fetch(meh, "RandomXP");
        const lvpoints = userq.level;
        var role = "GOD✨";

        if (lvpoints <=  2) { role = "🏳Citizen"; } 
        else if (lvpoints <=  4) { role = "👼Baby Wizard"; } 
        else if (lvpoints <=  6) { role = "🧙‍♀️Wizard";  } 
        else if (lvpoints <=  8) { role = "🧙‍♂️Wizard Lord"; }
        else if (lvpoints <= 10) { role = "🧚🏻Baby Mage";  } 
        else if (lvpoints <= 12) { role = "🧜Mage"; } 
        else if (lvpoints <= 14) { role = "🧜‍♂️Master of Mage";} 
        else if (lvpoints <= 16) { role = "🌬Child of Nobel"; } 
        else if (lvpoints <= 18) { role = "❄Nobel"; }
        else if (lvpoints <= 20) { role = "⚡Speed of Elite"; } 
        else if (lvpoints <= 22) { role = "🎭Elite"; } 
        else if (lvpoints <= 24) { role = "🥇Ace I"; }
        else if (lvpoints <= 26) { role = "🥈Ace II"; } 
        else if (lvpoints <= 28) { role = "🥉Ace Master"; }
        else if (lvpoints <= 30) { role = "🎖Ace Dominator";} 
        else if (lvpoints <= 32) { role = "🏅Ace Elite"; }
        else if (lvpoints <= 34) { role = "🏆Ace Supreme";}
        else if (lvpoints <= 36) { role = "💍Supreme I";}
        else if (lvpoints <= 38) { role = "💎Supreme II";} 
        else if (lvpoints <= 40) { role = "🔮Supreme Master";} 
        else if (lvpoints <= 42) { role = "🛡Legend III";} 
        else if (lvpoints <= 44) { role = "🏹Legend II";} 
        else if (lvpoints <= 46) { role = "⚔Legend"; } 
        else if (lvpoints <= 55) { role = "🐉Immortal"; }

        let ttms = userq.xp / 8;
        var pfp; 
        try { 
            pfp = await message.bot.profilePictureUrl(meh, "image"); 
        } catch {  
            pfp = await botpic();   
        }

        var naam_ser; 
        try { 
            naam_ser = await message.bot.getName(meh); 
        } catch {}

        const profile = `
*Hii ${naam_ser},*
*Here is your profile information*
*👤Username:* ${naam_ser}
*⚡Bio:* ${bioo}
*🧩Role:* ${role}
*🍁Level:* ${userq.level}
*📥Total Messages* ${ttms}
*Powered by ${tlang().title}*
`;

        await message.bot.sendMessage(message.chat, { image: { url: pfp }, caption: profile }, { quoted: message });
    } catch (e) { 
        await message.error(`${e}\n\ncommand: profile`, e, `*Can't fetch data, please check mongodb!!*`); 
    }
});

// Command to show user rank
smd({
    cmdname: "rank",
    info: "Sends rank card of user.",
    type: "level",
    use: "<@user>",
    filename: __filename,
}, async (message) => {
    try {
        if (!global.isMongodb) {
            return await message.reply(message.isCreator ? 
                `*_Please add MONGODB_URI to use this feature_*` : 
                `*_Please ask my Owner to add MONGODB_URI!*`);
        }
        let meh = message.sender;
        if (message.isCreator) {
            meh = message.reply_message ? message.reply_message.sender : 
                  message.mentionedJid[0] ? message.mentionedJid[0] : 
                  message.sender || message.sender;
        }

        const userq = await Levels.fetch(meh, "RandomXP");
        const lvpoints = userq.level;
        var role = "GOD✨";

        if (lvpoints <=  2) { role = "🏳Citizen"; } 
        else if (lvpoints <=  4) { role = "👼Baby Wizard"; } 
        else if (lvpoints <=  6) { role = "🧙‍♀️Wizard";  } 
        else if (lvpoints <=  8) { role = "🧙‍♂️Wizard Lord"; }
        else if (lvpoints <= 10) { role = "🧚🏻Baby Mage";  } 
        else if (lvpoints <= 12) { role = "🧜Mage"; } 
        else if (lvpoints <= 14) { role = "🧜‍♂️Master of Mage";} 
        else if (lvpoints <= 16) { role = "🌬Child of Nobel"; } 
        else if (lvpoints <= 18) { role = "❄Nobel"; }
        else if (lvpoints <= 20) { role = "⚡Speed of Elite"; } 
        else if (lvpoints <= 22) { role = "🎭Elite"; } 
        else if (lvpoints <= 24) { role = "🥇Ace I"; }
        else if (lvpoints <= 26) { role = "🥈Ace II"; } 
        else if (lvpoints <= 28) { role = "🥉Ace Master"; }
        else if (lvpoints <= 30) { role = "🎖Ace Dominator"; } 
        else if (lvpoints <= 32) { role = "🏅Ace Elite"; }
        else if (lvpoints <= 34) { role = "