const axios = require('axios');
const { cmd } = require("../lib/plugins");
const eco = require("discord-mongoose-economy");
const {
  smd,
  prefix,
  send,
  Config 
} = require("../lib/");

// Command to guess the age of a person based on their name
smd({
  pattern: "guessage",
  alias: ["age"],
  desc: "Guesses the age of a person based on their name.",
  category: "fun",
  use: "guessage [name]",
  examples: ["guessage John", "guessage Emily"]
}, async (message, input) => {
  const name = input;
  if (!name) {
    return message.reply("Please provide a name to guess the age.");
  }
  try {
    const response = await axios.get(`https://api.agify.io/?name=${name}`);
    const { count, age } = response.data;
    const output = `
*Name:* ${name}
*Estimated Age:* ${age}
*Count:* ${count}
    `;
    await message.send(output);
  } catch (error) {
    await message.error(error + "\n\nCommand: guessage", error, "Failed to guess age.");
  }
});

// Command to guess the likely countries associated with a name
smd({
  pattern: "guesscountry",
  alias: ["country"],
  desc: "Guesses the likely countries associated with a name.",
  category: "fun",
  use: "guesscountry [name]",
  examples: ["guesscountry Michael", "guesscountry Fatima"]
}, async (message, input) => {
  const name = input;
  if (!name) {
    return message.reply("Please provide a name to guess the country.");
  }
  try {
    const response = await axios.get(`https://api.nationalize.io/?name=${name}`);
    const { count, country } = response.data;
    let output = `
*Name:* ${name}
*Count:* ${count}
*Likely Countries:*
`;
    country.forEach((c, index) => {
      output += `\n${index + 1}. ${c.country_id} (${(c.probability * 100).toFixed(2)}%)`;
    });
    await message.send(output);
  } catch (error) {
    await message.error(error + "\n\nCommand: guesscountry", error, "Failed to guess country.");
  }
});

// Command to guess the gender of a person based on their name
smd({
  pattern: "guessgender",
  alias: ["gender"],
  desc: "Guesses the gender of a person based on their name.",
  category: "fun",
  use: "guessgender [name]",
  examples: ["guessgender David", "guessgender Sarah"]
}, async (message, input) => {
  const name = input;
  if (!name) {
    return message.reply("Please provide a name to guess the gender.");
  }
  try {
    const response = await axios.get(`https://api.genderize.io/?name=${name}`);
    const { count, gender, probability } = response.data;
    const output = `
*Name:* ${name}
*Estimated Gender:* ${gender}
*Probability:* ${(probability * 100).toFixed(2)}%
*Count:* ${count}
    `;
    await message.send(output);
  } catch (error) {
    await message.error(error + "\n\nCommand: guessgender", error, "Failed to guess gender.");
  }
});

// Number guessing game
const astro_patch_numGuess = {};
class GuessingGame {
  constructor() {
    this.attempts = 0;
    this.player = "";
    this.id = "";
    this.status = false;
    this.mode = "low";
    this.randomNumber = 0;
    this.guessedNumber = 0;
  }
}

