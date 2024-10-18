const { smd, prefix, Config } = require('../lib');
const fetch = require('node-fetch');

async function textToLogoGenerator(message, textProUrl, text1, text2 = "ser", serviceType = "textpro", retryOnFail = true) {
  let mumakerResponse = {};
  let apiResponse = {};
  let url = /1|ephoto|ephoto360/gi.test(serviceType) ? `https://ephoto360.com/${textProUrl}.html` :
           /2|photooxy|photooxy/gi.test(serviceType) ? `https://photooxy.com/${textProUrl}.html` :
           /3|enphoto|en360/gi.test(serviceType) ? `https://en.ephoto360.com/${textProUrl}.html` :
           `https://textpro.me/${textProUrl}.html`;

  try {
    const { textpro } = require('mumaker');
    if (text1) {
      mumakerResponse = await textpro(url, [text1, text2]);
    }

    let captionContext = {} || { ...(await message.bot.contextInfo('Text to Logo', `Hello ${message.senderName}`)) };
    return await message.bot.sendMessage(message.jid, {
      image: { url: mumakerResponse.image },
      caption: Config.caption,
      contextInfo: captionContext
    }, { messageId: message.bot.messageId() });
  } catch (error) {
    try {
      let apiUrl = `${global.api_smd}/api/maker?text1=${text1}&text2=${text2}&url=${url}`;
      apiResponse = await fetchJson(apiUrl);

      if ((!apiResponse || !apiResponse.status || !apiResponse.img) && retryOnFail) {
        return message.error(`${error}\nWebinfo: ${apiResponse.img || apiResponse}\n\nfileName: textToLogoGenerator->s.js`, error);
      }

      await message.bot.sendMessage(message.jid, { image: { url: apiResponse.img } }, { messageId: message.bot.messageId() });
    } catch (err) {
      let imageUrl = mumakerResponse && mumakerResponse.image ? mumakerResponse.image :
                     apiResponse && apiResponse.img ? apiResponse.img : false;

      if (retryOnFail) {
        message.error(`${error}\n\nAPI Error: ${err}\n\nfileName: textToLogoGenerator->s.js`, error, (imageUrl ? `Here we go\n\n${imageUrl}` : "Error, Request Denied!").trim());
      }
    }
  }
}

async function fetchJson(url) {
  const response = await fetch(url);
  return await response.json();
}

smd({
  cmdname: 'logo1',
  type: 'logo',
  info: 'Some text to image feature with various styles.',
  filename: __filename,
}, async (message, match) => {
  try {
    if (!match) return message.reply(`*_Example : ${prefix + cmdName} WASI_*`);
    await textToLogoGenerator(
      message,
      'hieu-ung-chu/tao-hieu-ung-chu-mam-anh-sang-74',
      match,
      'ser',
      '1'
    );
  } catch (e) {
    return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
  }
});

smd({
  cmdname: 'logo2',
  type: 'logo',
  info: 'Some text to image feature with various styles.',
  filename: __filename,
}, async (message, match) => {
  try {
    if (!match) return message.reply(`*_Example : ${prefix + cmdName} WASI_*`);
    return await textToLogoGenerator(
      message,
      'tao-hieu-ung-chu-digital-glitch-truc-tuyen-941',
      match,
      'WASI',
      '1'
    );
  } catch (e) {
    return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
  }
});

// Repeat similarly for other commands like logo3, logo4, etc.