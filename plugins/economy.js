const { groupdb, smd, getBuffer, tlang, prefix } = require('../lib');
const Config = require('../config');
const eco = require('discord-mongoose-economy');
let ty = false;

try {
  if (isMongodb) {
    ty = eco.connect(mongodb);
    console.log("Connected with discord economy!!");
  }
} catch (e) {
  ty = false;
}
const sck = groupdb;

if (ty) {
  // Daily Command
  smd({
      pattern: "daily",
      desc: "daily gold.",
      category: "economy",
      filename: __filename,
      //react: "💷"
    },
    async ({ reply, chat, isGroup, sender, error }) => {
      try {
        let zerogroup = await sck.findOne({ id: chat }) || {};
        if (zerogroup?.economy == "false") return reply("*🚦Economy* is not active in the current group.");
        if (!isGroup) return reply(tlang().group);
        const daily = await eco.daily(sender, "Qᴜᴇᴇɴ_Mᴀʀɪᴀ", 500); // Give 500 for daily, can be changed
        if (daily.cd) {
          return await reply(`🧧 You already claimed daily for today, come back in ${daily.cdL}🫡`);
        } else {
          reply(`You claimed daily ${daily.amount} 🪙 for today 🎉.`);
        }
      } catch (e) {
        error(`${e}\n\ncommand: daily`, e);
      }
    }
  );

  // Reset Wallet Command
  smd({
      pattern: "resetwallet",
      desc: "reset wallet of quoted user.",
      category: "economy",
      filename: __filename,
      react: "💷"
    },
    async (message) => {
      try {
        let zerogroup = (await sck.findOne({ id: message.chat })) || await sck.new({ id: message.chat });
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false") return message.reply("*🚦Economy* is not active in the current group.");
        if (!isCreator) return message.reply(tlang().owner);
        let users = message.mentionedJid ? message.mentionedJid[0] : message.msg.contextInfo.participant || false;
        if (!users) return message.reply('Please give me a user.');
        const balance = await eco.balance(users, "Qᴜᴇᴇɴ_Mᴀʀɪᴀ");
        await eco.deduct(users, "Qᴜᴇᴇɴ_Mᴀʀɪᴀ", balance.wallet);
        return await message.reply(`⛩️ User: @${users.split('@')[0]} \n *🧧 @${users.split('@')[0]} lost all 🪙 in the wallet.*\n_Now live with that poverty.🫡_`, { mentions: [users] });
      } catch (e) {
        message.error(`${e}\n\ncommand: resetwallet`, e);
      }
    }
  );

  // Capacity Command
  smd({
      pattern: "capacity",
      desc: "update capacity.",
      category: "economy",
      filename: __filename,
      react: "💷"
    },
    async (message, match) => {
      try {
        let zerogroup = (await sck.findOne({ id: message.chat })) || await sck.new({ id: message.chat });
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false") return message.reply("*🚦Economy* is not active in the current group.");
        if (!message.isGroup) return message.reply(tlang().group);
        if (!match) return message.reply(`💴 *Bank-capacity* 💳\n\n1 | *1000 sp* = 🪙100\n\n2 | *100000 sp* = 🪙1000\n\n3 | *10000000 sp* = 🪙10000000\n\nExample- ${prefix}capacity 1 OR ${prefix}bankupgrade 1000`);
        let user = message.mentionedJid ? message.mentionedJid[0] : message.msg.contextInfo.participant || false;
        let value = match.trim();
        let k = parseInt(value);
        const balance = await eco.balance(user, "QUEEN_MARIA");

        switch (value) {
          case '1000':
          case '1':
            if (k > balance.wallet) return message.reply(`*_You need to pay 🪙100 to increase bank capacity ~ 1000 sp_*`);
            await eco.deduct(user, "QUEEN_MARIA", 100);
            await eco.giveCapacity(user, "QUEEN_MARIA", 1000);
            return await message.reply(`*1000 🪙 diamond storage has been added in ${message.senderName}'s bank*`);
          case '100000':
          case '2':
            if (k > balance.wallet) return message.reply(`*You need to pay 🪙1000 to increase bank capacity ~ 100000 sp*`);
            await eco.deduct(user, "QUEEN_MARIA", 1000);
            await eco.giveCapacity(user, "QUEEN_MARIA", 100000);
            return await message.reply(`*100000 🪙 diamond storage has been added in ${message.pushName}'s bank*`);
          case '10000000':
          case '3':
            if (k > balance.wallet) return message.reply(`You need to pay 🪙10000 to increase bank capacity ~ 10000000 sp`);
            await eco.deduct(user, "QUEEN_MARIA", 10000);
            await eco.giveCapacity(user, "QUEEN_MARIA", 10000000);
            return await message.reply(`*10000000 🪙 diamond storage has been added in ${message.pushName}'s bank*`);
          default:
            await message.reply('*What are you trying to do📉*.');
        }
      } catch (e) {
        message.error(`${e}\n\ncommand: capacity`, e);
      }
    }
  );

  // Add more economy commands as needed...

}