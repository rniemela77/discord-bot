const express = require("express");
const router = express.Router();
const axios = require("axios");

const taskList = require("../../tasks/db.js");

// Get Tasks
router.get("/", async (req, res) => {
  res.send(taskList.data);
});

router.put("/:id/complete", async (req, res) => {
  const id = req.params.id;
  const task = taskList.data.find((task) => task.id.toString() === id);
  if (!task) {
    return res.status(400).send("Task does not exist.");
  }
  task.completed = true;
  res.send(task);
});

// Add Task
router.post("/", async (req, res) => {
  const task = {
    id: taskList.id + 1,
    name: req.body.name.trim(),
    description: req.body.description.trim(),
    date: req.body.date,
    time: req.body.time,
    createdBy: req.body.createdBy,
    completed: false,
  };

  if (!task.name || !task.description) {
    return res.status(400).send("Invalid task. Missing name or description.");
  }

  taskList.data.push(task);

  // Send message to discord channel saying task was created
  const url = process.env.DISCORD_WEBHOOK_URL;
  axios.post(url, {
    content: `Task added: ${task.name} - ${task.description} @ ${task.date} - ${task.time} - ${task.createdBy}`,
  });

  res.status(201).send();
  taskList.id += 1;
});

router.delete(
  "/:id",
  async (req, res) => {
    const id = req.params.id;
    taskList.data = taskList.data.filter((task) => task.id.toString() !== id);
    res.status(200).send();
  },
  (err) => {
    console.log(err);
  }
);

module.exports = router;
