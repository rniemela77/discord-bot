const express = require("express");
const router = express.Router();
const discordWebhook = require("../../discord/webhook");
const { getDiscordIdFromUsername } = require("../../utilities/users");
const { messageUser } = require("../../discord/functions.js");

const taskList = require("../../../database/tasks.js");
const { notifyWatchers } = require("../../utilities/tasks");

// Get all tasks FOR user
router.get("/", async (req, res) => {
  const { user } = req.query;

  // Return tasks created by user, and tasks watched by user
  let tasks = {};
  tasks.userTasks = taskList.tasks.filter((task) => task.createdBy === user);
  tasks.userWatchingTasks = taskList.tasks.filter((task) =>
    task.watchedBy.includes(user)
  );

  if (tasks.userTasks.length === 0 && tasks.userWatchingTasks.length === 0) {
    res.status(500).send("No tasks returned.");
  } else {
    res.status(200).send(tasks);
  }
});

// Get tasks watched by username
router.get("/watchedBy/:username", (req, res) => {
  const tasks = taskList.tasks.filter((task) => {
    return task.watchedBy.includes(req.params.username);
  });

  if (tasks.length < 1) return res.status(200).send([]);

  res.status(200).send(tasks);
});

// Set task status
router.post("/complete/:id", (req, res) => {
  const taskId = req.params.id;
  const conclusion = req.body;

  // Get task by id
  const task = taskList.tasks.find((task) => task.id.toString() === taskId);

  if (!task) return res.status(404).send("Task not found");

  // add the task to the due list with the added status
  task.conclusion = conclusion.text;

  notifyWatchers(task);

  res.status(200).send("Task completed");
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
    watchedBy: req.body.watchedBy,
    conclusion: "",
  };

  if (!task.name || !task.description) {
    return res.status(400).send("Invalid task. Missing name or description.");
  } else if (!task.date || !task.time) {
    return res.status(400).send("Invalid task. Missing date or time.");
  } else if (!task.createdBy) {
    return res.status(400).send("Invalid task. Missing createdBy.");
  }

  taskList.tasks.push(task);
  taskList.id += 1;
  res.status(201).send("Task added successfully");

  // Message all watchers
  await Promise.all(
    task.watchedBy.map(async (username) => {
      const discordId = getDiscordIdFromUsername(username);

      // TODO: write a better message here. provide link to comment on task.
      if (discordId) {
        await messageUser(discordId, "task created");
      }
    })
  );
});

router.delete(
  "/:id",
  (req, res) => {
    const id = req.params.id;
    taskList.tasks = taskList.tasks.filter((task) => task.id.toString() !== id);

    res.status(200).send("Task deleted");
  },
  (err) => {
    console.log(err);
  }
);

module.exports = router;
