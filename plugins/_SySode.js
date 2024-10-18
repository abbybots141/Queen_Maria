const { exec } = require("child_process");
const { plugins, smd, Config } = require("../lib");
let s_ser = true;

// ShutDown command
smd(
  {
    cmdname: "shutdown",
    info: "To shut down the bot",
    type: "tools",
    fromMe: s_ser,
    filename: __filename,
  },
  async (message) => {
    message.reply("Shutting down...");
    exec("pm2 stop all");
  }
);

// Restart command
smd(
  {
    cmdname: "restart",
    info: "To restart the bot",
    type: "tools",
    fromMe: s_ser,
    filename: __filename,
  },
  async (message) => {
    message.reply("Bot is restarting ♻️");
    exec("pm2 restart all");
  }
);

// List installed plugins command
smd(
  {
    cmdname: "plugins",
    alias: ["plugin"],
    type: "owner",
    info: "Shows a list of all externally installed modules",
    fromMe: s_ser,
    filename: __filename,
    use: "<name>",
  },
  async (message, pluginName) => {
    try {
      let installedPlugins = await plugins(message, "plugins", pluginName);
      return await message.send(
        !installedPlugins
          ? "*_There's no plugin installed in " + Config.botname + "_*"
          : !pluginName
          ? "*All Installed Modules are:-*\n\n" + installedPlugins
          : installedPlugins
      );
    } catch (err) {
      message.error(err + " \n\ncmdName plugins\n");
    }
  }
);

// Remove plugin command
smd(
  {
    cmdname: "remove",
    alias: ["uninstall"],
    type: "owner",
    info: "Removes external modules.",
    fromMe: s_ser,
    filename: __filename,
    use: "<plugin name>",
  },
  async (message, pluginName) => {
    if (!pluginName) {
      return await message.reply("*_Uhh Please, Provide Me Plugin Name_*");
    }
    if (pluginName === "alls") {
      return await message.reply(await plugins("remove", "all", __dirname));
    }
    try {
      await message.send(
        await plugins(message, "remove", pluginName, __dirname),
        {},
        "",
        message
      );
    } catch (err) {
      message.error(err + " \n\ncmdName remove\n");
    }
  }
);

// Install plugin command
smd(
  {
    cmdname: "install",
    type: "owner",
    info: "Installs external modules.",
    fromMe: s_ser,
    filename: __filename,
    use: "<gist url>",
  },
  async (message, pluginUrl) => {
    let url = pluginUrl ? pluginUrl : message.quoted ? message.quoted.text : "";
    if (!url.toLowerCase().includes("https")) {
      return await message.send("*_Uhh Please, Provide Me Plugin Url_*");
    }
    await message.reply(await plugins(message, "install", url, __dirname));
  }
);