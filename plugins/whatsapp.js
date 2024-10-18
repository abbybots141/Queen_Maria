const moment = require("moment-timezone");
const Config = require("../config");
let { smd, prefix, updateProfilePicture, parsedJid } = require("../lib");
const { cmd } = require("../lib/plugins");

let mtypes = ["imageMessage"];

smd(
  {
    pattern: "pp",
    desc: "Set profile picture",
    category: "whatsapp",
    use: "<reply to image>",
    fromMe: true,
    filename: __filename,
  },
  async (msg) => {
    try {
      let media = mtypes.includes(msg.mtype) ? msg : msg.reply_message;
      if (!media || !mtypes.includes(media?.mtype || "need_Media")) {
        return await msg.reply("*Reply to an image, dear*");
      }
      return await updateProfilePicture(msg, msg.user, media, "pp");
    } catch (error) {
      await msg.error(error + "\n\ncommand : pp", error);
    }
  }
);

smd(
  {
    pattern: "fullpp",
    desc: "Set full screen profile picture",
    category: "whatsapp",
    use: "<reply to image>",
    fromMe: true,
    filename: __filename,
  },
  async (msg) => {
    try {
      let media = mtypes.includes(msg.mtype) ? msg : msg.reply_message;
      if (!media || !mtypes.includes(media?.mtype || "need_Media")) {
        return await msg.reply("*Reply to an image, dear*");
      }
      return await updateProfilePicture(msg, msg.user, media, "fullpp");
    } catch (error) {
      await msg.error(error + "\n\ncommand : fullpp", error);
    }
  }
);

smd(
  {
    pattern: "rpp",
    desc: "Remove profile picture",
    category: "whatsapp",
    use: "<chat>",
    fromMe: true,
    filename: __filename,
  },
  async (msg) => {
    try {
      await msg.removepp();
      msg.send("*_Profile picture removed successfully!_*");
    } catch (error) {
      await msg.error(error + "\n\ncommand : rpp", error);
    }
  }
);

smd(
  {
    pattern: "bio",
    desc: "Update profile status of WhatsApp",
    category: "whatsapp",
    use: "<text>",
    fromMe: true,
    filename: __filename,
  },
  async (msg, text) => {
    try {
      if (!text) {
        return await msg.send(
          "*_Provide text to update profile status!_*\n*_Example: " +
            prefix +
            "bio Asta Md_*"
        );
      }
      await msg.bot.updateProfileStatus(text);
      msg.send("*Profile status updated successfully!*");
    } catch (error) {
      await msg.error(error + "\n\ncommand : bio", error);
    }
  }
);

cmd(
  {
    pattern: "ptv",
    desc: "Send ptv Message of video",
    category: "whatsapp",
    filename: __filename,
  },
  async (msg) => {
    try {
      if (!msg.quoted) {
        return await msg.send("*Uhh Please, reply to video*");
      }
      let quotedType = msg.quoted.mtype;
      if (quotedType !== "videoMessage") {
        return await msg.send("*Uhh Dear, reply to a video message*");
      }
      return await msg.bot.forwardOrBroadCast(
        msg.chat,
        msg.quoted,
        {},
        "ptv"
      );
    } catch (error) {
      await msg.error(error + "\n\ncommand : ptv", error);
    }
  }
);

cmd(
  {
    pattern: "slog",
    desc: "Save Message to log number",
    category: "whatsapp",
    filename: __filename,
  },
  async (msg) => {
    try {
      let replyMsg = msg.reply_message;
      if (!replyMsg) {
        return await msg.send("*Uhh Please, reply to a Message*");
      }
      await msg.bot.forwardOrBroadCast(msg.user, replyMsg);
    } catch (error) {
      await msg.error(error + "\n\ncommand : save", error);
    }
  }
);

