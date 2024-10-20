const { smd } = require("../lib");
const { exec } = require("child_process");
const fs = require("fs");

async function audioEditor(_0x1ef339, _0x567a0f = "bass", _0x730356 = "") {
  // Check if there is a quoted message (audio)
  if (!_0x1ef339.quoted) {
    return await _0x1ef339.send("*_Uhh Dear, Reply to audio!!!_*");
  }

  let _0x1e4c20 = _0x1ef339.quoted.mtype || _0x1ef339.mtype;
  if (!/audio/.test(_0x1e4c20)) {
    return await _0x1ef339.send(
      "*_Reply to the audio you want to change with_*",
      {},
      "",
      _0x730356
    );
  }

  try {
    // Set default filter for bass
    let _0x3497f6 = "-af equalizer=f=54:width_type=o:width=2:g=20";
    
    // Determine the filter based on the effect requested
    if (/blown/.test(_0x567a0f)) {
      _0x3497f6 = "-af acrusher=.1:1:64:0:log";
    } else if (/deep/.test(_0x567a0f)) {
      _0x3497f6 = "-af atempo=4/4,asetrate=44500*2/3";
    } else if (/earrape/.test(_0x567a0f)) {
      _0x3497f6 = "-af volume=12";
    } else if (/fast/.test(_0x567a0f)) {
      _0x3497f6 = '-filter:a "atempo=1.63,asetrate=44100"';
    } else if (/fat/.test(_0x567a0f)) {
      _0x3497f6 = '-filter:a "atempo=1.6,asetrate=22100"';
    } else if (/nightcore/.test(_0x567a0f)) {
      _0x3497f6 = "-filter:a atempo=1.06,asetrate=44100*1.25";
    } else if (/reverse/.test(_0x567a0f)) {
      _0x3497f6 = '-filter_complex "areverse"';
    } else if (/robot/.test(_0x567a0f)) {
      _0x3497f6 =
        "-filter_complex \"afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75\"";
    } else if (/slow/.test(_0x567a0f)) {
      _0x3497f6 = '-filter:a "atempo=0.7,asetrate=44100"';
    } else if (/smooth/.test(_0x567a0f)) {
      _0x3497f6 =
        "-filter:v \"minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'\"";
    } else if (/tupai/.test(_0x567a0f)) {
      _0x3497f6 = '-filter:a "atempo=0.5,asetrate=65100"';
    }

    // Download the audio file
    let _0x25e2bd = await _0x1ef339.bot.downloadAndSaveMediaMessage(
      _0x1ef339.quoted
    );
    
    // Prepare the output file path
    let _0x58830b = "temp/" + (_0x1ef339.sender.slice(6) + _0x567a0f) + ".mp3";
    
    // Execute the ffmpeg command
    exec(
      "ffmpeg -i " + _0x25e2bd + " " + _0x3497f6 + " " + _0x58830b,
      async (_0x43e1ec) => {
        // Clean up the downloaded file
        try {
          fs.unlinkSync(_0x25e2bd);
        } catch {}

        // Check for errors in processing
        if (_0x43e1ec) {
          return _0x1ef339.error(_0x43e1ec);
        } else {
          // Read the processed audio file
          let _0x11bfca = fs.readFileSync(_0x58830b);
          try {
            fs.unlinkSync(_0x58830b);
          } catch {}
          
          // Prepare the context information
          var _0xfba2a2 = {
            ...(await _0x1ef339.bot.contextInfo(
              "Hello " + _0x1ef339.senderName + " 🤍",
              "⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ⇆"
            )),
          };

          // Send the processed audio back to the user
          return _0x1ef339.bot.sendMessage(
            _0x1ef339.chat,
            {
              audio: _0x11bfca,
              mimetype: "audio/mpeg",
              ptt: /ptt|voice/.test(_0x1ef339.test || "") ? true : false,
              contextInfo: _0xfba2a2,
            },
            {
              quoted: _0x1ef339,
              messageId: _0x1ef339.bot.messageId(),
            }
          );
        }
      }
    );
  } catch (_0x48606a) {
    await _0x1ef339.error(_0x48606a + "\n\ncmdName : " + _0x567a0f + "\n");
    return console.log("./lib/asta.js/audioEditor()\n", _0x48606a);
  }
}

// Command for bass effect
smd(
  {
    cmdname: "bass",
    info: "adds bass in given sound",
    type: "audio",
    use: "<reply to any audio>",
  },
  async (_0x5d6ad1, _0x53c461, { smd: _0xf17388 }) => {
    try {
      return await audioEditor(_0x5d6ad1, _0xf17388, _0x5d6ad1);
    } catch (_0x429687) {
      return await _0x5d6ad1.error(
        _0x429687 + " \n\nCommand: " + _0xf17388,
        _0x429687
      );
    }
  }
);

// Command for blown effect
smd(
  {
    cmdname: "blown",
    info: "adds blown in given sound",
    type: "audio",
    use: "<reply to any audio>",
  },
  async (_0x483202, _0x13c66b, { smd: _0x4afb5c }) => {
    try {
      return await audioEditor(_0x483202, _0x4afb5c, _0x483202);
    } catch (_0x370dd7) {
      return await _0x483202.error(
        _0x370dd7 + " \n\nCommand: " + _0x4afb5c,
        _0x370dd7
      );
    }
  }
);

// Command for deep effect
smd(
  {
    cmdname: "deep",
    info: "adds deep in given sound",
    type: "audio",
    use: "<reply to any audio>",
  },
  async (_0x4f23d9, _0x3cf305, { smd: _0x7e1b7 }) => {
    try {
      return await audioEditor(_0x4f23d9, _0x7e1b7, _0x4f23d9);
    } catch (_0x212449) {
      return await _0x4f23d9.error(
        _0x212449 + " \n\nCommand: " + _0x7e1b7,
        _0x212449
      );
    }
  }
);

// Command for earrape effect
smd(
  {
    cmdname: "earrape",
    info: "adds earrape in given sound",
    type: "audio",
    use: "<reply to any audio>",
  },
  async (_0x17a00c, _0x54b87c, { smd: _0x22851d }) => {
    try {
      return await audioEditor(_0x17a00c, _0x22851d, _0x17a00c);
    } catch (_0x1069a9) {
      return await _0x17a00c.error(
        _0x1069a9 + " \n\nCommand: " + _0x22851d,
        _0x1069a9
      );
    }
  }
);

// Command for fast effect
smd(
  {
    cmdname: "fast",
    info: "adds fast in given sound",
    type: "