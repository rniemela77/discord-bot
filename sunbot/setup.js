const Discord = require("discord.js");

const botToken =
  "OTgyMzkwNTg2MDg4Nzc1NzMx.GGYjUG.z_J3bSa1cY_dIGbH4p7_1Utb6sJez-fLpbhMsE";

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
  ],
  partials: ["CHANNEL"],
});

const prefix = "!";

const commands = require("./commands.js")(client, prefix);

client.login(botToken);

console.log("bot setup finished");
