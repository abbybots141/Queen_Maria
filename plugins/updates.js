let {
   smd,
   smdBuffer,
   tlang,
   sleep
 } = require(global.lib_dir || "../lib");
 let fs = require("fs");
 var sifat = ["Fine", "Unfriendly", "Cute", "Sigma", "Chapri", "Nibba/nibbi", "Annoying", "Dilapidated", "Angry person", "Polite", "Burden", "Great", "Cringe", "Liar"];
 var hoby = ["Cooking", "Dancing", "Playing", "Gaming", "Painting", "Helping Others", "Watching anime", "Reading", "Riding Bike", "Singing", "Chatting", "Sharing Memes", "Drawing", "Eating Parents Money", "Playing Truth or Dare", "Staying Alone"];
 var cakep = ["Yes", "No", "Very Ugly", "Very Handsome"];
 var wetak = ["Caring", "Generous", "Angry person", "Sorry", "Submissive", "Fine", "Im sorry", "Kind Hearted", "Patient", "UwU", "Top", "Helpful"];
 var checkme = {};
 smd({
   cmdname: "checkme",
   alias: ["aboutme"],
   desc: "Check random information about your character!",
   category: "updates",
   filename: __filename
 }, async (_0x263d98, _0x3610bc) => {
   try {
     let _0x2126b2 = _0x263d98.sender;
     if (_0x263d98.isCreator) {
       _0x2126b2 = _0x263d98.reply_message ? _0x263d98.reply_message.sender : _0x263d98.mentionedJid[0] ? _0x263d98.mentionedJid[0] : _0x2126b2;
     }
     let _0x32f5f0 = !/fresh|reset|new|why|update/g.test(_0x3610bc) && checkme[_0x2126b2] ? checkme[_0x2126b2] : "*ABOUT @" + _0x2126b2.split("@")[0] + "*\n  \n*Name :* " + (await _0x263d98.bot.getName(_0x2126b2)).split("\n").join("  ") + "\n*Characteristic :* " + sifat[Math.floor(Math.random() * sifat.length)] + "\n*Hobby :* " + hoby[Math.floor(Math.random() * hoby.length)] + "\n*Simp :* " + Math.floor(Math.random() * 101) + "%\n*Great :* " + Math.floor(Math.random() * 101) + "%\n*Handsome :* " + cakep[Math.floor(Math.random() * cakep.length)] + "\n*Character :* " + wetak[Math.floor(Math.random() * wetak.length)] + "\n*Good Morals :* " + Math.floor(Math.random() * 101) + "%\n*Bad Morals :* " + Math.floor(Math.random() * 101) + "%\n*Intelligence :* " + Math.floor(Math.random() * 101) + "%\n*Courage :* " + Math.floor(Math.random() * 101) + "%\n*Afraid :* " + Math.floor(Math.random() * 101) + "%\n  \n *aLL BOUT UO*";
     checkme[_0x2126b2] = _0x32f5f0;
     _0x263d98.bot.sendUi(_0x263d98.from, {
       caption: _0x32f5f0,
       mentions: [_0x2126b2]
     }, {
       quoted: _0x263d98
     }, "image", await _0x263d98.getpp(_0x2126b2), true);
   } catch (_0x3a370c) {
     _0x263d98.error(_0x3a370c + "\n\nCommand:aboutme", _0x3a370c, false);
   }
 });

 smd({
   pattern: "cleartmp",
   type: "updates",
   info: "Clear temporary files cache"
 }, async _0xadf9f3 => {
   try {
     const _0xae4773 = "./temp";
     if (fs.existsSync(_0xae4773)) {
       fs.readdirSync(_0xae4773).forEach(_0x1577c1 => fs.rmSync(_0xae4773 + "/" + _0x1577c1));
     }
     await _0xadf9f3.reply("_The *temp* folder has been cleaned_");
   } catch (_0x3308a1) {
     _0xadf9f3.error(_0x3308a1 + "\n\nCommand: cleartmp", _0x3308a1, false);
   }
 });

 smd({
   cmdname: "request",
   alias: ["reportbug", "report"],
   desc: "Report bug/features of bot to its creator!",
   category: "updates",
   filename: __filename
 }, async (_0x3b2ef2, _0x45bf7a) => {
   try {
     if (!_0x45bf7a) {
       return _0x3b2ef2.reply("Example : " + prefix + "request [REQUEST/BUG] yt commands are not working!");
     }
     if (_0x45bf7a.split(" ").length < 5) {
       return _0x3b2ef2.reply("_Your `REQUEST/BUG`  must have `5 words` !_");
     }
     let _0x2dca1f = "*| REQUEST/BUG |*";
     let _0x3c1a2b = "\n\n*User* : @" + _0x3b2ef2.senderNum + "\n\n*Request/Bug* : " + _0x45bf7a;
     let _0x23711a = "\n\n*Hi " + _0x3b2ef2.senderName.split("\n").join(" ") + ", Your request has been forwarded to my Creator!*.";
     await _0x3b2ef2.sendMessage("2348121373516@s.whatsapp.net", {
       text: _0x2dca1f + _0x3c1a2b,
       mentions: [_0x3b2ef2.sender]
     }, {
       quoted: _0x3b2ef2
     });
     await _0x3b2ef2.reply(_0x2dca1f + _0x23711a + _0x3c1a2b, {
       mentions: [_0x3b2ef2.sender]
     }, "asta", _0x3b2ef2);
   } catch (_0x29b74b) {
     _0x3b2ef2.error(_0x29b74b + "\n\nCommand: request", _0x29b74b, false);
   }
 });