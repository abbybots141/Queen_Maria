const { smd, bot_ } = require("../lib");

let bgmm = false;

// Command to turn on or off the anti-view once downloader
smd(
  {
    cmdname: "antiviewonce",
    alias: ["antivv"],
    desc: "Turn On/Off auto viewOnce Downloader",
    fromMe: true,
    type: "user",
    use: "<on/off>",
    filename: __filename,
  },
  async (message, commandArgs) => {
    try {
      // Fetch or create bot settings for the user
      bgmm =
        (await bot_.findOne({
          id: "bot_" + message.user,
        })) ||
        (await bot_.new({
          id: "bot_" + message.user,
        }));

      // Get the command argument and determine the action
      let action = commandArgs.toLowerCase().split(" ")[0].trim();
      if (action === "on" || action === "enable" || action === "act") {
        if (bgmm.antiviewonce === "true") {
          return await message.reply("*AntiViewOnce already enabled!*");
        }
        await bot_.updateOne(
          {
            id: "bot_" + message.user,
          },
          {
            antiviewonce: "true",
          }
        );
        return await message.reply("*AntiViewOnce successfully enabled*");
      } else if (action === "off" || action === "disable" || action === "deact") {
        if (bgmm.antiviewonce === "false") {
          return await message.reply("*AntiViewOnce already disabled*");
        }
        await bot_.updateOne(
          {
            id: "bot_" + message.user,
          },
          {
            antiviewonce: "false",
          }
        );
        return await message.reply("*AntiViewOnce successfully deactivated*");
      } else {
        return await message.send(
          "*Use on/off to enable/disable AntiViewOnce!*"
        );
      }
    } catch (error) {
      await message.error(
        error + "\n\nCommand: AntiViewOnce ",
        error
      );
    }
  }
);

// Event handler for view-once messages
smd(
  {
    on: "viewonce",
  },
  async (message, viewOnceMessage) => {
    try {
      if (!bgmm) {
        bgmm = await bot_.findOne({
          id: "bot_" + message.user,
        });
      }
      // Check if anti-view once feature is enabled
      if (bgmm && bgmm.antiviewonce === "true") {
        let responseKey = {
          key: {
            ...message.key,
          },
          message: {
            conversation: "```[VIEWONCE DETECTED] downloading!```",
          },
        };
        
        // Download the media message
        let mediaPath = await message.bot.downloadAndSaveMediaMessage(
          viewOnceMessage
        );

        // Send the downloaded media back to the user
        await message.bot.sendMessage(
          message.from,
          {
            [message.mtype2.split("Message")[0]]: {
              url: mediaPath,
            },
            caption: message.body,
          },
          {
            quoted: responseKey,
          }
        );
      }
    } catch (error) {
      console.log("Error while getting anti-view once media:\n", error);
    }
  }
);