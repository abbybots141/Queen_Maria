const DB = require("../lib/scraper");
const { Config, smd } = require("../lib");
const simpleGit = require("simple-git");
const git = simpleGit();

try {
  const Heroku = require("heroku-client");
  const heroku = new Heroku({ token: process.env.HEROKU_API_KEY });

  async function updateHerokuApp() {
    try {
      await git.fetch();
      const commits = await git.log(["main..origin/main"]);

      if (commits.total === 0) {
        return `${Config.botname} IS ON IT'S LATEST VERSION`;
      } else {
        console.log("Update Detected, trying to update your bot!");
        const app = await heroku.get(`/apps/${process.env.HEROKU_APP_NAME}`);
        const gitUrl = app.git_url.replace(
          "https://",
          `https://api:${process.env.HEROKU_API_KEY}@`
        );

        try {
          await git.addRemote("heroku", gitUrl);
        } catch (e) {
          console.error("Heroku remote adding error", e);
        }

        await git.push("heroku", "main");
        return "Bot updated. Restarting.";
      }
    } catch (e) {
      console.error(e);
      return "Can't Update, Request Denied!";
    }
  }

  // Command to check for updates
  smd(
    {
      pattern: "checkupdate",
      desc: "Shows repo's refreshed commits.",
      category: "tools",
      fromMe: true,
      react: "🍂",
      filename: __filename,
      use: process.env.HEROKU_API_KEY ? "[ start ]" : "",
    },
    async (citel, text) => {
      try {
        let commits = await DB.syncgit();
        if (commits.total === 0) {
          return await citel.reply(
            `*QUEEN_MARIA IS RUNNING ON LATEST\nPATCHES\nFIXES\nUPGRADES*`
          );
        }

        let update = await DB.sync();
        await citel.bot.sendMessage(
          citel.chat,
          { text: update.replace(/SuhailTechIMd/, " Abby Bots Inc") },
          { quoted: citel }
        );

        if (
          text === "start" &&
          process.env.HEROKU_APP_NAME &&
          process.env.HEROKU_API_KEY
        ) {
          citel.reply("Build started...");
          const updateMsg = await updateHerokuApp();
          return await citel.reply(updateMsg);
        }
      } catch (e) {
        citel.error(`${e}\n\nCommand: update`, e, "ERROR!");
      }
    }
  );

  // Command to manually update
  smd(
    {
      pattern: "update",
      desc: process.env.HEROKU_API_KEY
        ? "*UPDATE SUCCESS*"
        : "UPDATED YOUR DEPLOYMENT",
      fromMe: true,
      category: "tools",
      filename: __filename,
    },
    async (citel) => {
      try {
        let commits = await DB.syncgit();
        if (commits.total === 0) {
          return await citel.reply(`*${Config.VERSION} IS Updating*`);
        }

        let update = await DB.sync();
        let text = `*UPDATE RUNNING*\n\t${update}*`;

        await citel.bot.sendMessage(citel.jid, { text });
        await git.reset("hard", ["HEAD"]);
        await git.pull();

        await citel.reply(
          process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY
            ? "*`BOT UPDATED`*\n*RESTART YOUR BOT FOR UPDATE TO TAKE EFFECT*"
            : "```*Successfully updated. Now You Have Latest Version Installed!*"
        );
      } catch (e) {
        citel.error(`${e}\n\nCommand: updatenow`, e, "ERROR!");
      }
    }
  );

  // Auto-update check on startup if HEROKU_API_KEY is set
  if (process.env.HEROKU_API_KEY) {
    console.log("HEROKU : checking for auto update!");
    updateHerokuApp();
  }
} catch (e) {
  console.error("Error initializing update functionality:", e);
}