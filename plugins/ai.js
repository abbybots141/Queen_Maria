const {
    aitts,
    smd,
    prefix,
    Config,
    parsedJid,
    sleep,
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

async function aiResponse(sender, model, message = "") {
    let responseText = "";
    try {
        if (model === "brainshop") {
            responseText = await (
                await axios.get(`http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[${sender.id}]&msg=[${message}]`)
            ).data.cnt;
        } else if (model === "gpt") {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Config.OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: message },
                    ],
                }),
            });
            const data = await response.json();
            responseText = data.choices[0]?.message?.content || "No response from AI.";
        }
        return responseText;
    } catch (error) {
        console.error("Error in aiResponse:", error);
        return "An error occurred while processing your request.";
    }
}

smd({
    pattern: "rmbg",
    alias: ["removebg"],
    desc: "Removes the background from an image.",
    category: "ai",
    filename: __filename,
    use: "<image URL>",
}, async (message, input) => {
    try {
        const url = input.trim();
        if (!url || !isValidUrl(url)) {
            return await message.send("*_Please provide a valid image URL._*");
        }

        const apiUrl = `https://api.remove.bg/v1.0/removebg`;
        const response = await axios.post(apiUrl, {
            image_url: url,
            size: "auto",
        }, {
            headers: {
                "X-Api-Key": Config.REMOVE_BG_KEY,
                "Accept": "application/json",
            },
            responseType: "arraybuffer",
        });

        const imageBuffer = Buffer.from(response.data, "binary");
        await message.bot.sendMessage(message.chat, { image: imageBuffer }, { quoted: message });
    } catch (error) {
        await message.error(error + "\n\nCommand: rmbg", error, "*Failed to remove background from the image.*");
    }
});

smd({
    pattern: "sd",
    desc: "Generates an image using Stable Diffusion AI.",
    category: "ai",
    filename: __filename,
    use: "<text>",
}, async (message, input) => {
    try {
        const text = input.trim();
        if (!text) {
            return await message.send("*_Please provide some text to generate an image._*");
        }

        const apiUrl = `https://api.example.com/stablediffusion?text=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl, {
            headers: {
                "accept": "application/json",
            },
        });

        const buffer = Buffer.from(response.data, "binary");
        await message.bot.sendMessage(message.chat, { image: buffer }, { quoted: message });
    } catch (error) {
        await message.error(error + "\n\nCommand: stablediffusion", error, "*Failed to use Stable Diffusion AI.*");
    }
});

smd({
    pattern: "bard",
    desc: "Generates a response from Bard AI.",
    category: "ai",
    filename: __filename,
    use: "<text>",
}, async (message, input) => {
    try {
        const text = input.trim();
        if (!text) {
            return await message.send("*_Please provide some text to generate a response._*");
        }

        const apiUrl = `https://api.example.com/bard?text=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl, {
            headers: {
                "accept": "application/json",
            },
        });
        const data = response.data;

        if (!data || !data.status) {
            return await message.reply("*Failed to generate a response from Bard AI.*");
        }

        return await message.send(`*Bard AI:*\n${data.result}`, { quoted: message });
    } catch (error) {
        await message.error(error + "\n\nCommand: bard", error, "*Failed to use Bard AI.*");
    }
});

smd({
    pattern: "chat",
    desc: "Chat with an AI",
    category: "ai",
    use: "<Your message>",
    filename: __filename,
}, async (message, input) => {
    try {
        if (!input) {
            return await message.reply(`*_Please provide a message_*`);
        }

        const reply = await aiResponse(message.sender, "gpt", input);
        await message.send(reply);
    } catch (error) {
        await message.error(error + "\n\nCommand: chat", error, "*An error occurred while processing your request.*");
    }
});

// Add similar smd calls for other AI integrations like "dalle", "gemini", "imagine", etc. following the structure above.