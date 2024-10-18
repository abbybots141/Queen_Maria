const fs = require("fs");
const fetch = require("node-fetch");
const { smd, TelegraPh } = require("../lib");
const Config = require("../config");

// Command 1: aesthetic
smd(
  {
    pattern: "aesthetic",
    category: "wallpaper",
    filename: __filename,
    desc: "Get an aesthetic wallpaper.",
  },
  async (m) => {
    try {
      let apiUrl = "https://api.maher-zubair.tech/wallpaper/asthetic";
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request could not be processed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: aesthetic",
        error,
        "*_No response from API, Sorry!!_*"
      );
    }
  }
);

// Command 2: bike
smd(
  {
    pattern: "bike",
    category: "wallpaper",
    filename: __filename,
    desc: "Get a bike wallpaper.",
  },
  async (m) => {
    try {
      let apiUrl = "https://api.maher-zubair.tech/wallpaper/bike";
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request could not be processed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: bike",
        error,
        "*_No response from API, Sorry!!_*"
      );
    }
  }
);

// Command 3: cr7
smd(
  {
    pattern: "cr7",
    category: "wallpaper",
    filename: __filename,
    desc: "Get a CR7 (Cristiano Ronaldo) wallpaper.",
  },
  async (m) => {
    try {
      let apiUrl = "https://api.maher-zubair.tech/wallpaper/cr7";
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request could not be processed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: cr7",
        error,
        "*_No response from API, Sorry!!_*"
      );
    }
  }
);

// Command 4: cat
smd(
  {
    pattern: "cat",
    category: "wallpaper",
    filename: __filename,
    desc: "Get a cat wallpaper.",
  },
  async (m) => {
    try {
      let apiUrl = "https://api.maher-zubair.tech/wallpaper/cat";
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request could not be processed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: cat",
        error,
        "*_No response from API, Sorry!!_*"
      );
    }
  }
);

// Command 5: dog
smd(
  {
    pattern: "dog",
    category: "wallpaper",
    filename: __filename,
    desc: "Get a dog wallpaper.",
  },
  async (m) => {
    try {
      let apiUrl = "https://api.maher-zubair.tech/wallpaper/dog";
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request could not be processed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: dog",
        error,
        "*_No response from API, Sorry!!_*"
      );
    }
  }
);

// Command 6: messi
smd(
  {
    pattern: "messi",
    category: "wallpaper",
    filename: __filename,
    desc: "Get a Lionel Messi wallpaper.",
  },
  async (m) => {
    try {
      let apiUrl = "https://api.maher-zubair.tech/wallpaper/messi";
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request could not be processed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: messi",
        error,
        "*_No response from API, Sorry!!_*"
      );
    }
  }
);

// Command 7: mlegend
smd(
  {
    pattern: "mlegend",
    category: "wallpaper",
    filename: __filename,
    desc: "Get a Mobile Legends wallpaper.",
  },
  async (m) => {
    try {
      let apiUrl = "https://api.maher-zubair.tech/wallpaper/mlegend";
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request could not be processed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: mlegend",
        error,
        "*_No response from API, Sorry!!_*"
      );
    }
  }
);

// Command 8: pubg
smd(
  {
    pattern: "pubg",
    category: "wallpaper",
    filename: __filename,
    desc: "Get a PUBG wallpaper.",
  },
  async (m) => {
    try {
      let apiUrl = "https://api.maher-zubair.tech/wallpaper/pubg";
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request could not be processed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: pubg",
        error,
        "*_No response from API, Sorry!!_*"
      );
    }
  }
);

// Command 9: random
smd(
  {
    pattern: "random",
    category: "wallpaper",
    filename: __filename,
    desc: "Get a random wallpaper.",
  },
  async (m) => {
    try {
      let apiUrl = "https://api.maher-zubair.tech/wallpaper/random";
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request could not be processed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: random",
        error,
        "*_No response from API, Sorry!!_*"
      );
    }
  }
);

// Command 10: car
smd(
  {
    pattern: "car",
    category: "wallpaper",
    filename: __filename,
    desc: "Get a car wallpaper.",
  },
  async (m) => {
    try {
      let apiUrl = "https://api.maher-zubair.tech/wallpaper/car";
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request could not be processed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: car",
        error,
        "*_No response from API, Sorry!!_*"
      );
    }
  }
);

// Command 11: blackpink
smd(
  {
    pattern: "blackpink",
    category: "wallpaper",
    filename: __filename,
    desc: "Get a Blackpink wallpaper.",
  },
  async (m) => {
    try {
      let apiUrl = "https://api.maher-zubair.tech/wallpaper/blackpink";
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        await m.send