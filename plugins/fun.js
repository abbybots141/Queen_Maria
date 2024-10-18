const axios = require("axios");
const { smd } = require("../lib");
const fetch = require("node-fetch");

async function randomeFunfacts(type) {
  try {
    if (type === "question") {
      return await random_question(); // Ensure this function is defined
    } else if (type === "truth") {
      return await truth(); // Ensure this function is defined
    } else if (type === "dare") {
      return await dare(); // Ensure this function is defined
    } else if (type === "joke") {
      const jokeData = await (await fetch("https://official-joke-api.appspot.com/random_joke")).json();
      return `*Joke:* ${jokeData.setup}\n*Punchline:* ${jokeData.punchline}`;
    } else if (type === "joke2") {
      const jokeData = await (await fetch("https://v2.jokeapi.dev/joke/Any?type=single")).json();
      return `*Joke:* ${jokeData.joke}`;
    } else if (type === "fact") {
      const { data } = await axios.get("https://nekos.life/api/v2/fact");
      return `*Fact:* ${data.fact}`;
    } else if (type === "quotes") {
      const { data } = await axios.get("https://favqs.com/api/qotd");
      return `╔════◇\n║ *🎗️Content:* ${data.quote.body}\n║ *👤Author:* ${data.quote.author}\n║\n╚════════════╝`;
    }
  } catch (error) {
    console.error("Error in randomeFunfacts:", error);
    throw new Error("Failed to fetch random fun facts.");
  }
}

// Command to get a random pickup line
smd(
  {
    pattern: "rizz",
    desc: "Get a random pickup line.",
    category: "fun",
    filename: __filename,
  },
  async (m) => {
    try {
      const apiUrl = "https://api.popcat.xyz/pickuplines";
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      const data = await response.json();
      const message = `${data.pickupline}`;
      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: rizz`, e);
    }
  }
);

// Command to get a random question
smd(
  {
    cmdname: "question",
    info: "Random Question.",
    type: "fun",
    filename: __filename
  },
  async (msg, text, { smd }) => {
    try {
      await msg.reply(await randomeFunfacts("question"));
    } catch (error) {
      await msg.error(error + "\n\ncommand: question", error);
    }
  }
);

// Command to get a random truth
smd(
  {
    cmdname: "truth",
    info: "Truth game.",
    type: "fun",
    filename: __filename
  },
  async (msg, text, { smd }) => {
    try {
      await msg.reply(await randomeFunfacts("truth"));
    } catch (error) {
      await msg.error(error + "\n\ncommand: truth", error);
    }
  }
);

// Command to get a random dare
smd(
  {
    cmdname: "dare",
    info: "Dare game.",
    type: "fun",
    filename: __filename
  },
  async (msg, text, { smd }) => {
    try {
      await msg.reply(await randomeFunfacts("dare"));
    } catch (error) {
      await msg.error(error + "\n\ncommand: dare", error);
    }
  }
);

// Command to get a random joke
smd(
  {
    cmdname: "joke",
    info: "Sends a random joke.",
    type: "fun",
    filename: __filename
  },
  async (msg, text, { smd }) => {
    try {
      await msg.reply(await randomeFunfacts("joke"));
    } catch (error) {
      await msg.error(error + "\n\ncommand: joke", error);
    }
  }
);

// Command to get a second random joke
smd(
  {
    cmdname: "joke2",
    info: "Sends another random joke.",
    type: "fun",
    filename: __filename
  },
  async (msg, text, { smd }) => {
    try {
      await msg.reply(await randomeFunfacts("joke2"));
    } catch (error) {
      await msg.error(error + "\n\ncommand: joke2", error);
    }
  }
);

// Command to get a random fact
smd(
  {
    cmdname: "fact",
    info: "Sends a random fact.",
    type: "fun",
    filename: __filename
  },
  async (msg, text, { smd }) => {
    try {
      await msg.reply(await randomeFunfacts("fact"));
    } catch (error) {
      await msg.error(error + "\n\ncommand: fact", error);
    }
  }
);

// Command to get a random quote
smd(
  {
    cmdname: "quotes",
    info: "Sends a random quote.",
    type: "fun",
    filename: __filename
  },
  async (msg, text, { smd }) => {
    try {
      await msg.reply(await randomeFunfacts("quotes"));
    } catch (error) {
      await msg.error(error + "\n\ncommand: quotes", error);
    }
  }
);

// Command to define a word using Urban Dictionary
smd(
  {
    cmdname: "define",
    info: "Urban dictionary definition.",
    type: "fun",
    filename: __filename
  },
  async (msg, text) => {
    try {
      const searchTerm = text || msg.reply_text;
      if (!searchTerm) {
        return await msg.send(`*_Hey ${msg.senderName}, please provide a text!_*`);
      }
      const { data } = await axios.get(`http://api.urbandictionary.com/v0/define?term=${searchTerm}`);
      const definition = data.list[0];
      const replyMessage = definition 
        ? `*Word:* \`\`\`${searchTerm}\`\`\`\n*Definition:* \`\`\`${definition.definition.replace(//g, "").replace(//g, "")}\`\`\`\n*Example:* \`\`\`${definition.example.replace(//g, "").replace(//g, "")}\`\`\``
        : `*_No results found for given word_*`;
      return await msg.reply(replyMessage);
    } catch (error) {
      await msg.error(error + "\n\ncommand: define", error);
    }
  }
);

// Command to get fake information
smd(
  {
    pattern: 'fakeinfo',
    fromMe: false,
    desc: 'Get fake information',
    type: 'fun'
  },
  async (message) => {
    try {
      const response = await axios.get('https://api.maher-zubair.tech/misc/fakeinfo');
      const data = response.data.result.results[0];

      const info = `
👤 *Name:* ${data.name.title} ${data.name.first} ${data.name.last}
📅 *Date of Birth:* ${new Date(data.dob.date).toLocaleDateString()}
📞 *Phone:* ${data.phone}
📧 *Email:* ${data.email}
🌐 *Location:* ${data.location.city}, ${data.location.state}, ${data.location.country}
🔑 *Username:* ${data.login.username}
📷 *Profile Picture:* [View Image](${data.picture.large})
      `;

      await message.send(info, { quoted: message.data });
    } catch (error) {
      console.error('Error fetching fake information:', error);
      await message.send('_Failed to fetch fake information._', { quoted: message.data });
    }
  }
);

// Command to get an insult
smd(
  {
    pattern: 'insult',
    fromMe: false,
    desc: 'Get insulted',
    type: 'fun'
  },
  async (message) => {
    try {
      const response = await axios.get('https://api.maher-zubair.tech/misc/insult');
      const insult = response.data.result;

      await message.send(insult, { quoted: message.data });
    } catch (error) {
      console.error('Error fetching insult:', error);
      await message.send('_Failed to fetch insult._', { quoted: message.data });
    }
  }
);

// Command to get a nice message
smd(
  {
    pattern: 'lines',
    fromMe: false,
    desc: 'Get a nice message',
    type: 'fun'
  },
  async (message) => {
    try {
      const response = await axios.get('https://api.maher-zubair.tech/misc/lines');
      const messageText = response.data.result;

      await message.send(messageText, { quoted: message.data });
    } catch (error) {
      console.error('Error fetching message:', error);
      await message.send('_Failed to fetch message._', { quoted: message.data });
    }
  }
);