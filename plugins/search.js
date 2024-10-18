const moment = require('moment-timezone');
const { fetchJson, smd, tlang, send, shazam, getBuffer, prefix, Config, groupdb } = require("../lib");
let gis = require("async-g-i-s");
const axios = require('axios');
const fetch = require('node-fetch');

// Lyrics Command
smd(
  {
    pattern: "lyrics",
    desc: "Get the lyrics of a song.",
    category: "search",
    filename: __filename,
    use: "<song_name>",
  },
  async (m, songName) => {
    try {
      if (!songName) {
        return await m.send("*_Please provide a song name!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/search/lyrics?q=${encodeURIComponent(songName)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const { artist, lyrics, title } = data.result;

      const lyricsMessage = `
*Song:* ${title}
*Artist:* ${artist}

${lyrics}
`;

      await m.send(lyricsMessage);
    } catch (e) {
      await m.error(`${e}\n\ncommand: lyrics`, e);
    }
  }
);

// Bing Search Command
smd({
    pattern: "bing",
    alias: ["bingsearch"],
    desc: "Search on Bing.",
    category: "search",
    filename: __filename,
    use: "<search query>"
  }, async (msg, query) => {
    try {
      if (!query) {
        return await msg.reply("*Please provide a search query.*");
      }
  
      const apiUrl = `https://api-smd.onrender.com/api/bingsearch?query=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl).then(res => res.json());
  
      if (!response || !response.status) {
        return await msg.reply("*An error occurred while fetching the search results.*");
      }
  
      const results = response.result;
      let resultText = `*Bing Search Results for "${query}"*\n\n`;
  
      for (const result of results) {
        resultText += `*Title:* ${result.title}\n*Description:* ${result.description}\n*URL:* ${result.url}\n\n`;
      }
  
      await msg.reply(resultText);
    } catch (err) {
      await msg.error(err + "\n\ncommand: bing", err, "*An error occurred while searching on Bing.*");
    }
  });

// Zip Code Command
smd(
  {
    pattern: "zip",
    alias: ["zipcode"],
    desc: "Provides information about a US zip code.",
    category: "tools",
    use: "zip [zip_code]",
    examples: ["zip 90001", "zip 33162"]
  },
  async (message, input) => {
    const zipCode = input;
  
    if (!zipCode) {
      return message.reply("Please provide a zip code.");
    }
  
    try {
      const response = await axios.get(`https://api.zippopotam.us/us/${zipCode}`);
      const { postCode, country, countryAbbreviation, places } = response.data;
  
      let output = `
*Zip Code:* ${postCode}
*Country:* ${country} (${countryAbbreviation})
*Places:*
`;
  
      places.forEach((place, index) => {
        output += `\n${index + 1}. ${place["place name"]}, ${place.state} (${place.latitude}, ${place.longitude})`;
      });
  
      await message.send(output);
    } catch (error) {
      await message.error(
        error + "\n\nCommand: zip",
        error,
        "Failed to retrieve zip code information."
      );
    }
  }
);

// Shazam Command
smd({
           pattern: "shazam",
           category: "search",
           desc: "Finds info about song",
           filename: __filename,
       },
       async(message) => {
         try{
             
            let mime = message.reply_message ? message.reply_message.mtype : ''
            if (!/audio/.test(mime)) return message.reply(`Reply audio ${prefix}find`);
            let buff = await message.reply_message.download();
           const { shazam } = require(lib_dir)
            let data = await shazam(buff);
            if (!data || !data.status) return message.send(data);
            let h =`*TITLE: _${data.title}_* \n*ARTIST: _${data.artists}_*\n *ALBUM:* _${data.album}_ `
           await message.bot.sendUi(message.jid, { caption: h,  },{quoted : message} , "text",'true' );
       }catch(e){return await message.error(`${e}\n\n command: find`,e,`*_Didn't get any results, Sorry!_*`) }
});

// Github User Info Command
smd({
   pattern: "github",
   category: "search",
   desc: "Fetch info about a GitHub user.",
   filename: __filename,
},
async(message, match) => {
 try{

   message.react("🔍")
         if (!match) return message.reply(`Give me a user name like ${prefix}github Astropeda`)

         const { data } = await axios(`https://api.github.com/users/${match}`)
   if(!data) return await message.send(`*_Didn't get any results, Provide valid user name!_*`)
   let gitdata =  data
         message.sendMessage(message.jid, {
           image: { url: gitdata.avatar_url }, caption:`*[ GITHUB USER INFO ]*

🚩 Id : ${gitdata.id}
🔖 Nickname : ${gitdata.name}
🔖 Username : ${gitdata.login}
✨ Bio : ${gitdata.bio}
🏢 Company : ${gitdata.company}
📍 Location : ${gitdata.location}
📧 Email : ${gitdata.email}
📰 Blog : ${gitdata.blog}
🔓 Public Repo : ${gitdata.repos_url}
🔐 Public Gists : ${gitdata.gists_url}
💕 Followers : ${gitdata.followers}
👉 Following : ${gitdata.following}
🔄 Updated At : ${gitdata.updated_at}
🧩 Created At : ${gitdata.created_at}`
         }, { quoted: message })

          }catch(e){return await message.error(`${e}\n\n command: github`,e,`*_Didn't get any results, Sorry!_*`) }
});