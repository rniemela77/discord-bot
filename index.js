// const accountSid = "AC83e51571ec4ec2d94be2c59f52ae86bc"; // Your Account SID from www.twilio.com/console
// const authToken = "18a5f0dff22c276ac896cabc9cbb839b"; // Your Auth Token from www.twilio.com/console

const accountSid = "AC59e92976399298f4bb18dfd3c09bce3d";
const authToken = "96631abdcf3e223bf00979e202cfc410";
const tclient = require("twilio")(accountSid, authToken);

const Discord = require("discord.js");
const config = require("./config.json");

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

let textQueue = [];

client.on("messageCreate", function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "textme") {
    const phoneNumber = args[0];
    const atMinute = args[1];
    const withMsg = args[2];

    message.reply(
      `I will text ${phoneNumber} "${withMsg}" at ${atMinute} minutes.`
    );

    textQueue.push({
      phoneNumber: `+1${phoneNumber}`,
      time: atMinute,
      msg: withMsg,
    });
  }

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (command === "sum") {
    const numArgs = args.map((x) => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => (counter += x));
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  }
});

client.login(config.BOT_TOKEN);

setInterval(function () {
  const d = new Date();
  const dm = d.getMinutes();
  console.log(
    "setInterval(). it is now " +
      dm +
      " and there are " +
      textQueue.length +
      " items in the queue"
  );

  textQueue.forEach((x) => {
    if (parseInt(x.time) === dm) {
      console.log("sending text: ", x.msg);
      sendMessage(x);
    }
  });
}, 5000);

const sendMessage = (myObj) => {
  tclient.messages
    .create({
      body: myObj.msg,
      messagingServiceSid: "MGdf5eb222567a2d53461aefcdac1d2fc8",
      to: myObj.phoneNumber,
    })
    .then((message) => console.log(message.sid))
    .done();
};
