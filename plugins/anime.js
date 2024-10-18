const Config = require("../config");
let { sendGImages, smd } = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const { fetchJson, getBuffer } = require("../lib/");

async function sendAnime(_0x55a475, _0x509539, _0x4e419e, _0x835b9a = "") {
    try {
        if (_0x4e419e === "waifu" || _0x4e419e === "neko" || _0x4e419e === "megumin") {
            let _0x379467 = _0x835b9a.split("|")[0] || "";
            let _0x4c4376 = _0x835b9a.split("|")[1] || "1";
            let _0x117530 = _0x835b9a.split("|")[1] ? "" : ` *${_0x4e419e}*`;

            let _0x43e16d = _0x379467 === "megumin" ? `https://api.waifu.pics/sfw/${_0x4e419e}` : `https://api.waifu.pics/nsfw/${_0x4e419e}`;
            for (let _0x4e7334 = 0; _0x4e7334 < _0x4c4376; _0x4e7334++) {
                let _0x576105 = await (await fetch(_0x43e16d)).json();
                await _0x55a475.bot.sendMessage(_0x509539.chat, {
                    image: { url: _0x576105.url },
                    caption: _0x117530
                }, { quoted: _0x509539 });
            }
        } else if (_0x4e419e === "shinobu" || _0x4e419e === "sakuya") {
            let _0x385596 = _0x4e419e === "shinobu" ? "https://waifu.pics/api/sfw/shinobu" : "https://waifu.pics/api/sfw/sakuya";
            let _0x3e303e = await axios.get(_0x385596);
            await _0x55a475.bot.sendMessage(_0x509539.chat, {
                image: { url: _0x3e303e.data.url }
            }, { quoted: _0x509539 });
        } else if (_0x4e419e === "demon" || _0x4e419e === "loli") {
            let _0x3a01f7 = `https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/${_0x4e419e === "demon" ? "Demonslayer" : "Loli"}.json`;
            const _0x37dffc = await fetchJson(_0x3a01f7);
            const _0x51dced = _0x37dffc.result[Math.floor(Math.random() * _0x37dffc.result.length)].url;
            await _0x55a475.bot.sendMessage(_0x509539.chat, {
                video: { url: _0x51dced },
                caption: "*Here we go😊!!!!*"
            });
        } else if (_0x4e419e === "news") {
            let _0x509613 = await axios.get(`https://newsapi.org/v2/everything?q=${_0x835b9a}&domains=techcrunch.com,animenewsnetwork.com,myanimelist.net,comingsoon.net,crunchyroll.com&language=en&sortby=publishedAt&apikey=YOUR_API_KEY&pageSize=8`);
            let _0x7f6c91 = _0x509613.data.articles;
            _0x7f6c91.forEach(async (_0x3a0939) => {
                try {
                    await _0x55a475.bot.sendMessage(_0x509539.chat, {
                        image: { url: _0x3a0939.urlToImage },
                        caption: `*Title🔰:* ${_0x3a0939.title}\n*Author📌:* ${_0x3a0939.author}\n*Content🧩:* ${_0x3a0939.content}\n*Published At:* ${_0x3a0939.publishedAt}\n*Source♦️:* ${_0x3a0939.source.name}\n*URL:* ${_0x3a0939.url}\n\n${Config.caption}`
                    }, { quoted: _0x509539 });
                } catch (error) {
                    console.error(error);
                }
            });
        }
    } catch (error) {
        console.error("Error in sendAnime:", error);
        await _0x509539.reply(error.toString());
    }
}

smd({ pattern: "waifu", desc: "To get Waifu Random Pics", category: "anime", filename: __filename }, async (_0x3f90ca, _0x18c6e6) => {
    try {
        return await sendAnime(_0x3f90ca, _0x3f90ca, "waifu", _0x18c6e6);
    } catch {}
});
smd({ pattern: "neko", category: "anime", desc: "Sends a Neko Image in chat", filename: __filename }, async (_0x1cd273, _0xb77fec) => {
    try {
        return await sendAnime(_0x1cd273, _0x1cd273, "neko", _0xb77fec);
    } catch {}
});
smd({ pattern: "megumin", desc: "To get Megumin Random Pics", category: "anime", filename: __filename }, async (_0x5a7e62, _0x8aed59) => {
    try {
        return await sendAnime(_0x5a7e62, _0x5a7e62, "megumin", _0x8aed59);
    } catch {}
});
smd({ pattern: "loli", category: "anime", filename: __filename, desc: "Sends image of loli." }, async _0x11eae1 => {
    try {
        return await sendAnime(_0x11eae1, _0x11eae1, "loli");
    } catch {}
});
smd({ pattern: "foxgirl", category: "anime", desc: "Sends image of Fox Girl Anime.", filename: __filename }, async _0x545d0f => {
    try {
        return await sendAnime(_0x545d0f, _0x545d0f, "foxgirl");
    } catch {}
});
smd({ pattern: "demon", alias: ["ds"], desc: "To get Demon Slayer Random Videos", category: "anime", filename: __filename }, async _0x88a702 => {
    try {
        return await sendAnime(_0x88a702, _0x88a702, "demon");
    } catch {}
});
smd({ pattern: "naruto", desc: "To get Naruto Random Videos", category: "anime", filename: __filename }, async _0x5ded99 => {
    try {
        return await sendAnime(_0x5ded99, _0x5ded99, "naruto");
    } catch {}
});
smd({ pattern: "pokepic", category: "anime", filename: __filename, desc: "Sends image of pokemon." }, async (_0x583a8f, _0x26e084) => {
    try {
        return await sendGImages(_0x583a8f, _0x26e084 + "Pokemon Pics only HD ", "*---「 Poke Pic 」---*", _0x26e084);
    } catch {}
});
smd({ pattern: "animewall", category: "anime", desc: "Anime Wallpaper Random", filename: __filename }, async (_0x1be31e, _0x45a934) => {
    try {
        return await sendGImages(_0x1be31e, _0x45a934 + "anime wallpaper for desktop full hd", "*---「 Anime Wallpaper 」---*", _0x45a934);
    } catch {}
});
smd({ pattern: "pokemon", category: "anime", filename: __filename, desc: "Sends info of pokemon in current chat." }, async (_0x127028, _0x60d63) => {
    try {
        if (!_0x60d63) {
            return _0x127028.reply("*Uhh Please Give Me Poki Name/num*");
        }
        let { data: _0x4e5976 } = await axios.get("https://pokeapi.co/api/v2/pokemon/" + _0x60d63);
        if (!_0x4e5976.name) {
            return _0x127028.reply("❌ Could not found any pokemon with that name");
        }
        let _0x8d1690 = `*•Name: ${_0x4e5976.name}*\n*•Pokedex ID: ${_0x4e5976.id