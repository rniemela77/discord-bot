const express = require("express");
const router = express.Router();

const userlist = require("../../../database/users.js");

// Log in
router.post("/", async (req, res) => {
  const user = {
    username: req.body.username.trim(),
    password: req.body.password.trim(),
  };

  if (!user.username || !user.password) {
    return res.status(400).send("Invalid user. Missing username or password");
  }

  const userExists = userlist.users.find((u) => u.username === user.username);
  if (!userExists) {
    return res.status(400).send("Username or password incorrect");
  }

  if (user.password !== userExists.password) {
    return res.status(400).send("Username or password incorrect");
  }
  console.log("successfully logged in");
  res.status(200).send(userExists);
});

// Update user information
router.put("/:username", async (req, res) => {
  const user = {
    username: req.params.username.trim(),
    password: req.body.password.trim(),
    firstName: req.body.firstName.trim(),
    discordUserId: req.body.discordUserId.trim(),
    wakeTime: req.body.wakeTime.trim(),
    sleepTime: req.body.sleepTime.trim(),
  };

  if (!user.username || !user.password) {
    return res.status(400).send("Invalid user. Missing username or password");
  }

  const userExists = userlist.users.find((u) => u.username === user.username);
  if (!userExists) {
    return res.status(400).send("Username or password incorrect");
  }

  if (user.password !== userExists.password) {
    return res.status(400).send("Username or password incorrect");
  }

  userExists.firstName = user.firstName;
  userExists.discordUserId = user.discordUserId;
  userExists.wakeTime = user.wakeTime;
  userExists.sleepTime = user.sleepTime;

  res.status(200).send(userExists);
  console.log("updated user info");
});

// Get all users
router.get("/", async (req, res) => {
  const usernames = userlist.users.map((u) => u.username);
  res.send(usernames);
});

module.exports = router;
