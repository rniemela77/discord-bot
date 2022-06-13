const express = require("express");
const router = express.Router();
const discordWebhook = require("../../discord/webhook");

const taskList = require("../../tasks/db.js");

// Get Tasks by username
router.get("/:username", (req, res) => {
  const userTasks = taskList.data.filter((task) => {
    return task.createdBy === req.params.username;
  });

  res.send(userTasks);
});

// Get tasks watched by username
router.get("/watchedBy/:username", (req, res) => {
  const userTasks = taskList.data.filter((task) => {
    return task.watchedBy.includes(req.params.username);
  });

  res.send(userTasks);
});

router.put("/:id/complete", (req, res) => {
  const id = req.params.id;
  const task = taskList.data.find((task) => task.id.toString() === id);
  if (!task) {
    return res.status(400).send("Task does not exist.");
  }
  task.completed = true;
  res.send(task);
});

// Add Task
router.post("/", (req, res) => {
  const task = {
    id: taskList.id + 1,
    name: req.body.name.trim(),
    description: req.body.description.trim(),
    date: req.body.date,
    time: req.body.time,
    createdBy: req.body.createdBy,
    watchedBy: req.body.watchedBy,
    completed: false,
  };

  if (!task.name || !task.description) {
    return res.status(400).send("Invalid task. Missing name or description.");
  }

  taskList.data.push(task);

  discordWebhook.taskAdded(task);

  res.status(201).send();
  taskList.id += 1;
});

router.delete(
  "/:id",
  (req, res) => {
    const id = req.params.id;
    taskList.data = taskList.data.filter((task) => task.id.toString() !== id);
    res.status(200).send();
  },
  (err) => {
    console.log(err);
  }
);

module.exports = router;
