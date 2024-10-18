const events = require(lib_dir + "/plugins.js");
let {
    Config,
    TelegraPh,
    sleep,
    getBuffer,
    parsedJid,
    fancy,
    tiny,
    botpic,
    tlang
} = require(lib_dir);

if (!Array.isArray(global.renters)) {
    global.renters = [];
}

if (!Array.isArray(global.rentdisable)) {
    global.rentdisable = [];
}

let disabledperma = ["sharebot", "sharelist", "stoprent", "disableshare", "enableshare", "setsudo", "delsudo", "newvar", "delvar", "setvar", "update", "updatenow", "restart", "reboot"];

const {
    userdb,
    smd,
    fetchJson,
    sendWelcome,
    bot_,
    getTime
} = require(lib_dir);

const util = require("util");
const fs = require("fs-extra");
const axios = require("axios");
const fetch = require("node-fetch");
const exec = util.promisify(require("child_process").exec);

let db = {};
db.get = async () => {
    const _0x39ecdb = "./asta.json";
    try {
        return JSON.parse(fs.readFileSync(_0x39ecdb, "utf-8"));
    } catch (_0x12c187) {
        return {};
    }
};

db.update = async _0x19934a => {
    try {
        const _0x370f4c = "./asta.json";
        const _0x50546d = await db.get();
        const _0x456e8c = {
            ..._0x50546d,
            ..._0x19934a
        };
        fs.writeFileSync(_0x370f4c, JSON.stringify(_0x456e8c, null, 2), "utf-8");
        return _0x456e8c;
    } catch (_0x4e2ecd) {
        console.error("Error updating data:", _0x4e2ecd);
    }
};

try {
    const {
        mention,
        filter
    } = require(lib_dir + "/asta.js");

    smd({
        cmdname: "mention",
        fromMe: true,
        category: "chats",
        desc: "set auto reply for mention",
        use: "[ url type/audio ]",
        usage: "read  'mention wiki' to get all information of mention!",
        filename: __filename
    }, async (_0x184ecd, _0x431080) => {
        mention.cmd(_0x184ecd, _0x431080);
    });

    smd({
        on: "main",
        fromMe: false
    }, async (_0x138199, _0x359c14 = "") => {
        mention.check(_0x138199, _0x359c14);
    });

    smd({
        pattern: "filter",
        category: "chats",
        desc: "set auto reply filter messages",
        use: "[ asta : how can i help you! ]",
        usage: "set filter message to specific text, so that bot replied user from chat by giving text!",
        fromMe: true,
        filename: __filename
    }, async (_0x126a17, _0x3ebefa) => {
        filter.set(_0x126a17, _0x3ebefa);
    });

    smd({
        pattern: "fstop",
        category: "chats",
        desc: "stop auto reply from a word",
        use: "[ asta : how can i help you! ]",
        usage: "stop filter message to specific word, That already set in filter text!",
        fromMe: true,
        filename: __filename
    }, async (_0x2fd083, _0xa71664) => {
        filter.stop(_0x2fd083, _0xa71664);
    });

    smd({
        pattern: "flist",
        category: "chats",
        desc: "get list of auto reply word",
        use: "[ asta : how can i help you! ]",
        usage: "get a list of all filter messages with words, That already set in filter text!",
        fromMe: true,
        filename: __filename
    }, async _0x55f8e8 => {
        filter.list(_0x55f8e8);
    });

    smd({
        on: "text"
    }, async (_0x593a64, _0x40e88c) => {
        try {
            filter.check(_0x593a64, _0x40e88c);
        } catch (_0x4839f8) {}
    });
} catch (_0x2568c0) {
    if (!global.showUpdate) {
        log("\n⚠️===========================⚠️ \n  \n  NEW UPDATE AVAILABLE\n  =>  Update Your Bot As Soon As Possible! 🚫\n \n Regards: Queen Maria \n⚠️============================⚠️");
        global.showUpdate = true;
    }
}

let afk = false;

smd({
    pattern: "afk",
    desc: "away from keyboard",
    category: "chats"
}, async (_0x5981d0, _0x5be11f) => {
    try {
        let _0x7c3280 = await db.get();
        afk = _0x7c3280.afk || {
            users: {}
        };
        if (!_0x5be11f) {
            return _0x5981d0.reply(("\n  *Example: My owner is AFK*\n  *Last seen before #lastseen*\n  *Also update status: " + prefix + "afk @time, @date, @line(pickupline), @quote(random quote), @user*\n  \n*To turn off use " + prefix + "unAfk.*\n  ").trim());
        }
        if (_0x5be11f === "get" && afk[_0x5981d0.sender]) {
            return _0x5981d0.reply(afk[_0x5981d0.sender].reason);
        }
        afk[_0x5981d0.sender] = {
            reason: _0x5be11f,
            lastseen: new Date()
        };
        _0x7c3280.afk = {
            ...afk
        };
        _0x7c3280 = await db.update(_0x7c3280);
        if (_0x7c3280) {
            let _0x3f1e86 = ("@" + _0x5981d0.sender.split("@")[0] + " currently AFK.\nReason: " + afk[_0x5981d0.sender].reason.replace("@lastseen", "\nlastseen : " + getTimeDifference(afk[_0x5981d0.sender].lastseen) + "\n")).trim();
            await sendWelcome(_0x5981d0, _0x3f1e86, _0x5981d0, _0x5981d0.sender);
        } else {
            _0x5981d0.reply("*Request Denied!*");
        }
    } catch (_0x14591d) {
        _0x5981d0.error(_0x14591d + "\n\nCommand: AFKs", _0x14591d);
    }
});

smd({
    pattern: "unafk",
    desc: "turn off away from keyboard",
    category: "chats"
}, async _0x19b40d => {
    try {
        let _0x5f4dc1 = await db.get();
        afk = _0x5f4dc1.afk || {};
        if (!afk[_0x19b40d.sender]) {
            return _0x19b40d.reply("*You are not AFK.*");
        }
        delete afk[_0x19b40d.sender];
        _0x5f4dc1.afk = {
            ...afk
        };
        _0x5f4dc1 = await db.update(_0x5f4dc1);
        if (_0x5f4dc1) {
            await _0x19b40d.reply("Finally, You are back!");
        } else {
            _0x19b40d.reply("*Request Denied!*");
        }
    } catch (_0x256eef) {
        _0x19b40d.error(_0x256eef + "\n\nCommand: UnAFK", _0x256eef, "ERROR");
    }
});

let txt = {
    "2": "*Hey I already informed you!*\n",
    "3": "*Stop spamming!*"
};

function getTimeDifference(_0x47a53) {
    const _0x2e748e = new Date(_0x47a53);
    const _0x54f11c = new Date();
    const _0x2c55d7 = _0x54f11c - _0x2e748e;
    const _0x353908 = Math.floor(_0x2c55d7 / 86400000);
    const _0x349796 = Math.floor(_0x2c55d7 % 86400000 / 3600000);
    const _0x9c628b