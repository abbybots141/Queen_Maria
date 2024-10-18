const { smd, prefix } = require('../lib');

smd({
  cmdname: "fakereply",
  alias: ['freply'],
  desc: "Create fake reply by given texts!",
  type: "general",
  use: "msg | reply_text | number | type(text, order, contact, image, video)",
  usage: "Generates fake messages of given text and number!",
  filename: __filename,
  public: true,
}, async (m, text) => {
  try {
    let types = ["text", "order", "contact", "image", "video"];
    let args = text.split("|");

    if (!text || args.length < 3) {
      return await m.reply(`*Use: ${prefix}fakereply text | reply_text | 263710405675 | type(text,order,contact,image,video)*`);
    }

    let reply = args[0].trim();
    let msg = args[1].trim();
    let num = `${args[2].replace(/[^0-9]/g, '')}@s.whatsapp.net`;
    let type = args[3] && types.includes(args[3].trim()) ? args[3].trim() : "text";

    // Generate random message ID
    let charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let smds = 'SMD';
    for (let i = 0; i < 13; i++) {
      smds += charset[Math.floor(Math.random() * charset.length)];
    }

    // Create fake message
    let fak = await m.bot.fakeMessage(type, {
      id: smds,
      remoteJid: m.isGroup ? m.chat : num,
      participant: num
    }, msg);

    // Add profile picture if the type is contact
    try {
      if (type === "contact") {
        fak.message.contactMessage.jpegThumbnail = await m.getpp(num);
      }
    } catch (e) {
      console.log("Error fetching profile picture:", e);
    }

    // Send the fake reply message
    await m.bot.sendMessage(m.chat, { text: reply }, { quoted: fak });
    
  } catch (e) {
    await m.error(`${e}\n\nCommand: fakereply`, e, false);
  }
});