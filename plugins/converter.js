const axios = require("axios");
const fs = require("fs-extra");
const util = require("util");
const {
  StickerTypes
} = require("wa-sticker-formatter");
const fetch = require("node-fetch");
const {
  fancytext,
  smdBuffer,
  getBuffer,
  listall,
  prefix,
  smd,
  TelegraPh,
  Config
} = require("../lib");

async function generateSticker(context, mediaBuffer, metadata = {
  pack: Config.packname,
  author: Config.author
}, logError = true) {
  try {
    const { Sticker } = require("wa-sticker-formatter");
    let sticker = new Sticker(mediaBuffer, {
      ...metadata
    });
    return await context.bot.sendMessage(context.chat, {
      sticker: await sticker.toBuffer()
    }, {
      quoted: context,
      messageId: context.bot.messageId()
    });
  } catch (error) {
    if (logError) {
      await context.error(`${error}\n\nfileName: generateSticker->s.js\n`);
    }
  }
}

const messageTypes = ["imageMessage", "videoMessage", "stickerMessage"];

// Command to create sticker from replied image/video
smd({
  cmdname: "sticker",
  alias: ["s"],
  info: "Makes sticker of replied image/video.",
  type: "sticker",
  filename: __filename,
  use: "<reply to any image/video.>"
}, async (context) => {
  try {
    let mediaMessage = messageTypes.includes(context.mtype) ? context : context.reply_message;
    if (mediaMessage && messageTypes.includes(mediaMessage?.mtype || "need_Media")) {
      let mediaBuffer = await mediaMessage.download();
      let metadata = {
        pack: Config.packname,
        author: Config.author,
        type: StickerTypes.FULL,
        quality: 10
      };
      await generateSticker(context, mediaBuffer, metadata);
      return mediaBuffer = false;
    } else {
      return context.reply("*_Uhh Dear, Reply to image/video!!_*");
    }
  } catch (error) {
    return await context.error(`${error}\n\ncmdName: sticker\n`);
  }
});

// Command to create sticker from a sticker reply
smd({
  cmdname: "take",
  info: "Makes sticker of replied image/video.",
  type: "sticker",
  filename: __filename,
  use: "<reply to sticker.>"
}, async (context, args) => {
  try {
    let replyMessage = context.reply_message;
    if (!replyMessage || replyMessage?.mtype != "stickerMessage") {
      return await context.reply("*Uhh Please, Reply to sticker*");
    }
    let [packName, authorName] = args.split("|").map(item => item.trim() || "QUEEN_MARIA ♥️");
    let mediaBuffer = await replyMessage.download();
    let metadata = {
      pack: packName,
      author: authorName,
      type: StickerTypes.FULL,
      quality: 10
    };
    await generateSticker(context, mediaBuffer, metadata);
    return mediaBuffer = false;
  } catch (error) {
    return await context.error(`${error}\n\ncmdName: take\n`);
  }
});

// Command to create sticker from given text
smd({
  cmdname: "attp",
  info: "Makes sticker of given text.",
  type: "sticker",
  filename: __filename,
  use: "< text.>"
}, async (context, text) => {
  try {
    let apiUrl = `https://raganork-api.onrender.com/api/attp?text=${text || "Please provide text to generate sticker"}&apikey=with_love_souravkl11`;
    let imageBuffer = await smdBuffer(apiUrl);
    return await generateSticker(context, imageBuffer);
  } catch (error) {
    return await context.error(`${error}\n\ncmdName: attp\n`);
  }
});

// Command to create cropped sticker from replied image
smd({
  cmdname: "crop",
  alias: ["cropsticker"],
  info: "Makes sticker of replied image.",
  type: "sticker",
  filename: __filename,
  use: "<reply to image.>"
}, async (context) => {
  try {
    let mediaMessage = messageTypes.includes(context.mtype) ? context : context.reply_message;
    if (mediaMessage && messageTypes.includes(mediaMessage?.mtype || "need_Media")) {
      let mediaBuffer = await mediaMessage.download();
      let metadata = {
        pack: Config.packname,
        author: Config.author,
        type: StickerTypes.CROPPED,
        quality: 50
      };
      await generateSticker(context, mediaBuffer, metadata);
      return mediaBuffer = false;
    } else {
      return context.reply("*_Uhh Dear, Reply to image!!_*");
    }
  } catch (error) {
    return await context.error(`${error}\n\ncmdName: crop\n`, "*_Request Failed, Reply to an image only!_*");
  }
});

