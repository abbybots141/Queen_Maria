const {
  smd,
  fetchJson,
  prefix,
  Config,
} = require("../lib");
const axios = require('axios'); // Ensure axios is required
const fs = require('fs'); // Required for saving temporary video files
const path = require('path'); // To manage file paths

smd({
  pattern: "ku", // Command name
  alias: ["tiktokdl"],
  react: "🎥",
  desc: "Downloads video from a TikTok link.",
  category: "downloader",
  filename: __filename,
  use: "<TikTok video URL>"
}, async (message, args) => {
  try {
    if (!args) {
      return await message.reply("*_Provide a TikTok video URL_*");
    }

    const videoUrl = args; // TikTok video URL

    // Call the TikTok downloader API
    const apiUrl = `https://api.giftedtechnexus.co.ke/api/download/tiktok?url=${videoUrl}&apikey=gifteddevskk`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    console.log("API Response:", data); // Log the API response for debugging

    if (data.success && data.url) {
      const videoDownloadUrl = data.url; // Extract the video URL from the 'url' response

      // Download the video file
      const videoResponse = await axios({
        url: videoDownloadUrl,
        method: 'GET',
        responseType: 'stream'
      });

      // Create a temporary file path for the video
      const tempFilePath = path.join(__dirname, `${Date.now()}.mp4`);
      const writer = fs.createWriteStream(tempFilePath);

      // Pipe the video stream to the file
      videoResponse.data.pipe(writer);

      // Handle completion of file writing
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      console.log(`Video saved to ${tempFilePath}`);

      // Send the video file to the user
      await message.bot.sendMessage(message.jid, {
        video: { url: tempFilePath },
        caption: 'Here is your downloaded TikTok video',
        fileName: `${Date.now()}.mp4`,
        mimetype: "video/mp4"
      }, { quoted: message });

      // Optionally, delete the temporary file after sending
      fs.unlinkSync(tempFilePath);
      
    } else {
      console.log("Error: Could not retrieve the video download URL, API response:", data);
      await message.reply("*_Error: Could not retrieve the video download URL. Please try again later!_*");
    }
  } catch (error) {
    console.error("Caught Error:", error); // Log any caught errors
    return message.error(error + "\n\ncommand: ku", error, "*_Error occurred while processing the command!!_*");
  }
});