const logoName = "█▄ █ █   █  █▄ ▄█  ██▄ ██▀ █▀▄\n█ ▀█ █▄█  █  ▀  █  █▄█ █▄▄ █▀▄";
smd({
  cmdname: "guess",
  info: "Play Guessing Number game",
  filename: __filename,
  type: "game",
  use: "< easy | medium | hard >"
}, async (message, input) => {
  try {
    const chatId = message.chat;
    let currentGame = astro_patch_numGuess[chatId];
    const difficulty = input.toLowerCase();
    const isCreator = currentGame && currentGame.player === message.sender ? true : message.isCreator;

    if (difficulty === "end" && currentGame) {
      if (isCreator) {
        delete astro_patch_numGuess[chatId];
        return await message.reply("*_Number Guessing Game ended. Goodbye!_*");
      } else {
        return await message.reply("*_You're not the player of the running game!!_*");
      }
    } else if (difficulty === "end" && !currentGame) {
      return await message.reply("*_Hey " + (message.senderName || "master") + ", there's no game running yet!!_*");
    }

    if (currentGame && currentGame.status) {
      return await message.reply("*_A game is already in progress in this chat._*\n To End the Game:  .Guess end");
    }

    let randomNumber = 0;
    let mode = "";

    if (difficulty.includes("easy")) {
      randomNumber = Math.floor(Math.random() * 100);
      mode = "Easy";
    } else if (difficulty.includes("medium")) {
      randomNumber = Math.floor(Math.random() * 1000);
      mode = "Medium";
    } else if (difficulty.includes("hard")) {
      randomNumber = Math.floor(Math.random() * 10000);
      mode = "Hard";
    } else {
      return await message.send(logoName + "\n   𝗡𝘂𝗺𝗯𝗲𝗿 𝗚𝘂𝗲𝘀𝘀𝗶𝗻𝗴 𝗚𝗮𝗺𝗲 𝗠𝗲𝗻𝘂\n\n*Uhh Dear, Choose " + (difficulty ? "a Valid Option" : "an Option") + " First, Like _" + prefix + "Guess Normal_*\n*𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗠𝗼𝗱𝗲𝘀:*\n  ▢ Easy   ( _0 to 100_)\n  ▢ Medium ( _0 to 1000_)\n  ▢ Hard   ( _0 to 10000_)\n  ▢ End  ( _End the Game_)\n");
    }

    if (!currentGame) {
      astro_patch_numGuess[chatId] = new GuessingGame();
    }
    
    currentGame = astro_patch_numGuess[chatId];
    currentGame.status = true;
    currentGame.randomNumber = randomNumber;
    currentGame.mode = mode;
    currentGame.player = message.sender;
    currentGame.id = message.chat;

    await message.reply(logoName + "\n  𝗡𝘂𝗺𝗯𝗲𝗿 𝗚𝘂𝗲𝘀𝘀𝗶𝗻𝗴 𝗚𝗮𝗺𝗲 𝗦𝘁𝗮𝗿𝘁𝗲𝗱\n\n*𝗦𝗲𝗹𝗲𝗰𝘁𝗲𝗱 𝗠𝗼𝗱𝗲 : _" + currentGame.mode + "_* \n\t▢ *_Well, I'm thinking of a number between " + (currentGame.mode === "Easy" ? "1 and 100" : currentGame.mode === "Medium" ? "1 and 1000" : "1 and 10000") + "._*\n\n*𝗬𝗼𝘂𝗿 𝗧𝗮𝘀𝗸 :*\n   _▢ You Task is to Guess That Number._\n   _▢ Checks How Sharp is Your Memory._\n   _▢ Lets see How Many Attempts You Take To Guess Number._");
  } catch (error) {
    await message.error(error + "\n\nCommand: guess", error);
  }
});

// Connect Four Game Implementation
const astro_patch_cfg = {};
const quotes = [
  "Connect Four: Where strategy meets fun!", 
  "Let the battle of four-in-a-row begin!", 
  "It's time to connect and conquer!", 
  "Can you outsmart your opponent in Connect Four?", 
  "Challenge your mind with Connect Four's strategic gameplay.", 
  "Connect Four: A game of wits and tactics.", 
  "Four in a row, that's the way to go!", 
  "Connect Four: Unleash your strategic genius.", 
  "Get ready to drop and connect your way to victory!", 
  "Connect Four: Where every move counts.", 
  "Prove your skills in the ultimate Connect Four showdown!", 
  "Connect Four: The classic game of strategy and anticipation.", 
  "Connect Four: Easy to learn, hard to master.", 
  "Who will be the first to connect their pieces and claim victory?", 
  "Prepare for a thrilling battle of strategy in Connect Four.", 
  "Get ready to connect and win!", 
  "Who will be the Connect Four champion?",