const {
  smd,
  fetchJson,
  astroJson,
  fancytext,
  yt,
  getBuffer,
  smdBuffer,
  prefix,
  Config,
} = require("../lib");
const { search, download } = require("aptoide-scraper");
const googleTTS = require("google-tts-api");
const ytdl = require("alya");
const yts = require("secktor-pack");
const fs = require("fs-extra");
const axios = require("axios");
const fetch = require("node-fetch");
const path = require("path");
var videotime = 2000;
const { cmd } = require("../lib/plugins");

// Function to handle audio download
smd({
  'pattern': "play",
  'react': "🎵",
  'alias': ["music"],
  'desc': "Downloads audio from YouTube.",
  'category': "downloader",
  'filename': __filename,
  'use': "<search text>"
}, async (messageContext, query) => {
  try {
    if (!query) {
      return await messageContext.reply("*_Provide a search query_*");
    }

    // Search for the video
    let searchResults = await yts(query);
    let videoInfo = searchResults.all[0];
    if (!videoInfo) {
      return await messageContext.reply("*_No results found_*");
    }

    // Send thumbnail and video details
    let thumbnailBuffer = await smdBuffer(videoInfo.thumbnail);
    await messageContext.bot.sendMessage(messageContext.jid, {
      'image': thumbnailBuffer,
      'caption': `
      *Title:* ${videoInfo.title}
      *Url:* ${videoInfo.url}
      *Description:* ${videoInfo.timestamp}
      *Views:* ${videoInfo.views}
      *Uploaded:* ${videoInfo.ago}
      *Author:* ${videoInfo.author.name}\n\n
      *Downloading audio...*`,
    });

    // API URL for downloading
    const downloadApiUrl = `https://widipe.com/download/ytdl?url=${encodeURIComponent(videoInfo.url)}`;
    
    let retries = 3;
    while (retries > 0) {
      try {
        const apiResponse = await axios.get(downloadApiUrl);
        const downloadData = apiResponse.data;

        if (downloadData.status && downloadData.result.mp3) {
          const audioUrl = downloadData.result.mp3;
          const audioResponse = await axios({
            url: audioUrl,
            method: "GET",
            responseType: "stream",
          });

          const audioPath = path.join(__dirname, `${videoInfo.title}.mp3`);
          const audioWriter = fs.createWriteStream(audioPath);
          audioResponse.data.pipe(audioWriter);

          await new Promise((resolve, reject) => {
            audioWriter.on("finish", resolve);
            audioWriter.on("error", reject);
          });

          console.log("Audio saved to " + audioPath);

          // Send the audio file
          await messageContext.bot.sendMessage(messageContext.jid, {
            'audio': {
              'url': audioPath,
            },
            'fileName': `${videoInfo.title}.mp3`,
            'mimetype': "audio/mpeg",
          });

          fs.unlinkSync(audioPath); // Delete the file after sending
          return;
        } else {
          console.log("Error: Could not download audio, API response:", downloadData);
          await messageContext.reply("*_Error: Could not download the audio. Please try again later!_*");
          return;
        }
      } catch (error) {
        console.error("Retry Error:", error);
        retries--;
        if (retries === 0) {
          await messageContext.reply("*_Error: Could not download the audio after multiple attempts. Please try again later!_*");
        }
      }
    }
  } catch (error) {
    console.error("Caught Error:", error);
    return messageContext.error(`${error}\n\ncommand: play`, error, "*_File not found!_*");
  }
});

// Define other functions like ytmp3, ytmp4, and ytsv here, with similar error handling and structure.
