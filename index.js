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

// Server `users.js` file on route '/api/users'
const users = require("./server/routes/api/users");
app.use("/api/users", users);

// Handle production
if (process.env.NODE_ENV === "production") {
  console.log("App started in production mode");

  // Static folder
  app.use(express.static(__dirname + "/server/public/"));

  // Handle SPA frontend
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
require("./server/discord/index.js");

// Automatically check if tasks are due and send a message to the user
require("./server/tasks/deadlineChecker.js");
