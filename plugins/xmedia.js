const moment = require("moment-timezone");
const {
  fetchJson,
  smd,
  tlang,
  send,
  getBuffer,
  prefix,
  Config,
  sleep,
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const { shazam } = require("../lib");
let yts = require("secktor-pack");
const { MessageType, Mimetype } = require("@whiskeysockets/baileys");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const { execFile } = require("child_process");
const exec = require("child_process").exec;

smd(
  {
    pattern: "x4mp4",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x4b18a7) => {
    try {
      if (!_0x4b18a7.reply_message.video) {
        return await _0x4b18a7.send("*Need Video!*");
      }
      let outputFilePath = "./temp/x4mp4.mp4";
      var inputFilePath = await _0x4b18a7.bot.downloadAndSaveMediaMessage(
        _0x4b18a7.quoted.msg
      );
      ffmpeg(inputFilePath)
        .withSize("25%")
        .format("mp4")
        .save(outputFilePath)
        .on("end", async () => {
          try {
            fs.unlinkSync(inputFilePath);
          } catch (error) {
            console.error("Error deleting input file:", error);
          }
          await _0x4b18a7.bot.sendMessage(_0x4b18a7.jid, {
            video: fs.readFileSync(outputFilePath),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(outputFilePath);
          } catch (error) {
            console.error("Error deleting output file:", error);
          }
        });
    } catch (error) {
      return await _0x4b18a7.error(
        error + "\n\n command: coffe",
        error,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);

smd(
  {
    pattern: "x2mp4",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x366978) => {
    try {
      if (!_0x366978.reply_message.video) {
        return await _0x366978.send("*Need Video!*");
      }
      let outputFilePath = "./temp/x2mp4.mp4";
      var inputFilePath = await _0x366978.bot.downloadAndSaveMediaMessage(
        _0x366978.quoted.msg
      );
      ffmpeg(inputFilePath)
        .withSize("50%")
        .format("mp4")
        .save(outputFilePath)
        .on("end", async () => {
          try {
            fs.unlinkSync(inputFilePath);
          } catch (error) {
            console.error("Error deleting input file:", error);
          }
          await _0x366978.bot.sendMessage(_0x366978.jid, {
            video: fs.readFileSync(outputFilePath),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(outputFilePath);
          } catch (error) {
            console.error("Error deleting output file:", error);
          }
        });
    } catch (error) {
      return await _0x366978.error(
        error + "\n\n command: x2mp4",
        error,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);

smd(
  {
    pattern: "mp4image",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x46cbb2) => {
    try {
      if (!_0x46cbb2.reply_message.image) {
        return await _0x46cbb2.send("*Need image!*");
      }
      let outputFilePath = "./temp/x2mp4.mp4";
      var inputFilePath = await _0x46cbb2.bot.downloadAndSaveMediaMessage(
        _0x46cbb2.quoted.msg
      );
      ffmpeg(inputFilePath)
        .loop(6)
        .fps(19)
        .videoBitrate(400)
        .size("640x480")
        .format("mp4")
        .save(outputFilePath)
        .on("end", async () => {
          try {
            fs.unlinkSync(inputFilePath);
          } catch (error) {
            console.error("Error deleting input file:", error);
          }
          await _0x46cbb2.sendMessage(_0x46cbb2.jid, {
            video: fs.readFileSync(outputFilePath),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(outputFilePath);
          } catch (error) {
            console.error("Error deleting output file:", error);
          }
        });
    } catch (error) {
      return await _0x46cbb2.error(
        error + "\n\n command: x2mp4",
        error,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);

// Additional command handlers follow the same structure...
// The remaining command handlers should follow a similar pattern as above

// Example for mp4vintage command
smd(
  {
    pattern: "mp4vintage",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x3ea4a9) => {
    try {
      if (!_0x3ea4a9.reply_message.video) {
        return await _0x3ea4a9.send("*Need Video!*");
      }
      let outputFilePath = "./temp/mp4vintage.mp4";
      var inputFilePath = await _0x3ea4a9.bot.downloadAndSaveMediaMessage(
        _0x3ea4a9.quoted.msg
      );
      ffmpeg(inputFilePath)
        .outputOptions(["-y", "-vf", "curves=vintage,format=yuv420p"])
        .fps(22)
        .save(outputFilePath)
        .on("end", async () => {
          try {
            fs.unlinkSync(inputFilePath);
          } catch (error) {
            console.error("Error deleting input file:", error);
          }
          await _0x3ea4a9.bot.sendMessage(_0x3ea4a9.jid, {
            video: fs.readFileSync(outputFilePath),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(outputFilePath);
          } catch (error) {
            console.error("Error deleting output file:", error);
          }
        });
    } catch (error) {
      return await _0x3ea4a9.error(
        error + "\n\n command: mp4vintage",
        error,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);

// Continue to add the other handlers in a similar manner

// Ensure all commands follow the same structure and handle errors appropriately