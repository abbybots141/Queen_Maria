const {
    smd,
    prefix,
    Config
} = require("../lib");

const done = "✳️";
const rwait = "✳️";
const lolkeysapi = "GataDios"; // API key for the graphics API

// Function to handle graphics commands
let GfxFunc = async (message, { Void, text, smd }, isSendResponse = true) => {
    try {
        text += ": ser"; // Modify text for processing
        const exampleText = `Example  : *${prefix + smd}* Asta`;
        const separatorInfo = `*Separate the text with ':' sign*\n*Example : ${prefix + smd} Asta : Bot*`;
        const mainText = text.split(":")[0]; // Text before the colon
        const command = smd.toLowerCase(); // Command type
        
        switch (command) {
            case "gfx1":
                if (!mainText) throw exampleText;
                const url1 = `https://api.caliph.biz.id/api/kaneki?nama=${encodeURIComponent(mainText)}&apikey=caliphkey`;
                await message.send(url1, { caption: Config.caption }, "img", message);
                break;
            case "gfx2":
                if (!text || !text.includes(":")) throw separatorInfo;
                const [name1, name2] = text.split(":").map(n => n.trim());
                const url2 = `https://api.caliph.biz.id/api/girlneko?nama=${encodeURIComponent(name1)}&nama2=${encodeURIComponent(name2)}&apikey=caliphkey`;
                await message.send(url2, { caption: Config.caption }, "img", message);
                break;
            case "gfx3":
                if (!mainText) throw exampleText;
                const url3 = `https://api.caliph.biz.id/api/rem?nama=${encodeURIComponent(mainText)}&apikey=caliphkey`;
                await message.send(url3, { caption: Config.caption }, "img", message);
                break;
            case "gfx4":
                if (!mainText) throw exampleText;
                const url4 = `https://api.caliph.biz.id/api/textpro/matrix?text=${encodeURIComponent(mainText)}&apikey=caliphkey`;
                await message.send(url4, { caption: Config.caption }, "img", message);
                break;
            case "gfx5":
                if (!mainText) throw exampleText;
                const url5 = `https://api.lolhuman.xyz/api/textprome/jokerlogo?apikey=${lolkeysapi}&text=${encodeURIComponent(mainText)}`;
                await message.send(url5, { caption: Config.caption }, "img", message);
                break;
            case "gfx6":
                if (!text || !text.includes(":")) throw separatorInfo;
                const [text1, text2] = text.split(":").map(t => t.trim());
                const url6 = `https://api.lolhuman.xyz/api/textprome2/lionlogo?apikey=${lolkeysapi}&text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;
                await message.send(url6, { caption: Config.caption }, "img", message);
                break;
            case "gfx7":
                if (!text || !text.includes(":")) throw separatorInfo;
                const [battleText1, battleText2] = text.split(":").map(b => b.trim());
                const url7 = `https://api.lolhuman.xyz/api/photooxy2/battlefield4?apikey=${lolkeysapi}&text1=${encodeURIComponent(battleText1)}&text2=${encodeURIComponent(battleText2)}`;
                await message.send(url7, { caption: Config.caption }, "img", message);
                break;
            case "gfx8":
                if (!mainText) throw exampleText;
                const url8 = `https://api.lolhuman.xyz/api/ephoto1/anonymhacker?apikey=${lolkeysapi}&text=${encodeURIComponent(mainText)}`;
                await message.send(url8, { caption: Config.caption }, "img", message);
                break;
            case "gfx9":
                if (!mainText) throw exampleText;
                const url9 = `https://api.lolhuman.xyz/api/ephoto1/avatarlolnew?apikey=${lolkeysapi}&text=${encodeURIComponent(mainText)}`;
                await message.send(url9, { caption: Config.caption }, "img", message);
                break;
            case "gfx10":
                if (!mainText) throw exampleText;
                const url10 = `https://api.lolhuman.xyz/api/ephoto1/avatardota?apikey=${lolkeysapi}&text=${encodeURIComponent(mainText)}`;
                await message.send(url10, { caption: Config.caption }, "img", message);
                break;
            case "gfx11":
                if (!text || !text.includes(":")) throw separatorInfo;
                const [codText1, codText2] = text.split(":").map(c => c.trim());
                const url11 = `https://api.lolhuman.xyz/api/ephoto2/codwarzone?apikey=${lolkeysapi}&text1=${encodeURIComponent(codText1)}&text2=${encodeURIComponent(codText2)}`;
                await message.send(url11, { caption: Config.caption }, "img", message);
                break;
            case "gfx12":
                if (!mainText) throw exampleText;
                const url12 = `https://api.lolhuman.xyz/api/ephoto1/freefire?apikey=${lolkeysapi}&text=${encodeURIComponent(mainText)}`;
                await message.send(url12, { caption: Config.caption }, "img", message);
                break;
            case "gfx13":
                if (!text || !text.includes(":")) throw separatorInfo;
                const [sadText1, sadText2] = text.split(":").map(s => s.trim());
                const url13 = `https://api.caliph.biz.id/api/sadboy?nama=${encodeURIComponent(sadText1)}&nama2=${encodeURIComponent(sadText2)}&apikey=caliphkey`;
                await message.send(url13, { caption: Config.caption }, "img", message);
                break;
            case "gfx14":
                if (!text) throw separatorInfo;
                const [lolText1, lolText2] = text.split(":").map(l => l.trim());
                const url14 = `https://api.caliph.biz.id/api/lolimaker?nama=${encodeURIComponent(lolText1)}&nama2=${encodeURIComponent(lolText2)}&apikey=caliphkey`;
                await message.send(url14, { caption: Config.caption }, "img", message);
                break;
            default:
                break;
        }
    } catch (error) {
        console.error(error);
        if (isSendResponse) {
            await message.send(`${error}`);
        }
    }
};

// List of graphics commands
let gfxCommands = [
    "gfx1", "gfx2", "gfx3", "gfx4", "gfx5", "gfx6", 
    "gfx7", "gfx8", "gfx9", "gfx10", "gfx11", 
    "gfx12", "gfx13", "gfx14"
];

// Register graphics commands
for (let command of gfxCommands) {
    smd({
        cmdname: command,
        infocmd: "Create a gfx logo for text",
        type: "gfx"
    }, async (message, text, { smd, Void }) => {
        try {
            await GfxFunc(message, {
                text,
                Void,
                smd
            });
        } catch (error) {
            console.error(error);
        }
    });
}

// Command to handle multiple gfx commands
smd({
    cmdname: "gfx",
    infocmd: "Create gfx logo for text",
    type: "gfx"
}, async (message, text, { smd, Void }) => {
    try {
        const instructions = `*Separate the text with _:_ sign!*\n*Example : ${prefix + smd} Asta _:_ Bot*`;
        if (!text) {
            const commandMenu = `┌───〈 *ɢꜰx ᴍᴇɴᴜ*  〉───◆\n│╭─────────────···▸\n┴│▸\n⬡│▸ ${gfxCommands.join(" \n⬡│▸ ")}\n┬│▸\n│╰────────────···▸▸\n└───────────────···▸\n\n\t *USE: ${prefix + smd} Asta:Md*\n_To get All Results with single Cmd!_\n`;
            return await message.sendUi(message.chat, { caption: commandMenu });
        }
        if (!text.includes(":")) {
            return await message.send(instructions);
        }
        for (let i = 0; i < gfxCommands.length; i++) {
            await GfxFunc(message, {
                text,
                Void,
                smd: "gfx" + (i + 1)
            }, false);
        }
    } catch (error) {
        message.error(`${error}\n\nCommand: ${smd}`, error, false);
    }
});