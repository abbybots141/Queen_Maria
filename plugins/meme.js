const axios = require("axios");
const fs = require("fs-extra");
const { exec } = require("child_process");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const fetch = require("node-fetch");
const { userdb, tiny, fancytext, smdBuffer, getBuffer, sleep, listall, getRandom, prefix, smd, generateSticker, TelegraPh, Config, tlang } = require("../lib/");
let s_ser = Config.WORKTYPE === "public" ? false : true;

smd({
  pattern: "trump",
  alias: ["tea", "kofi"],
  category: "meme",
  desc: "Give text to create Trump tweet",
  filename: __filename
}, async (message, text) => {
  try {
    if (!text) {
      return await message.send("*Provide text!*");
    }
    const sourceImg = "./plugins/meme.say/trumSay.png";
    const tempImg = "./temp/trump.png";
    let editedImg = await addTextToImage(sourceImg, tempImg, "  " + text, 70, 150, 700, 4, "35");
    await sleep(1500);
    await message.bot.sendMessage(message.jid, {
      image: { url: editedImg },
      caption: Config.caption
    });
  } catch (error) {
    return await message.error(error + "\n\n command: trump", error, "*_Didn't get any results, Sorry!_*");
  }
});

smd({
  pattern: "mia",
  alias: ["tea", "kofi"],
  category: "meme",
  desc: "Finds info about song",
  filename: __filename
}, async (message, text) => {
  try {
    if (!text) {
      return await message.send("*Provide text!*");
    }
    const sourceImg = "./plugins/meme.say/mia.png";
    const tempImg = "./temp/mia.png";
    let editedImg = await addTextToImage(sourceImg, tempImg, "  " + text, 90, 120, 600, 3, "35");
    await sleep(1500);
    await message.bot.sendMessage(message.jid, {
      image: { url: editedImg },
      caption: Config.caption
    });
  } catch (error) {
    return await message.error(error + "\n\n command: mia", error, "*_Didn't get any results, Sorry!_*");
  }
});

smd({
  pattern: "johni",
  alias: ["tea", "kofi"],
  category: "meme",
  desc: "Finds info about song",
  filename: __filename
}, async (message, text) => {
  try {
    if (!text) {
      return await message.send("*Provide text!*");
    }
    const sourceImg = "./plugins/meme.say/johni.png";
    const tempImg = "./temp/johni.png";
    let editedImg = await addTextToImage(sourceImg, tempImg, "  " + text, 40, 210, 570, 3, "30");
    await sleep(1500);
    await message.bot.sendMessage(message.jid, {
      image: { url: editedImg },
      caption: Config.caption
    });
  } catch (error) {
    return await message.error(error + "\n\n command: johni", error, "*_Didn't get any results, Sorry!_*");
  }
});

async function addTextToImage(sourcePath, outputPath, text, x, y, maxWidth, maxLines, fontSize = "30") {
  const { createCanvas, loadImage } = require("canvas");
  const image = await loadImage(sourcePath);
  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext("2d");
  
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  context.font = `${fontSize}px Arial`;
  context.fillStyle = "black";
  context.textAlign = "left";
  context.textBaseline = "top";

  const lines = splitTextIntoLines(text, context, maxWidth);
  if (lines.length > maxLines) {
    lines.splice(maxLines);
    const lastLine = lines[maxLines - 1];
    lines[maxLines - 1] = lastLine.slice(0, lastLine.length - 10) + "...Read More";
  }

  lines.forEach((line, i) => {
    context.fillText(line, x, y + i * 25);
  });

  const writeStream = fs.createWriteStream(outputPath);
  const pngStream = canvas.createPNGStream();
  pngStream.pipe(writeStream);

  await new Promise(resolve => {
    writeStream.on("finish", resolve);
  });

  return outputPath;
}

function splitTextIntoLines(text, context, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine === "" ? word : currentLine + " " + word;
    const testWidth = context.measureText(testLine).width;

    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine !== "") {
    lines.push(currentLine);
  }

  return lines;
}