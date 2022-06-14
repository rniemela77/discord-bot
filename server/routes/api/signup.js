const express = require("express");
const router = express.Router();

const userlist = require("../../../database/users.js");

// Sign Up
router.post("/", async (req, res) => {
  const user = {
    username: req.body.username.trim(),
    password: req.body.password.trim(),
  };

  if (!user.username || !user.password) {
    return res.status(400).send("Missing username or password.");
  }

  const userExists = userlist.users.find((u) => u.username === user.username);
  if (userExists) {
    return res.status(400).send("User already exists.");
  }

  userlist.users.push(user);

  res.status(201).send();
});

module.exports = router;
