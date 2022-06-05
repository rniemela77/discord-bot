// Allow dev environment to use different variables (port, keys, etc.)
require("dotenv").config();

// initialize server
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve `tasks.js` file on route '/api/tasks'
const tasks = require("./server/routes/api/tasks");
app.use("/api/tasks", tasks);

// Serve static assets if in production
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/server/public/index.html"));
});

// Handle production
if (process.env.NODE_ENV === "production") {
  console.log("App started in production mode");

  // Static folder
  app.use(express.static(__dirname + "/server/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) =>
    res.sendFile(__dirname + "/server/public/index.html")
  );
}

// Start server
const port = process.env.PORT;
app.listen(port, function () {
  console.log("Node app is working! port: " + port);
});

// Initialize bot
require("./sunbot/setup.js");

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
