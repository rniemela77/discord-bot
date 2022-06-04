console.log("starting index.js");
var express = require("express");
var app = express();
var path = require("path");
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.listen(process.env.PORT || 4000, function () {
  console.log("Node app is working!");
});

console.log("index.js finished");

console.log("starting sunbot/index.js");
var discordbot = require("./sunbot/setup.js");
console.log("sunbot/index.js finished");

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
