  const {
    updateProfilePicture,
    parsedJid
} = require("../lib");
const {
    sck,
    smd,
    send,
    Config,
    tlang,
    sleep,
    getAdmin,
    prefix
} = require("../lib");
const astro_patch = require("../lib/plugins");
const {
    cmd
} = astro_patch;
const grouppattern = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22}/g;

smd({
    cmdname: "join",
    info: "joins group by link",
    type: "whatsapp",
    fromMe: true,
    filename: __filename,
    use: "<group link.>"
}, async (_0x466dd8, _0x5b1338) => {
    try {
        if (_0x466dd8.reply_message && _0x466dd8.reply_message.groupInvite) {
            var _0x29e5fc = await _0x466dd8.bot.groupAcceptInviteV4(_0x466dd8.chat, _0x466dd8.reply_message.msg);
            if (_0x29e5fc && _0x29e5fc.includes("joined to:")) {
                return await send(_0x466dd8, "*_Joined_*", {}, "", _0x466dd8);
            }
        }
        let _0x208739 = _0x5b1338 ? _0x5b1338 : _0x466dd8.reply_text;
        const _0x47ed60 = _0x208739.match(grouppattern);
        if (!_0x47ed60) {
            return await _0x466dd8.reply("*_Uhh Please, provide group link_*");
        }
        let _0x4263be = _0x47ed60[0].split("https://chat.whatsapp.com/")[1].trim();
        await _0x466dd8.bot.groupAcceptInvite(_0x4263be).then(_0x7f3222 => send(_0x466dd8, "*_Joined_*", {}, "", _0x466dd8)).catch(_0x1d6aea => _0x466dd8.send("*_Can't Join, Group Id not found!!_*"));
    } catch (_0x5d3484) {
        await _0x466dd8.error(_0x5d3484 + "\n\ncommand: join", _0x5d3484, "*_Can't Join, Group Id not found, Sorry!!_*");
    }
});

smd({
    cmdname: "newgc",
    info: "Create New Group",
    type: "whatsapp",
    filename: __filename,
    use: "<group link.>"
}, async (_0x1d2f1f, _0x3c558e, {
    smd: _0x2e7a79,
    cmdName: _0x49994a
}) => {
    try {
        if (!_0x1d2f1f.isCreator) {
            return _0x1d2f1f.reply(tlang().owner);
        }
        if (!_0x3c558e) {
            return await _0x1d2f1f.reply("*_provide Name to Create new Group!!!_*\n*_Ex: " + (prefix + _0x2e7a79) + " My Name Group @user1,2,3.._*");
        }
        let _0x379d99 = _0x3c558e;
        if (_0x379d99.toLowerCase() === "info") {
            return await _0x1d2f1f.send(("\n  *Its a command to create new Gc*\n  \t```Ex: " + (prefix + cmd) + " My new Group```\n  \n*You also add peoples in newGc*\n  \t```just reply or mention Users```\n  ").trim());
        }
        let _0x5a5c26 = [_0x1d2f1f.sender];
        if (_0x1d2f1f.quoted) {
            _0x5a5c26.push(_0x1d2f1f.quoted.sender);
        }
        if (_0x1d2f1f.mentionedJid && _0x1d2f1f.mentionedJid[0]) {
            _0x5a5c26.push(..._0x1d2f1f.mentionedJid);
            try {
                mentionJids.forEach(_0x3e3852 => {
                    var _0x30af68 = _0x3e3852.split("@")[0].trim();
                    _0x379d99 = _0x379d99.replace(new RegExp("@" + _0x30af68, "g"), "");
                });
            } catch {}
        }
        const _0x37b490 = _0x379d99.substring(0, 60);
        const _0x417018 = await Suhail.bot.groupCreate(_0x37b490, [..._0x5a5c26]);
        if (_0x417018) {
            let _0x2c6495 = await _0x1d2f1f.bot.sendMessage(_0x417018.id, {
                text: "*_Hey Master, Welcome to new Group_*\n" + Config.caption
            });
            try {
                var _0x3a49e9 = await Suhail.bot.groupInviteCode(_0x417018.id);
            } catch {
                var _0x3a49e9 = false;
            }
            var _0x2608ab = "https://chat.whatsapp.com/";
            var _0x2fe2c7 = "" + _0x2608ab + _0x3a49e9;
            var _0x539d8f = {
                externalAdReply: {
                    title: "Qᴜᴇᴇɴ_ᴍᴀʀɪᴀ",
                    body: "" + _0x37b490,
                    renderLargerThumbnail: true,
                    thumbnail: log0,
                    mediaType: 1,
                    mediaUrl: _0x2fe2c7,
                    sourceUrl: _0x2fe2c7
                }
            };
            return await send(_0x1d2f1f, ("*_Hurray, New group created!!!_*\n" + (_0x3a49e9 ? "*_" + _0x2fe2c7 + "_*" : "")).trim(), {
                contextInfo: _0x539d8f
            }, "", _0x2c6495);
        } else {
            await _0x1d2f1f.send("*_Can't create new group, Sorry!!_*");
        }
    } catch (_0x33d6f3) {
        await _0x1d2f1f.error(_0x33d6f3 + "\n\ncommand: " + _0x49994a, _0x33d6f3, "*_Can't create new group, Sorry!!_*");
    }
});

// Further group command functions go here...