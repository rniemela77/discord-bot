console.log("starting index.js");
const express = require("express");
const app = express();

const path = require("path");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/server/public/index.html"));
});

console.log("index.js finished");

if (process.env.NODE_ENV === "production") {
  console.log("App started in production mode");

  // Static folder
  app.use(express.static(__dirname + "/server/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) =>
    res.sendFile(__dirname + "/server/public/index.html")
  );
}

const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("Node app is working! port: " + port);
});

// console.log("BOT_TOKEN: " + process.env.BOT_TOKEN);

console.log("starting sunbot/index.js");
const discordbot = require("./sunbot/setup.js");
console.log("sunbot/index.js finished");

// Handle production

// const accountSid = "AC59e92976399298f4bb18dfd3c09bce3d";
// const authToken = "96631abdcf3e223bf00979e202cfc410";
// const tclient = require("twilio")(accountSid, authToken);

// let textQueue = [];

// setInterval(function () {
//   const d = new Date();
//   const dm = d.getMinutes();
//   console.log(
//     "setInterval(). it is now " +
//       dm +
//       " and there are " +
//       textQueue.length +
//       " items in the queue"
//   );

//   textQueue.forEach((x) => {
//     if (parseInt(x.time) === dm) {
//       console.log("sending text: ", x.msg);
//       sendMessage(x);
//     }
//   });
// }, 5000);

// const sendMessage = (myObj) => {
//   tclient.messages
//     .create({
//       body: myObj.msg,
//       messagingServiceSid: "MGdf5eb222567a2d53461aefcdac1d2fc8",
//       to: myObj.phoneNumber,
//     })
//     .then((message) => console.log(message.sid))
//     .done();
// };
