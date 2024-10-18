let {
  runtime,
  formatp,
  prefix,
  smd,
  smdBuffer,
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const os = require("os");
const speed = require("performance-now");
const Config = require("../config");
const cheerio = require("cheerio");

// Channel Command
smd({
  pattern: "channel",
  desc: "Share channel link for support",
  react: "🗨️",
  category: "user",
  filename: __filename,
}, async (message) => {
  const channelMessage = `𝗤𝗨𝗘𝗘𝗡 *𝗠𝗔𝗥𝗜𝗔* 𝘾𝙃𝘼𝙉𝙉𝙀𝙇 𝙎𝙐𝙋𝙋𝙊𝙍𝙏\n\n _ʜᴇʏ ʜᴇʀᴇ's ᴏᴜʀ ᴄʜᴀɴɴᴇʟ ʟɪɴᴋ, ᴘʟᴇᴀsᴇ ғᴏʟʟᴏᴡ ᴀɴᴅ sᴜᴘᴘᴏʀᴛ ᴜs ᴛᴏ ᴋᴇᴇᴘ ᴛʜɪs ᴘʀᴏᴊᴇᴄᴛ ᴀʟɪᴠᴇ_\n *ʟɪɴᴋ:* https://whatsapp.com/channel/0029VahOucpCcW4s1Zk3O61A\n\n*`;

  const contextInfo = {
    forwardingScore: 999,
    isForwarded: true,
  };

  await message.send(channelMessage, { contextInfo });
});

// Support Command
smd({
  pattern: "support",
  desc: "Share support link for the repository",
  react: "🗨️",
  category: "user",
  filename: __filename,
}, async (message) => {
  const SupportMsg = `ERRORS WITH REPO COMMAND THIS IS NEW REPO \n\n *REPO:*https://github.com/abbybots141/Queen-Maria\n\n ${Config.botname} *WORKS*`;

  const contextInfo = {
    forwardingScore: 999,
    isForwarded: true,
  };

  await message.send(SupportMsg, { contextInfo });
});

// List Messages Command
smd({
  cmdname: "listmessage",
  alias: ["countmessage", "msgcount"],
  desc: "Check how many users are continuously active in chat!",
  category: "misc",
  filename: __filename
}, async (message, args, { store }) => {
  try {
    let messageCounts = {};
    store.messages[message.jid].array.forEach(msg => {
      const sender = msg.pushName || (message.isGroup ? msg.key.participant : msg.key.remoteJid || "unknown").split("@")[0];
      messageCounts[sender] = (messageCounts[sender] || 0) + 1;
    });

    const messageEntries = Object.entries(messageCounts);
    if (!messageEntries || !messageEntries[0]) {
      return await message.reply("_No messages found!_");
    }

    const userList = Object.entries(messageCounts).map(([user, count]) => `\t*${user?.split("\n").join(" ") || "unknown"}*  ➪  _${count}_`).join("\n");
    const responseMessage = (`*LIST OF ACTIVE USERS IN CURRENT CHAT*\n_Note: Sometimes Data will be reset when the bot restarts!_\n\n*Total Users: _${messageEntries.length}_*\n\n*USERNAME ➪ MESSAGE COUNT(s)*\n${userList}\n\n${Config.caption}`).trim();

    await message.send(responseMessage, {
      contextInfo: {
        ...(await message.bot.contextInfo("ACTIVE USERS", message.senderName))
      }
    }, "asta", message);
  } catch (error) {
    console.log({ e: error });
  }
});