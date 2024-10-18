const { smd, prefix, Config, smdBuffer } = require("../lib");
const fs = require("fs");

let photo = ["imageMessage"];
let gfxold = ["ad", "uncover", "clown", "mnm", "pet", "drip", "gun", "colorify"];
let gfxx = [
  "beautiful", "blur", "facepalm", "invert",
  "rainbow", "wanted", "wasted", "greyscale",
  "sepia", "rip", "trash", "hitler",
  "jail", "shit", "affect", ...gfxold
];

// Function to create URLs using external services
async function createUrl(filePath, serviceType = "1") {
  try {
    if (!filePath) return;

    if (serviceType === "1" || serviceType.toLowerCase() === "telegraph") {
      return await TelegraPh(filePath);
    } else if (serviceType === "2" || serviceType.toLowerCase().includes("ugu")) {
      return await UploadFileUgu(filePath);
    }
  } catch (error) {
    console.log("ERROR IN createUrl():", error);
  }
}

// Photo editor function
async function photoEditor(m, effect = "ad", caption = "", logError = true) {
  let allowedTypes = ["imageMessage"];
  try {
    let mediaMessage = allowedTypes.includes(m.mtype) ? m : m.reply_message;
    if (!mediaMessage || !allowedTypes.includes(mediaMessage?.mtype || "null")) {
      return await m.send("*_Please reply to an image_*");
    }
    let filePath = await m.bot.downloadAndSaveMediaMessage(mediaMessage);
    let fileUrl = await TelegraPh(filePath);

    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.log("Failed to delete file:", err);
    }

    return await m.bot.sendMessage(m.chat, {
      image: { url: `https://api.popcat.xyz/${effect}?image=${fileUrl}` },
      caption: caption,
    }, { quoted: m, messageId: m.bot.messageId() });
  } catch (error) {
    if (logError) {
      await m.error(`${error}\n\nCommand: ${effect}\nFile: photoEditor`, error);
    }
  }
}

// Function to send edited images
const sendEditor = async (m, cmd, error = true, cap = Config.caption?.split("\n")[0] || "") => {
  if (!gfxx.includes(cmd)) return;

  try {
    let mediaMessage = m.image ? m : m.reply_message?.image ? m.reply_message : false;
    if (!mediaMessage || !photo.includes(mediaMessage.mtype2)) {
      return m.reply("*_Please reply to an image_*");
    }

    let mediaPath = await m.bot.downloadAndSaveMediaMessage(mediaMessage);
    let fileUrl;

    try {
      fileUrl = (await createUrl(mediaPath, "uguMashi")).url;
      if (!fileUrl) throw new Error("Invalid Media");
    } catch (e) {
      console.log(e);
      try {
        fileUrl = await createUrl(mediaPath);
      } catch (e) {
        fileUrl = false;
      }
    }

    try {
      fs.unlinkSync(mediaPath);
    } catch (err) {
      console.log("Failed to delete file:", err);
    }

    if (!fileUrl) return m.reply("*_Failed to create URL_*");

    let buffer = await smdBuffer(`${api_smd}/api/maker/${cmd}?url=${fileUrl}`);
    m.send(buffer, { caption: cap }, "img", mediaMessage);
  } catch (error) {
    if (error) {
      console.log(error);
      await m.error(`${error}\n\nCommand: ${cmd}`, error, false);
    }
  }
};

// Register editor commands for each effect
for (let i = 0; i < gfxx.length; i++) {
  smd(
    {
      cmdname: gfxx[i],
      infocmd: `Edit image with ${gfxx[i]} effect!`,
      type: "editor",
      use: "< image >",
      filename: __filename
    },
    async (m, text, { smd }) => {
      try {
        if (gfxold.includes(smd)) {
          await photoEditor(m, smd);
        } else {
          sendEditor(m, smd);
        }
      } catch (err) {
        await m.error(`${err}\n\nCommand: ${smd}`, err, "Request Denied!");
      }
    }
  );
}

// Main editor command that shows a list of effects
smd({
  cmdname: "editor",
  infocmd: "create gfx logo for text",
  type: "editor",
  use: "< image >",
  filename: __filename
}, async (m, text, { smd }) => {
  try {
    let mediaMessage = m.image ? m : m.reply_message?.image ? m.reply_message : false;
    
    let menu = `*Separate the text with _:_ sign!*\n*Example: ${prefix + smd} WASI _:_ Bot*\n\nEditor Effects:\n${gfxx.join("\n")}`;
    if (!mediaMessage) {
      return await m.sendUi(m.chat, { caption: menu });
    }

    for (let i = 0; i < gfxx.length; i++) {
      try {
        if (gfxold.includes(gfxx[i])) {
          await photoEditor(m, gfxx[i]);
        } else {
          sendEditor(m, gfxx[i], false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  } catch (error) {
    m.error(`${error}\n\nCommand: ${smd}`, error, false);
  }
});