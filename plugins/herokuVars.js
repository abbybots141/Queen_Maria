const Config = require("../config");
let {
  fancytext,
  tlang,
  tiny,
  runtime,
  formatp,
  botpic,
  prefix,
  sck1,
  smd,
} = require("../lib");
const axios = require("axios");
const appName = Config.HEROKU_APP_NAME
  ? Config.HEROKU_APP_NAME.toLowerCase()
  : "";
const authToken = Config.HEROKU_API_KEY;
const HEROKU = authToken && appName ? true : false;
const fetch = require("node-fetch");

let updateConfig = () => {
  try {
    let configPath = "../config";
    delete require.cache[configPath];
    require(configPath);
    return true;
  } catch (error) {
    console.log(error);
  }
};

const heroku = {};

heroku.addVar = async (key, value) => {
  try {
    const headers = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    };
    const response = await fetch(
      `https://api.heroku.com/apps/${appName}/config-vars`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ [key]: value }),
      }
    );
    const result = await response.json();
    return { status: true, data: result };
  } catch (error) {
    return { status: false, data: error };
  }
};

heroku.getAllVars = async () => {
  try {
    const headers = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
    };
    const response = await fetch(
      `https://api.heroku.com/apps/${appName}/config-vars`,
      { headers }
    );
    const result = await response.json();
    let output =
      `   『 *${appName} VARS* 』 \n*________________________________________*\n`;
    Object.keys(result).forEach((key) => {
      output += `*${key}:* ${result[key] ? "```" + result[key] + "```" : ""}\n`;
    });
    return { status: true, data: output };
  } catch (error) {
    return { status: false, data: error.message || error };
  }
};

heroku.getVar = async (key) => {
  try {
    const headers = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
    };
    const response = await fetch(
      `https://api.heroku.com/apps/${appName}/config-vars`,
      { headers }
    );
    const result = await response.json();
    return { status: true, data: result[key] };
  } catch (error) {
    return { status: false, data: error.message || error };
  }
};

heroku.setVar = async (key, value) => {
  try {
    const headers = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    };
    const response = await fetch(
      `https://api.heroku.com/apps/${appName}/config-vars`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ [key]: value }),
      }
    );
    const result = await response.json();
    return { status: true, data: result };
  } catch (error) {
    return { status: false, data: error.message || error };
  }
};

// Example command implementation to get the sudo users
smd(
  {
    cmdname: "getsudo",
    alias: ["mods", "gsudo"],
    info: "get sudo users list.",
    fromMe: true,
    type: "tools",
    filename: __filename,
  },
  async (msg) => {
    let sudoUsers = global.sudo
      .split(",")
      .filter((user) => user && user !== "null")
      .map((user) => user.trim());
    let sudoList = sudoUsers
      .map((user, index) => `  ${index + 1} 〄 @${user}\n\n`)
      .join("");
    let mentions = [msg.sender, ...sudoUsers.map((user) => `${user}@s.whatsapp.net`)];
    if (!sudoList || !sudoUsers.length) {
      return await msg.reply("*There's no mods/sudo added for your bot!*");
    }
    let response = `\n   👤 *${Config.botname || "BOT_NAME"} MODS* 👤\n   \n${sudoList}`.trim();
    return await msg.reply(
      "https://telegra.ph/file/5fd51597b0270b8cff15b.png",
      { caption: response, mentions },
      "img",
      msg
    );
  }
);