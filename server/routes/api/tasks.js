const express = require("express");
const router = express.Router();
const discordWebhook = require("../../discord/webhook");

const taskList = require("../../../database/tasks.js");

// Get all tasks
router.get("/", async (req, res) => {
  const tasks = taskList.data;
  if (!tasks || tasks.length === 0) {
    res.status(500).send("There was an error getting the tasks.");
  } else {
    res.status(200).send(tasks);
  }
});

// Get Tasks by username
router.get("/:username", (req, res) => {
  const userTasks = taskList.data.filter((task) => {
    return task.createdBy === req.params.username;
  });

  if (userTasks.length === 0) {
    res.status(200).send([]);
  } else {
    res.status(200).send(userTasks);
  }
});

// Get tasks watched by username
router.get("/watchedBy/:username", (req, res) => {
  const userTasks = taskList.data.filter((task) => {
    return task.watchedBy.includes(req.params.username);
  });

  if (userTasks.length === 0) {
    res.status(200).send([]);
  } else {
    res.status(200).send(userTasks);
  }
});

router.put("/:id/complete", (req, res) => {
  const id = req.params.id;
  const task = taskList.data.find((task) => task.id.toString() === id);
  if (!task) {
    res.status(404).send("Task not found");
  } else {
    task.completed = true;
    res.status(200).send("Task completed");
  }
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
  } else if (!task.date || !task.time) {
    return res.status(400).send("Invalid task. Missing date or time.");
  } else if (!task.createdBy) {
    return res
      .status(400)
      .send("Invalid task. Missing createdBy or watchedBy.");
  }

  taskList.data.push(task);

  discordWebhook.taskAdded(task);

  res.status(201).send("Task added successfully");
  taskList.id += 1;
});

router.delete(
  "/:id",
  (req, res) => {
    const id = req.params.id;
    taskList.data = taskList.data.filter((task) => task.id.toString() !== id);

    res.status(200).send("Task deleted");
  },
  (err) => {
    console.log(err);
  }
);

module.exports = router;