// Command to create circular sticker from replied image
smd({
  cmdname: "circle",
  alias: ["circlestic", "circlesticker", "cs"],
  info: "Circle sticker of image.",
  type: "sticker",
  filename: __filename,
  use: "<reply to image.>"
}, async (context) => {
  try {
    let mediaMessage = messageTypes.includes(context.mtype) ? context : context.reply_message;
    if (mediaMessage && messageTypes.includes(mediaMessage?.mtype || "need_Media")) {
      let mediaBuffer = await mediaMessage.download();
      let metadata = {
        pack: Config.packname,
        author: Config.author,
        type: StickerTypes.CIRCLE,
        quality: 50
      };
      await generateSticker(context, mediaBuffer, metadata);
      return mediaBuffer = false;
    } else {
      return context.reply("*_Uhh Dear, Reply to image!!_*");
    }
  } catch (error) {
    return await context.error(`${error}\n\ncmdName: circle\n`, "*_Request Failed, Make sure You replied an image_*");
  }
});

// Command to create rounded sticker from replied image
smd({
  cmdname: "round",
  alias: ["roundstic", "roundsticker"],
  info: "Makes sticker of replied image/video.",
  type: "sticker",
  filename: __filename,
  use: "<reply to image.>"
}, async (context) => {
  try {
    let mediaMessage = messageTypes.includes(context.mtype) ? context : context.reply_message;
    if (mediaMessage && messageTypes.includes(mediaMessage?.mtype || "need_Media")) {
      let mediaBuffer = await mediaMessage.download();
      let metadata = {
        pack: Config.packname,
        author: Config.author,
        type: StickerTypes.ROUNDED,
        quality: 50
      };
      await generateSticker(context, mediaBuffer, metadata);
      return mediaBuffer = false;
    } else {
      return context.reply("*_Uhh Dear, Reply to an image!!_*");
    }
  } catch (error) {
    return await context.error(`${error}\n\ncmdName: round\n`, "*_Request Failed, Make sure You replied an image!_*");
  }
});

// Command to fetch random wallpaper
smd({
  cmdname: "wallpaper",
  info: "To get Random Pics",
  type: "anime",
  filename: __filename
}, async (context) => {
  try {
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=72utkjatCBC-PDcx7-Kcvgod7-QOFAm2fXwEeW8b8cc");
    const data = await response.json();
    const wallpaperUrl = data?.urls?.regular || false;
    if (wallpaperUrl) {
      await context.sendUi(context.jid, {
        caption: "*---Random Wallpapers Here---*"
      }, {
        quoted: context
      }, "image", wallpaperUrl);
    } else {
      await context.send("*_Request Failed, Wallpaper not be fetched!_*");
    }
  } catch (error) {
    return await context.error(`${error}\n\ncmdName: wallpaper\n`);
  }
});

// Command to create meme from quoted image
smd({
  pattern: "memegen",
  desc: "Write text on quoted image.",
  category: "sticker",
  filename: __filename,
  use: "<text>"
}, async (context, text) => {
  try {
    let mediaMessage = messageTypes.includes(context.mtype) ? context : context.reply_message;
    if (!text) {
      return await context.reply("*please provide text and image*");
    }
    if (!mediaMessage || !messageTypes.includes(mediaMessage.mtype)) {
      return context.reply("*Uhh please, Reply to an image*");
    }
    let [topText, bottomText] = text.split(";").map(item => item || "_");
    let mediaBuffer = await context.bot.downloadAndSaveMediaMessage(mediaMessage);
    let mediaUrl = await TelegraPh(mediaBuffer);
    fs.unlinkSync(mediaBuffer);  // Clean up downloaded file

    let memeImage = await getBuffer(`https://api.memegen.link/images/custom/${topText}/${bottomText}.png?background=${mediaUrl}`);
    await generateSticker(context,