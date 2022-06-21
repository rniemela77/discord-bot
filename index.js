// Allow dev environment to use different variables (port, keys, etc.)
require("dotenv").config();

// initialize server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve `plan.js` file on route '/api/plan'
const plan = require("./server/routes/api/plans");
app.use("/api/plans", plan);

// Serve `users.js` file on route '/api/users'
const users = require("./server/routes/api/users");
app.use("/api/users", users);

// Serve `signup.js` file on route '/api/sign-up'
const signup = require("./server/routes/api/signup");
app.use("/api/sign-up", signup);

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

// Check if plans are due
require("./server/utilities/plans.js");
