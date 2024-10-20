const {
    smd,
    tlang,
    prefix,
} = require('../lib');

smd({
    cmdname: "getall",
    desc: "Get JID of all members of groups/PM chats/all groups.",
    type: "owner",
    fromMe: true,
    use: "[ members / user / groups ]",
    usage: "Get JIDs of groups, personal chats, also members of group, so that they can be used for the forward command!",
    filename: __filename,
    public: false,
}, async (citel, text, { store }) => {
    try {
        let str = "";
        let cd = text.split(" ")[0];

        if (cd === "members" || cd === "member") {
            if (!citel.isGroup) return citel.reply(tlang("group"));
            const participants = citel.metadata.participants || {};
            for (let participant of participants) {
                str += `📍 ${participant.id}\n`;
            }
            str ? citel.reply(`*「 LIST OF GROUP MEMBER'S JID 」*\n\n` + str) : citel.reply("*Request Denied!*");
        } else if (cd === "user" || cd === "pm" || cd === "pc") {
            let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v);
            for (let user of anu) {
                str += `📍 ${user.id}\n`;
            }
            str ? citel.reply(`*「 LIST OF PERSONAL CHAT JIDS 」*\n\nTotal ${anu.length} users have texted in personal chat.\n\n` + str) : citel.reply("*Request Denied!*");
        } else if (cd === "group" || cd === "groups" || cd === "gc") {
            let n = await citel.bot.groupFetchAllParticipating();
            const groups = Object.entries(n).slice(0).map(t => t[1]);
            for (let group of groups) {
                str += `📍 ${group.id}\n`;
            }
            str ? citel.reply(`*「 LIST OF GROUP CHAT JIDS」*\n\n` + str) : citel.reply("*Request Denied!*");
        } else {
            await citel.reply(`*Use ${prefix}getall pc | gc | member!*`);
        }
    } catch (e) {
        citel.error(`${e}\n\nCommand getall`, e);
    }
});