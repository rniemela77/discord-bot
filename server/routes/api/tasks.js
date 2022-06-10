const express = require("express");
const router = express.Router();
const axios = require("axios");

let taskList = [
  {
    name: "first task",
    description: "this is the first task",
    date: "2020-01-01",
    time: "12:00",
  },
  {
    name: "second task",
    description: "this is the second task",
    date: "2020-01-01",
    time: "12:00",
  },
  {
    name: "third task",
    description: "this is the third task",
    date: "2020-01-01",
    time: "12:00",
  },
  {
    name: "fourt task",
    description: "this is the fourt task",
    date: "2020-01-01",
    time: "12:00",
  },
];

// Get Tasks
router.get("/", async (req, res) => {
  console.log("(server) retrieving from database");
  res.send(taskList);
});

// Add Task
router.post("/", async (req, res) => {
  const task = {
    name: req.body.name.trim(),
    description: req.body.description.trim(),
    date: req.body.date,
    time: req.body.time,
  };

  if (!task.name || !task.description) {
    return res.status(400).send("Invalid task. Missing name or description.");
  }

  taskList.push(task);

  // Send message to discord channel saying task was created
  const url = process.env.DISCORD_WEBHOOK_URL;
  axios.post(url, {
    content: `Task added: ${task.name} - ${task.description} @ ${task.date} - ${task.time}`,
  });

  res.status(201).send();
  console.log("(server) added to database");
});

module.exports = router;