cmd(
  {
    pattern: "quoted",
    desc: "Get reply Message from Replied Message",
    category: "user",
    filename: __filename,
  },
  async (msg) => {
    try {
      if (!msg.quoted) {
        return await msg.send("*_Uhh Dear, Reply to a Message_*");
      }
      let quotedObj = await msg.bot.serializeM(await msg.getQuotedObj());
      if (!quotedObj || !quotedObj.quoted) {
        return await msg.reply("*Message you replied does not contain a reply Message*");
      }
      try {
        await msg.react("✨", msg);
        return await msg.bot.copyNForward(msg.chat, quotedObj.quoted, false);
      } catch (error) {
        await msg.bot.forward(msg.chat, quotedObj.quoted, {}, msg);
        console.log(error);
      }
    } catch (error) {
      await msg.error(error + "\n\ncommand : quoted", error);
    }
  }
);

cmd(
  {
    pattern: "blocklist",
    desc: "Get list of all Blocked Numbers",
    category: "whatsapp",
    fromMe: true,
    filename: __filename,
    use: "<text>",
  },
  async (msg) => {
    try {
      const blocklist = await msg.bot.fetchBlocklist();
      if (blocklist.length === 0) {
        return await msg.reply("Uhh Dear, You don't have any Blocked Numbers.");
      }
      let blocklistMessage =
        "\n*≡ List*\n\n*_Total Users:* " +
        blocklist.length +
        "_\n\n┌─⊷ \t*BLOCKED USERS*\n";
      for (let i = 0; i < blocklist.length; i++) {
        blocklistMessage +=
          "▢ " +
          (i + 1) +
          ":- wa.me/" +
          blocklist[i].split("@")[0] +
          "\n";
      }
      blocklistMessage += "└───────────";
      return await msg.bot.sendMessage(msg.chat, { text: blocklistMessage });
    } catch (error) {
      await msg.error(error + "\n\ncommand : blocklist", error);
    }
  }
);

cmd(
  {
    pattern: "location",
    desc: "Adds *readmore* in given text.",
    category: "whatsapp",
    filename: __filename,
  },
  async (msg, coords) => {
    try {
      if (!coords) {
        return await msg.reply(
          "*Give Coordinates To Send Location!*\n *Ex: " +
            prefix +
            "location 24.121231,55.1121221*"
        );
      }
      let lat = parseFloat(coords.split(",")[0]) || "";
      let long = parseFloat(coords.split(",")[1]) || "";
      if (!lat || isNaN(lat) || !long || isNaN(long)) {
        return await msg.reply("*_Coordinates Not In Format, Try Again_*");
      }
      await msg.reply(
        "*----------LOCATION------------*\n```Sending Location Of Given Data:\n Latitude: " +
          lat +
          "\n Longitude: " +
          long +
          "```\n\n" +
          Config.caption
      );
      return await msg.sendMessage(
        msg.jid,
        {
          location: {
            degreesLatitude: lat,
            degreesLongitude: long,
          },
        },
        {
          quoted: msg,
        }
      );
    } catch (error) {
      await msg.error(error + "\n\ncommand : location", error);
    }
  }
);

smd(
  {
    pattern: "listpc",
    category: "whatsapp",
    desc: "Finds info about personal chats",
    filename: __filename,
  },
  async (msg, text, { store }) => {
    try {
      msg.react("🫡");
      let personalChats = await store.chats
        .all()
        .filter((chat) => chat.id.endsWith(".net"))
        .map((chat) => chat);
      let personalChatMessage =
        " 「  " +
        Config.botname +
        "'s pm user list  」\n\nTotal " +
        personalChats.length +
        " users are texting in personal chat.";
      for (let chat of personalChats) {
        personalChatMessage +=
          "\n\nUser: @" +
          chat.id.split("@")[0] +
          "\nMessages : " +
          chat.unreadCount +
          "\nLastchat : " +
          moment(chat.conversationTimestamp * 1000)
            .tz("Asia/Kolkata")
            .format("DD/MM/YYYY HH:mm:ss");
      }
      msg.bot.sendTextWithMentions(msg.chat, personalChatMessage, msg);
    } catch (error) {
      return await msg.error(
        error + "\n\n command: listpc",
        error,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);

smd(
  {
    pattern: "listgc",
    category: "whatsapp",
    desc: "Finds info about all active groups",
    filename: __filename,
  },
  async (msg, text, { store, Void }) => {
    try {
      msg