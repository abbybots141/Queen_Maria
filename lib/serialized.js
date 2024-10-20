const { proto, getContentType } = require("@whiskeysockets/baileys");
const fs = require("fs-extra");
const { unlink } = require("fs").promises;
const axios = require("axios");
const { writeExifWebp } = require("./exif");
const moment = require("moment-timezone");
const { sizeFormatter } = require("human-readable");
const Config = require("../config");
const util = require("util");
const child_process = require("child_process");
const unixTimestampSeconds = (_0xcd7700 = new Date()) =>
  Math.floor(_0xcd7700.getTime() / 1000);
exports.unixTimestampSeconds = unixTimestampSeconds;
const sleep = (_0x23215f) => {
  return new Promise((_0xf9910) => {
    setTimeout(_0xf9910, _0x23215f);
  });
};
exports.sleep = sleep;
exports.delay = sleep;
const isUrl = (_0x81c97) => {
  return _0x81c97.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
      "gi"
    )
  );
};
exports.isUrl = isUrl;
exports.generateMessageTag = (_0x22b680) => {
  let _0xed3193 = (0, exports.unixTimestampSeconds)().toString();
  if (_0x22b680) {
    _0xed3193 += ".--" + _0x22b680;
  }
  return _0xed3193;
};
exports.processTime = (_0x3b7fc8, _0x5b8a34) => {
  return moment.duration(_0x5b8a34 - moment(_0x3b7fc8 * 1000)).asSeconds();
};
const getBuffer = async (_0x1eca9a, _0x414197 = {}, _0x5e5fe0 = "get") => {
  try {
    if (Buffer.isBuffer(_0x1eca9a)) {
      return _0x1eca9a;
    }
    if (/http/gi.test(_0x1eca9a)) {
      const _0xcad41a = await axios({
        method: _0x5e5fe0,
        url: _0x1eca9a,
        headers: {
          DNT: 1,
          "Upgrade-Insecure-Request": 1,
        },
        ..._0x414197,
        responseType: "arraybuffer",
      });
      return _0xcad41a.data;
    } else if (fs.existsSync(_0x1eca9a)) {
      return fs.readFileSync(_0x1eca9a);
    } else {
      return _0x1eca9a;
    }
  } catch (_0x2c4db9) {
    console.log("error while getting data in buffer : ", _0x2c4db9);
    return false;
  }
};
exports.getBuffer = getBuffer;
exports.smdBuffer = getBuffer;
const fetchJson = async (_0x1d0a81, _0x57dbee = {}, _0x391929 = "GET") => {
  try {
    const _0x56a01e = await axios({
      method: _0x391929,
      url: _0x1d0a81,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
      },
      ..._0x57dbee,
    });
    return _0x56a01e.data;
  } catch (_0x14d5ee) {
    console.log("error while fething data in json \n ", _0x14d5ee);
    return false;
  }
};
exports.fetchJson = fetchJson;
exports.astroJson = fetchJson;
exports.runtime = function (
  _0x1903bb,
  _0x560554 = " d",
  _0x58adbf = " h",
  _0x9fda8c = " m",
  _0x1c044d = " s"
) {
  _0x1903bb = Number(_0x1903bb);
  var _0x351d55 = Math.floor(_0x1903bb / 86400);
  var _0x1079fc = Math.floor((_0x1903bb % 86400) / 3600);
  var _0x5d357c = Math.floor((_0x1903bb % 3600) / 60);
  var _0x1a5121 = Math.floor(_0x1903bb % 60);
  var _0x4f40b5 = _0x351d55 > 0 ? _0x351d55 + _0x560554 + ", " : "";
  var _0x1a1127 = _0x1079fc > 0 ? _0x1079fc + _0x58adbf + ", " : "";
  var _0x47c89b = _0x5d357c > 0 ? _0x5d357c + _0x9fda8c + ", " : "";
  var _0x27a1ed = _0x1a5121 > 0 ? _0x1a5121 + _0x1c044d : "";
  return _0x4f40b5 + _0x1a1127 + _0x47c89b + _0x27a1ed;
};
exports.clockString = function (_0x395128) {
  let _0x4dbcae = isNaN(_0x395128)
    ? "--"
    : Math.floor((_0x395128 % 86400) / 3600);
  let _0x235ca0 = isNaN(_0x395128) ? "--" : Math.floor((_0x395128 % 3600) / 60);
  let _0x509bde = isNaN(_0x395128) ? "--" : Math.floor(_0x395128 % 60);
  return [_0x4dbcae, _0x235ca0, _0x509bde]
    .map((_0xc7af97) => _0xc7af97.toString().padStart(2, 0))
    .join(":");
};
const getTime = (_0x232921, _0x3d6d6e) => {
  const _0x31b3f7 = global.timezone || "Africa/Lagos";
  if (_0x3d6d6e) {
    return moment.tz(_0x3d6d6e, _0x31b3f7).format(_0x232921);
  } else {
    return moment.tz(_0x31b3f7).format(_0x232921);
  }
};
exports.getTime = getTime;
exports.formatDate = (_0x12ee86, _0x8dbc96 = "id") => {
  let _0x2d6ebe = new Date(_0x12ee86);
  return _0x2d6ebe.toLocaleDateString(_0x8dbc96, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};
exports.formatp = sizeFormatter({
  std: "JEDEC",
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (_0x2274f0, _0x45cf2c) => _0x2274f0 + " " + _0x45cf2c + "B",
});
exports.jsonformat = (_0x5e372f) => {
  return JSON.stringify(_0x5e372f, null, 2);
};
const format = (..._0x2aff47) => {
  return util.format(..._0x2aff47);
};
exports.format = format;
exports.logic = (_0x1e3fae, _0x8a7681, _0x39e1cc) => {
  if (_0x8a7681.length !== _0x39e1cc.length) {
    throw new Error("Input and Output must have same length");
  }
  for (let _0x31c9c5 in _0x8a7681) {
    if (util.isDeepStrictEqual(_0x1e3fae, _0x8a7681[_0x31c9c5])) {
      return _0x39e1cc[_0x31c9c5];
    }
  }
  return null;
};
exports.generateProfilePicture = async (_0x125cf7) => {
  const _0x482567 = await jimp_1.read(_0x125cf7);
  const _0x15a0e3 = _0x482567.getWidth();
  const _0x2f985f = _0x482567.getHeight();
  const _0xca07f2 = _0x482567.crop(0, 0, _0x15a0e3, _0x2f985f);
  return {
    img: await _0xca07f2.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
    preview: await _0xca07f2
      .scaleToFit(720, 720)
      .getBufferAsync(jimp_1.MIME_JPEG),
  };
};
exports.bytesToSize = (_0x3affb2, _0x172f8f = 2) => {
  if (_0x3affb2 === 0) {
    return "0 Bytes";
  }
  const _0x409316 = 1024;
  const _0xe00d6c = _0x172f8f < 0 ? 0 : _0x172f8f;
  const _0x4e5bdb = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const _0xda3562 = Math.floor(Math.log(_0x3affb2) / Math.log(_0x409316));
  return (
    parseFloat(
      (_0x3affb2 / Math.pow(_0x409316, _0xda3562)).toFixed(_0xe00d6c)
    ) +
    " " +
    _0x4e5bdb[_0xda3562]
  );
};
exports.getSizeMedia = (_0x2f4d96) => {
  try {
    if (!_0x2f4d96) {
      return 0;
    }
    if (
      typeof _0x2f4d96 == "string" &&
      (_0x2f4d96.startsWith("http") || _0x2f4d96.startsWith("Http"))
    ) {
      try {
        let _0x1ba0b2 = axios.get(_0x2f4d96);
        let _0x2e23e7 = parseInt(_0x1ba0b2.headers["content-length"]);
        let _0x485312 = exports.bytesToSize(_0x2e23e7, 3);
        if (!isNaN(_0x2e23e7)) {
          return _0x485312;
        }
      } catch (_0x531be5) {
        console.log(_0x531be5);
        return 0;
      }
    } else if (Buffer.isBuffer(_0x2f4d96)) {
      let _0x5cff7 = Buffer.byteLength(_0x2f4d96);
      let _0x184c74 = exports.bytesToSize(_0x5cff7, 3);
      if (!isNaN(_0x5cff7)) {
        return _0x184c74;
      } else {
        return _0x5cff7;
      }
    } else {
      throw "Erorr: coudln't fetch size of file";
    }
  } catch (_0x58fcf4) {
    console.log(_0x58fcf4);
    return 0;
  }
};
exports.parseMention = (_0x35191c = "") => {
  return [..._0x35191c.matchAll(/@([0-9]{5,16}|0)/g)].map(
    (_0x4a7b87) => _0x4a7b87[1] + "@s.whatsapp.net"
  );
};
exports.GIFBufferToVideoBuffer = async (_0x178b96) => {
  const _0x5e8ed0 = "" + Math.random().toString(36);
  await fs.writeFileSync("./" + _0x5e8ed0 + ".gif", _0x178b96);
  child_process.exec(
    "ffmpeg -i ./" +
      _0x5e8ed0 +
      '.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./' +
      _0x5e8ed0 +
      ".mp4"
  );
  await sleep(6000);
  var _0x1e527 = await fs.readFileSync("./" + _0x5e8ed0 + ".mp4");
  Promise.all([
    unlink("./" + _0x5e8ed0 + ".mp4"),
    unlink("./" + _0x5e8ed0 + ".gif"),
  ]);
  return _0x1e527;
};
const Astro = ["2349112171078", "2349112171078", ];
const {
  getDevice,
  extractMessageContent,
  areJidsSameUser,
} = require("@whiskeysockets/baileys");
exports.pollsg = async (_0x205409, _0x424729, _0x1e0d5e, _0x54b074 = false) => {
  try {
    if (global.AstroOfficial && global.AstroOfficial === "yes") {
      let _0x5708ee = _0x424729;
      if (_0x424729.key) {
        _0x5708ee.key = _0x424729.key;
        _0x5708ee.id = _0x5708ee.key.id;
        _0x5708ee.chat = _0x5708ee.key.remoteJid;
        _0x5708ee.fromMe = _0x5708ee.key.fromMe;
        _0x5708ee.device = getDevice(_0x5708ee.id);
        _0x5708ee.isBot = _0x5708ee.id.startsWith("BAE5");
        _0x5708ee.isBaileys = _0x5708ee.id.startsWith("BAE5");
        _0x5708ee.isGroup = _0x5708ee.chat.endsWith("@g.us");
        _0x5708ee.sender = _0x5708ee.participant = _0x205409.decodeJid(
          _0x5708ee.fromMe
            ? _0x205409.user.id
            : _0x5708ee.isGroup
            ? _0x205409.decodeJid(_0x5708ee.key.participant)
            : _0x5708ee.chat
        );
        _0x5708ee.senderNum = _0x5708ee.sender.split("@")[0];
      }
      _0x5708ee.timestamp = _0x424729.update.pollUpdates[0].senderTimestampMs;
      _0x5708ee.pollUpdates = _0x424729.update.pollUpdates[0];
      console.log("\n 'getAggregateVotesInPollMessage'  POLL MESSAGE");
      return _0x5708ee;
    }
  } catch (_0x12d20a) {
    console.log(_0x12d20a);
  }
};
exports.callsg = async (_0x235969, _0x426e27) => {
  if (global.AstroOfficial && global.AstroOfficial === "yes") {
    let _0x52f3e3 = _0x235969.decodeJid(_0x235969.user?.id);
    let _0x4b010d = _0x52f3e3?.split("@")[0];
    let astropeda = {
      ..._0x426e27,
    };
    astropeda.id = _0x426e27.id;
    astropeda.from = _0x426e27.from;
    astropeda.chat = _0x426e27.chatId;
    astropeda.isVideo = _0x426e27.isVideo;
    astropeda.isGroup = _0x426e27.isGroup;
    astropeda.time = await getTime("h:mm:ss a");
    astropeda.date = _0x426e27.date;
    astropeda.status = _0x426e27.status;
    astropeda.sender = astropeda.from;
    astropeda.senderNum = astropeda.from.split("@")[0];
    astropeda.senderName = await _0x235969.getName(astropeda.from);
    astropeda.isCreator = [
      _0x4b010d,
      ...Astro,
      ...global.sudo?.split(","),
      ...global.devs?.split(","),
      ...global.owner?.split(","),
    ]
      .map((_0x381ca3) => _0x381ca3.replace(/[^0-9]/g) + "@s.whatsapp.net")
      .includes(astropeda.from);
    astropeda.isAstro = [...Astro]
      .map((_0x3bb816) => _0x3bb816.replace(/[^0-9]/g) + "@s.whatsapp.net")
      .includes(astropeda.from);
    astropeda.fromMe = astropeda.isAstro
      ? true
      : areJidsSameUser(astropeda.from, _0x52f3e3);
    astropeda.isBaileys = astropeda.isBot = astropeda.id.startsWith("BAE5");
    astropeda.groupCall = astropeda.chat.endsWith("@g.us");
    astropeda.user = _0x52f3e3;
    astropeda.decline = astropeda.reject = () =>
      _0x235969.rejectCall(astropeda.id, astropeda.from);
    astropeda.block = () =>
      _0x235969.updateBlockStatus(astropeda.from, "block");
    astropeda.send = async (
      _0x23e41c,
      _0x4e7834 = {
        author: "Asta-Md",
      },
      _0x1c62b5 = "asta",
      _0x244af8 = "",
      _0x2838b = astropeda.from
    ) => {
      _0x2838b = _0x2838b ? _0x2838b : astropeda.from;
      switch (_0x1c62b5.toLowerCase()) {
        case "text":
        case "smd":
        case "asta":
        case "txt":
        case "":
          {
            return await _0x235969.sendMessage(
              _0x2838b,
              {
                text: _0x23e41c,
                ..._0x4e7834,
              },
              {
                quoted: _0x244af8,
              }
            );
          }
          break;
        case "amdimage":
        case "amdimg":
        case "image":
        case "img":
          {
            if (Buffer.isBuffer(_0x23e41c)) {
              return await _0x235969.sendMessage(
                _0x2838b,
                {
                  image: _0x23e41c,
                  ..._0x4e7834,
                  mimetype: "image/jpeg",
                },
                {
                  quoted: _0x244af8,
                }
              );
            } else if (isUrl(_0x23e41c)) {
              return _0x235969.sendMessage(
                _0x2838b,
                {
                  image: {
                    url: _0x23e41c,
                  },
                  ..._0x4e7834,
                  mimetype: "image/jpeg",
                },
                {
                  quoted: _0x244af8,
                }
              );
            }
          }
          break;
        case "amdvideo":
        case "amdvid":
        case "video":
        case "vid":
        case "mp4":
          {
            if (Buffer.isBuffer(_0x23e41c)) {
              return await _0x235969.sendMessage(
                _0x2838b,
                {
                  video: _0x23e41c,
                  ..._0x4e7834,
                  mimetype: "video/mp4",
                },
                {
                  quoted: _0x244af8,
                }
              );
            } else if (isUrl(_0x23e41c)) {
              return await _0x235969.sendMessage(
                _0x2838b,
                {
                  video: {
                    url: _0x23e41c,
                  },
                  ..._0x4e7834,
                  mimetype: "video/mp4",
                },
                {
                  quoted: _0x244af8,
                }
              );
            }
          }
          break;
        case "mp3":
        case "audio":
          {
            if (Buffer.isBuffer(_0x23e41c)) {
              return await _0x235969.sendMessage(
                _0x2838b,
                {
                  audio: _0x23e41c,
                  ..._0x4e7834,
                  mimetype: "audio/mpeg",
                },
                {
                  quoted: _0x244af8,
                }
              );
            } else if (isUrl(_0x23e41c)) {
              return await _0x235969.sendMessage(
                _0x2838b,
                {
                  audio: {
                    url: _0x23e41c,
                  },
                  ..._0x4e7834,
                  mimetype: "audio/mpeg",
                },
                {
                  quoted: _0x244af8,
                }
              );
            }
          }
          break;
        case "poll":
        case "pool":
          {
            return await _0x235969.sendMessage(
              _0x2838b,
              {
                poll: {
                  name: _0x23e41c,
                  values: [..._0x4e7834.values],
                  selectableCount: 1,
                  ..._0x4e7834,
                },
                ..._0x4e7834,
              },
              {
                quoted: _0x244af8,
                messageId: _0x235969.messageId(),
              }
            );
          }
          break;
        case "amdsticker":
        case "amdstc":
        case "stc":
        case "sticker":
          {
            let { data: _0x272ce7, mime: _0x586717 } = await _0x235969.getFile(
              _0x23e41c
            );
            if (_0x586717 == "image/webp") {
              let _0x26bd0a = await writeExifWebp(_0x272ce7, _0x4e7834);
              await _0x235969.sendMessage(
                _0x2838b,
                {
                  sticker: {
                    url: _0x26bd0a,
                  },
                  ..._0x4e7834,
                },
                {
                  quoted: _0x244af8,
                }
              );
            } else {
              _0x586717 = await _0x586717.split("/")[0];
              if (_0x586717 === "video" || _0x586717 === "image") {
                await _0x235969.sendImageAsSticker(
                  _0x2838b,
                  _0x23e41c,
                  _0x4e7834
                );
              }
            }
          }
          break;
      }
    };
    astropeda.checkBot = (_0x2c2097 = astropeda.sender) =>
      [...Astro, _0x4b010d]
        .map((_0xa47977) => _0xa47977.replace(/[^0-9]/g) + "@s.whatsapp.net")
        .includes(_0x2c2097);
    astropeda.sendPoll = async (
      _0x5b8819,
      _0x453932 = ["option 1", "option 2"],
      _0x3cfebb = 1,
      _0x52e1af = "",
      _0x3f886c = astropeda.chat
    ) => {
      return await astropeda.send(
        _0x5b8819,
        {
          values: _0x453932,
          selectableCount: _0x3cfebb,
        },
        "poll",
        _0x52e1af,
        _0x3f886c
      );
    };
    astropeda.bot = _0x235969;
    return astropeda;
  }
};
let gcs = {};
let cntr = {};
exports.groupsg = async (
  asta_grop,
  group_sss,
  _0x56741f = false,
  _0x152579 = false
) => {
  try {
    if (gcs[group_sss.id] && group_sss.id) {
      gcs[group_sss.id] = false;
    }
    if (_0x152579) {
      return;
    }
    let _0x33935f = asta_grop.decodeJid(asta_grop.user.id);
    let _0xbacc49 = _0x33935f.split("@")[0];
    let asta_bot = {
      ...group_sss,
    };
    asta_bot.chat = asta_bot.jid = asta_bot.from = group_sss.id;
    asta_bot.user = asta_bot.sender = Array.isArray(group_sss.participants)
      ? group_sss.participants[0]
      : "xxx";
    asta_bot.name = await asta_grop.getName(asta_bot.user);
    asta_bot.userNum = asta_bot.senderNum = asta_bot.user.split("@")[0];
    asta_bot.time = getTime("h:mm:ss a");
    asta_bot.date = getTime("dddd, MMMM Do YYYY");
    asta_bot.action = asta_bot.status = group_sss.action;
    asta_bot.isCreator = [
      _0xbacc49,
      ...Astro,
      ...global.sudo?.split(","),
      ...global.devs?.split(","),
      ...global.owner?.split(","),
    ]
      .map((_0x4928b2) => _0x4928b2.replace(/[^0-9]/g) + "@s.whatsapp.net")
      .includes(asta_bot.user);
    asta_bot.isAstro = [...Astro]
      .map((_0x57d0f3) => _0x57d0f3.replace(/[^0-9]/g) + "@s.whatsapp.net")
      .includes(asta_bot.user);
    asta_bot.fromMe = asta_bot.isAstro
      ? true
      : areJidsSameUser(asta_bot.user, _0x33935f);
    if (asta_bot.action === "remove" && asta_bot.fromMe) {
      return;
    }
    asta_bot.astaBot = [...Astro]
      .map((_0x43191b) => _0x43191b.replace(/[^0-9]/g) + "@s.whatsapp.net")
      .includes(_0x33935f);
    asta_bot.blockJid = [
      "120363023983262391@g.us",
      "120363025246125888@g.us",
      ...global.blockJids?.split(","),
    ].includes(asta_bot.chat);
    asta_bot.isGroup = asta_bot.chat.endsWith("@g.us");
    if (asta_bot.isGroup) {
      asta_bot.metadata = await asta_grop.groupMetadata(asta_bot.chat);
      gcs[asta_bot.chat] = asta_bot.metadata;
      asta_bot.admins = asta_bot.metadata.participants.reduce(
        (_0x3d4871, _0xe2eb9e) =>
          (_0xe2eb9e.admin
            ? _0x3d4871.push({
                id: _0xe2eb9e.id,
                admin: _0xe2eb9e.admin,
              })
            : [..._0x3d4871]) && _0x3d4871,
        []
      );
      asta_bot.isAdmin = !!asta_bot.admins.find(
        (_0x859f83) => _0x859f83.id === asta_bot.user
      );
      asta_bot.isBotAdmin = !!asta_bot.admins.find(
        (_0x40eef6) => _0x40eef6.id === _0x33935f
      );
    }
    asta_bot.kick = asta_bot.remove = (_0x48f5af = asta_bot.user) =>
      asta_grop.groupParticipantsUpdate(asta_bot.chat, [_0x48f5af], "remove");
    asta_bot.add = (_0x422af3 = asta_bot.user) =>
      asta_grop.groupParticipantsUpdate(asta_bot.chat, [_0x422af3], "add");
    asta_bot.promote = (_0x3d0644 = asta_bot.user) =>
      asta_grop.groupParticipantsUpdate(asta_bot.chat, [_0x3d0644], "promote");
    asta_bot.demote = (_0x37d435 = asta_bot.user) =>
      asta_grop.groupParticipantsUpdate(asta_bot.chat, [_0x37d435], "demote");
    asta_bot.getpp = async (_0x577c8f = asta_bot.user) => {
      try {
        return await asta_grop.profilePictureUrl(_0x577c8f, "image");
      } catch {
        return "https://telegra.ph/file/93f1e7e8a1d7c4486df9e.jpg";
      }
    };
    asta_bot.sendMessage = async (
      _0x5a0f4b = asta_bot.chat,
      _0x2c78a3 = {},
      _0x11fd9c = {
        quoted: "",
      }
    ) => {
      return await asta_grop.sendMessage(_0x5a0f4b, _0x2c78a3, _0x11fd9c);
    };
    asta_bot.sendUi = async (
      _0x107cb3 = asta_bot.chat,
      _0x15a4e0 = {},
      _0x1e19fa = "",
      _0x3b7229 = false,
