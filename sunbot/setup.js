const Discord = require("discord.js");

const botToken = process.env.BOT_TOKEN;

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
