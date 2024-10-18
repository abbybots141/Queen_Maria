const {
  smd,
  fetchJson,
  astroJson,
  fancytext,
  yt,
  getBuffer,
  smdBuffer,
  prefix,
  Config,
} = require("../lib");
const {
  search,
  download
} = require("aptoide-scraper");
const googleTTS = require("google-tts-api");
const ytdl = require("ytdl-core");
const yts = require("secktor-pack");
const fs = require("fs-extra");
const axios = require("axios");
const fetch = require("node-fetch");
var videotime = 2000;
const {
  cmd
} = require("../lib/plugins");

// Instagram Stalker
smd(
  {
    pattern: "igstalk",
    desc: "Get information about an Instagram user.",
    category: "stalker",
    filename: __filename,
    use: "<username>",
  },
  async (m, username) => {
    try {
      if (!username) {
        return await m.send("*_Please provide an Instagram username!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/stalk/instagram?q=${encodeURIComponent(username)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const {
        photo_profile,
        username: igUsername,
        fullname,
        posts,
        followers,
        following,
        bio,
      } = data.result;

      const caption = `
*Instagram User Information*

*Username:* ${igUsername}
*Full Name:* ${fullname}
*Bio:* ${bio || "NO BIO"}
*Posts:* ${posts}
*Followers:* ${followers}
*Following:* ${following}

*Qᴜᴇᴇɴ_Mᴀʀɪᴀ IG STALKER*
`;

      await m.bot.sendFromUrl(m.from, photo_profile, caption, m, {}, "image");
    } catch (e) {
      await m.error(`${e}\n\ncommand: igstalk`, e);
    }
  }
);

// YouTube Stalker
smd(
  {
    pattern: "ytstalk",
    desc: "Get information about a YouTube channel.",
    category: "stalker",
    filename: __filename,
    use: "<channel_name>",
  },
  async (m, channelName) => {
    try {
      if (!channelName) {
        return await m.send("*_Please provide a YouTube channel name!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/stalk/ytchannel?q=${encodeURIComponent(channelName)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const channels = data.result;

      if (!channels || !Array.isArray(channels) || channels.length === 0) {
        return await m.send("*_No channels found!_*");
      }

      for (const channel of channels) {
        const {
          channel_id,
          channel_name,
          channel_about,
          channel_created,
          channel_picture,
        } = channel;

        const caption = `
*YouTube Channel Information*

*Channel Name:* ${channel_name}
*Channel ID:* ${channel_id}
*Channel Description:* ${channel_about}
*Channel Created:* ${new Date(channel_created).toLocaleString()}

*Profile Picture:*
`;

        const profilePictureUrl = channel_picture.high.url || channel_picture.medium.url;
        await m.bot.sendFromUrl(m.from, profilePictureUrl, caption, m, {}, "image");
      }
    } catch (e) {
      await m.error(`${e}\n\ncommand: ytstalk`, e);
    }
  }
);

// GitHub Stalker
smd(
  {
    pattern: "gitstalk",
    desc: "Get information about a GitHub user.",
    category: "stalker",
    filename: __filename,
    use: "<username>",
  },
  async (m, username) => {
    try {
      if (!username) {
        return await m.send("*_Please provide a GitHub username!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/stalk/githubuser?q=${encodeURIComponent(username)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const {
        login,
        id,
        avatar_url,
        name,
        company,
        blog,
        location,
        bio,
        public_repos,
        public_gists,
        followers,
        following,
        created_at,
        updated_at,
      } = data.result;

      const caption = `
*GitHub User Information*

*Username:* ${login}
*Name:* ${name || "N/A"}
*ID:* ${id}
*Bio:* ${bio || "N/A"}
*Company:* ${company || "N/A"}
*Blog:* ${blog || "N/A"}
*Location:* ${location || "N/A"}
*Public Repositories:* ${public_repos}
*Public Gists:* ${public_gists}
*Followers:* ${followers}
*Following:* ${following}
*Account Created:* ${new Date(created_at).toLocaleString()}
*Last Updated:* ${new Date(updated_at).toLocaleString()}

*Avatar:*
`;

      await m.bot.sendFromUrl(m.from, avatar_url, caption, m, {}, "image");
    } catch (e) {
      await m.error(`${e}\n\ncommand: gitstalk`, e);
    }
  }
);

// IP Address Stalker
smd(
  {
    pattern: "ipstalk",
    desc: "Get information about an IP address.",
    category: "misc",
    filename: __filename,
    use: "<ip_address>",
  },
  async (m, ipAddress) => {
    try {
      if (!ipAddress) {
        return await m.send("*_Please provide an IP address!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/stalk/ip?q=${encodeURIComponent(ipAddress)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const {
        continent,
        country,
        countryCode,
        regionName,
        city,
        zip,
        lat,
        lon,
        timezone,
        currency,
        isp,
        org,
        as,
        reverse,
        mobile,
        proxy,
        hosting,
        ip,
      } = data.result;

      const caption = `
*IP Address Information*

*IP Address:* ${ip}
*Reverse DNS:* ${reverse}
*Continent:* ${continent}
*Country:* ${country} (${countryCode})
*Region:* ${regionName}
*City:* ${city}
*ZIP Code:* ${zip}
*Latitude:* ${lat}
*Longitude:* ${lon}
*Timezone:* ${timezone}
*Currency:* ${currency}
*ISP:* ${isp}
*Organization:* ${org}
*AS:* ${as}
*Mobile:* ${mobile ? "Yes" : "No"}
*Proxy:* ${proxy ? "Yes" : "No"}
*Hosting:* ${hosting ? "Yes" : "No"}
`;

      await m.send(caption);
    } catch (e) {
      await m.error(`${e}\n\ncommand: ipstalk`, e);
    }
  }
);

// Social Media Downloader
smd(
  {
    pattern: "allsocial",
    desc: "Download media from various social platforms.",
    category: "downloader",
    filename: __filename,
    use: "<url>",
  },
  async (m, url) => {
    try {
      if (!url) {
        return await m.send("*_Please provide a URL!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/download/alldownload2?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      const data = await response.json();
      const result = data.result;

      if (!result || !result.medias || !result.medias.length) {
        return await m.send("*_No media found!_*");
      }

      const { title, thumbnail, medias } = result;
      const caption = `*Title:* ${title}\n\n*Source:* ${medias[0].source}`;

      await m.bot.sendFromUrl(m.from, thumbnail, caption, m,