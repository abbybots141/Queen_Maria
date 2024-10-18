function hi() {
  console.log("Hello World!");
}
hi();
const os = require('os');
const Config = require('../config');
let {
  fancytext,
  tiny,
  runtime,
  formatp,
  prefix
} = require("../lib");
const long = String.fromCharCode(0x200e);
const readmore = long.repeat(0xfa1);
const astro_patch = require("../lib/plugins");

astro_patch.smd({
  'cmdname': "menu",
  'desc': "To show all available commands.", // Keep only one 'desc'
  'react': '🍁',
  'type': 'user',
  'filename': __filename
}, async (context, message) => {
  try { 
    const { commands } = require("../lib");
    const os = require('os');
    const { formatp, runtime, fancytext, tiny, readmore } = require('../lib');
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const currentDate = currentTime.toLocaleDateString();
    let greeting = "";

    if (hours >= 5 && hours < 12) {
  greeting = "Good Morning!";
} else if (hours >= 12 && hours < 18) {
  greeting = "Good Afternoon!";
} else if (hours >= 18 && hours < 22) {
  greeting = "Good Evening!";
} else {
  greeting = "Good Night!";
}

    const commandCategories = {};
    commands.forEach(cmd => {
      if (!cmd.dontAddCommandList && cmd.pattern) {
        if (!commandCategories[cmd.category]) {
          commandCategories[cmd.category] = [];
        }
        commandCategories[cmd.category].push(cmd.pattern);
      }
    });

    // Set the desired menu design
    const header = "┏━━👑 *" + Config.botname + "* 👑━━✿︎\n";
    const lineSeparator = "┃ ";
    const commandPrefix = "┏━━👑";
    const commandSuffix = "👑━━✿︎";
    const footer = "┗━━━━━━━━━━━━━━✿︎";

    let menuContent = header;
    menuContent += lineSeparator + "👑 > *ᴏᴡɴᴇʀ ɴᴀᴍᴇ:* " + Config.ownername + "\n";
    menuContent += lineSeparator + "👑*ᴜᴘᴛɪᴍᴇ:* " + runtime(process.uptime()) + "\n";
    menuContent += lineSeparator + "👑 *ʀᴀᴍ ᴜꜱᴇ:* " + formatp(os.totalmem() - os.freemem()) + "\n";
    menuContent += lineSeparator + "👑 *ᴅᴀᴛᴇ:* " + currentDate + "\n";
    menuContent += lineSeparator + "👑 *ʙᴏᴛ ᴄᴏᴍᴍᴀɴᴅꜱ:* " + commands.length + "\n";
    menuContent += lineSeparator + greeting + "\n";

    ''List commands by category
    for (const category in commandCategories) {
      menuContent += commandPrefix + " *" + tiny(category) + "* " + commandSuffix + "\n";
      commandCategories[category].forEach(cmd => {
        menuContent += "┃   ☘️ " + fancytext(cmd, 1) + "\n";
      });
    }
    
    menuContent += footer + "\n\nᴍᴀᴅᴇ ᴡɪᴛʜ ʟᴏᴠᴇ *" + Config.botname + "*!\n©ᴀʙʙʏ\n" + readmore;

    const response = {
      'caption': menuContent,
      'ephemeralExpiration': 3000
    };

    return await context.sendUi(context.chat, response, context);
  } catch (error) {
    await context.error(error + "\nCommand: menu", error);
  }
});
