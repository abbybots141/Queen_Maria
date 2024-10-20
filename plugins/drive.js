const { smd, isUrl, Config } = require("../lib/index");
import("node-fetch")
  .then((fetch) => {
    const nodeFetch = fetch.default;

    smd(
      {
        pattern: "drive",
        alias: ["mdrive", "gdrive"],
        desc: "Google Drive downloader",
        type: "downloader",
        use: "<URL>",
      },
      async (message, url) => {
        try {
          const driveUrl = isUrl(url || message.reply_text);
          if (!driveUrl || !driveUrl[0]) {
            return await message.send(
              "*Example: mdrive https://drive.google.com/file/d/15Vl6Df8GO8Gi3woPG-gOMxLQ-B_fkLaw/view*"
            );
          }

          const fileData = await getDriveFileData(driveUrl[0], nodeFetch);
          if (!fileData) {
            return await message.reply("*Not found*");
          }

          const infoMessage = await message.send(
            (
              "≡ *GOOGLE DRIVE DOWNLOADER*\n\n" +
              `▢ *Name:* ${fileData.fileName}\n` +
              `▢ *Size:* ${formatSize(fileData.sizeBytes)}\n` +
              `▢ *Type:* ${fileData.mimetype}\n\n` +
              Config.caption
            ).trim()
          );

          return await message.bot.sendMessage(
            message.chat,
            {
              document: {
                url: fileData.downloadUrl,
              },
              ...fileData,
            },
            { quoted: infoMessage }
          );
        } catch (error) {
          message.error(
            `${error}\n\nCommand drive`,
            error,
            error.message || "ERROR!"
          );
        }
      }
    );

    async function getDriveFileData(driveUrl, fetch) {
      let fileId;

      if (!driveUrl || !driveUrl.match(/drive\.google/i)) {
        throw "Invalid URL";
      }

      const match = driveUrl.match(/\/?id=(.+)/i) || driveUrl.match(/\/d\/(.*?)\//);
      if (match && match[1]) {
        fileId = match[1];
      } else {
        throw "ID Not Found";
      }

      const response = await fetch(
        `https://drive.google.com/uc?id=${fileId}&authuser=0&export=download`,
        {
          method: "POST",
          headers: {
            "accept-encoding": "gzip, deflate, br",
            "content-length": 0,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            origin: "https://drive.google.com",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
            "x-client-data": "CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=",
            "x-drive-first-party": "DriveWebUi",
            "x-json-requested": "true",
          },
        }
      );

      const jsonResponse = JSON.parse((await response.text()).slice(4));
      const { fileName, sizeBytes, downloadUrl } = jsonResponse;

      if (!downloadUrl) {
        throw "URL not found!";
      }

      const fileResponse = await fetch(downloadUrl);
      if (fileResponse.status !== 200) {
        throw "Request Not Completed!";
      }

      return {
        downloadUrl,
        fileName,
        sizeBytes,
        mimetype: fileResponse.headers.get("content-type"),
      };
    }

    function formatSize(bytes, decimalPoint = 2) {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const dm = decimalPoint < 0 ? 0 : decimalPoint;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }
  })
  .catch((error) => {
    console.error("Error during dynamic import:", error);
  });