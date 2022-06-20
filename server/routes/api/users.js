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

  res.status(200).send();
});

// Get all users
router.get("/", async (req, res) => {
  const usernames = userlist.users.map((u) => u.username);
  res.send(usernames);
});

module.exports = router;
