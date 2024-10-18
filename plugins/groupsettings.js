global.warncount = process.env.WARN_COUNT || global.warncount || "3";
global.MsgsInLog = process.env.MSGS_IN_LOG || global.MsgsInLog || "false";
const {
  groupdb,
  userdb,
  bot_,
  smd,
  sendWelcome,
  Config,
  tlang,
  sleep,
  prefix,
} = require("../lib");
const axios = require("axios");
const astro_patch = require("../lib/plugins");

smd(
  {
    pattern: "lydea",
    alias: ["chatbot"],
    desc: "Activates and deactivates chatbot.\nUse buttons to toggle.",
    fromMe: true,
    category: "ai",
    filename: __filename,
  },
  async (_0x1a5020, _0x1f22c3, { cmdName: _0x431455 }) => {
    try {
      let _0x974aae = _0x1f22c3.split(" ")[0].toLowerCase().trim();
      let _0x44755b =
        (await groupdb.findOne({ id: _0x1a5020.chat })) ||
        (await groupdb.new({ id: _0x1a5020.chat }));
      let _0x4924e5 =
        (await bot_.findOne({ id: "bot_" + _0x1a5020.user })) ||
        (await bot_.new({ id: "bot_" + _0x1a5020.user })) || {
          chatbot: "false",
        };

      if (_0x974aae === "all" || _0x974aae === "global") {
        if (_0x4924e5.chatbot === "true") {
          return await _0x1a5020.send(
            `*${_0x431455} was already enabled for all chats!*`
          );
        }
        await bot_.updateOne(
          { id: "bot_" + _0x1a5020.user },
          { chatbot: "true" }
        );
        return await _0x1a5020.send(
          `*${_0x431455} successfully enabled for all chats!*`
        );
      } else if (
        _0x974aae.startsWith("on") ||
        _0x974aae.startsWith("act") ||
        _0x974aae.startsWith("enable")
      ) {
        if (_0x44755b.chatbot === "true" || _0x4924e5.chatbot === "true") {
          return await _0x1a5020.send(`*${_0x431455} was already enabled.*`);
        }
        await groupdb.updateOne(
          { id: _0x1a5020.chat },
          { chatbot: "true" }
        );
        return await _0x1a5020.send(`*${_0x431455} activated successfully.*`);
      } else if (
        _0x974aae.startsWith("off") ||
        _0x974aae.startsWith("deact") ||
        _0x974aae.startsWith("disable")
      ) {
        if (_0x44755b.chatbot === "false" && _0x4924e5.chatbot === "false") {
          return await _0x1a5020.send(`*${_0x431455} was already disabled.*`);
        }
        await bot_.updateOne(
          { id: "bot_" + _0x1a5020.user },
          { chatbot: "false" }
        );
        await groupdb.updateOne(
          { id: _0x1a5020.chat },
          { chatbot: "false" }
        );
        return await _0x1a5020.send(`*${_0x431455} deactivated successfully.*`);
      } else {
        return await _0x1a5020.reply(
          `*${_0x431455} Currently *${
            _0x4924e5.chatbot === "true"
              ? "Enabled in 'all' Chats"
              : _0x44755b.chatbot === "true"
              ? "Enabled in Chat"
              : "Disabled in Chat"
          }!* Use On/Off/all to enable/disable ${_0x431455}`
        );
      }
    } catch (error) {
      _0x1a5020.error(`Error: ${error}\n\ncommand: lydea(chatbot)`, error);
    }
  }
);