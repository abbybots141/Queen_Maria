const {
    smd,
    tlang,
    prefix,
    Config,
    sleep,
    astroJson,
    smdBuffer
  } = require("../lib");
  
const axios = require("axios");

smd({
    cmdname: "stickersearch",
    alias: ["sticsearch"],
    category: "search",
    use: "[text]",
    info: "Searches Stickers"
}, async (message, searchText) => {
    try {
        const { generateSticker } = require("../lib");

        // Ensure the user provides a search term
        if (!searchText) {
            return message.reply("Sorry, you did not provide any search term!");
        }

        // Search stickers using Tenor's API
        const stickerResults = await axios.get(
            `https://g.tenor.com/v1/search?q=${encodeURIComponent(searchText)}&key=LIVDSRZULELA&limit=8`
        ).catch(() => {});

        // Check if we received valid data
        if (!stickerResults || !stickerResults.data || !stickerResults.data.results || !stickerResults.data.results[0]) {
            return message.reply("*Could not find any stickers!*");
        }

        // Limit the results to 5 stickers max
        let resultCount = stickerResults.data.results.length > 5 ? 5 : stickerResults.data.results.length;

        for (let i = 0; i < resultCount; i++) {
            // Get the mp4 URL for the sticker
            let stickerUrl = stickerResults.data.results[i]?.media[0]?.mp4?.url;

            // Fetch the sticker as a buffer
            let stickerBuffer = await smdBuffer(stickerUrl);

            // Define sticker metadata
            let stickerOptions = {
                pack: Config.packname,
                author: Config.author,
                type: "full", // Specify the sticker type
                quality: 1 // Sticker quality
            };

            // If we successfully fetched the sticker, generate and send it
            if (stickerBuffer) {
                generateSticker(message, stickerBuffer, stickerOptions);
            }
        }
    } catch (error) {
        // Handle errors and notify the user
        message.error(`${error}\n\nCommand: stickersearch`, error, "*Could not find stickers*");
    }
});