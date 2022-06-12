const express = require("express");
const router = express.Router();
const axios = require("axios");

const users = [
  {
    username: "admin",
    password: "admin",
    firstName: "Admin",
  },
  {
    username: "rob",
    password: "rob",
    firstName: "Rob",
  },
  {
    username: "joe",
    password: "joe",
    firstName: "Joe",
  },
  {
    username: "jane",
    password: "jane",
    firstName: "Jane",
  },
];

// Log in
router.post("/", async (req, res) => {
  const user = {
    username: req.body.username.trim(),
    password: req.body.password.trim(),
  };

  if (!user.username || !user.password) {
    return res.status(400).send("Invalid user. Missing username or password.");
  }

  const userExists = users.find((u) => u.username === user.username);
  if (!userExists) {
    return res.status(400).send("Invalid user. User does not exist.");
  }

  if (user.password !== userExists.password) {
    return res.status(400).send("Invalid user. Wrong password.");
  }

  res.status(200).send();
});

// Get all users
router.get("/", async (req, res) => {
  console.log("Get all users");
  const usernames = users.map((u) => u.username);
  res.send(usernames);
});

module.exports = router;
