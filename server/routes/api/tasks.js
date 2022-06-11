const express = require("express");
const router = express.Router();
const axios = require("axios");

const taskList = require("../../tasks/db.js");

// Get Tasks
router.get("/", async (req, res) => {
  res.send(taskList.data);
});

// Add Task
router.post("/", async (req, res) => {
  const task = {
    name: req.body.name.trim(),
    description: req.body.description.trim(),
    date: req.body.date,
    time: req.body.time,
    taskCreator: req.body.taskCreator,
    completed: false,
  };

  if (!task.name || !task.description) {
    return res.status(400).send("Invalid task. Missing name or description.");
  }

  taskList.data.push(task);

  // Send message to discord channel saying task was created
  const url = process.env.DISCORD_WEBHOOK_URL;
  axios.post(url, {
    content: `Task added: ${task.name} - ${task.description} @ ${task.date} - ${task.time} - ${task.taskCreator}`,
  });

  res.status(201).send();
});

module.exports = router;
