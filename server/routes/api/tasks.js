const express = require("express");
const router = express.Router();
const discordWebhook = require("../../discord/webhook");
const { getDiscordIdFromUsername } = require("../../utilities/users");
const { messageUser } = require("../../discord/functions.js");

const taskList = require("../../../database/tasks.js");
const { notifyWatchers } = require("../../utilities/tasks");

// Get all tasks
router.get("/", async (req, res) => {
  const tasks = taskList.todo;
  if (!tasks || tasks.length === 0) {
    res.status(500).send("There was an error getting the tasks.");
  } else {
    res.status(200).send(tasks);
  }
});

// Get Tasks by username
router.get("/:username", (req, res) => {
  const userTasks = taskList.todo.filter((task) => {
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
  const userTasks = taskList.todo.filter((task) => {
    return task.watchedBy.includes(req.params.username);
  });

  if (userTasks.length === 0) {
    res.status(200).send([]);
  } else {
    res.status(200).send(userTasks);
  }
});

// Set task status
router.post("/complete/:id", (req, res) => {
  const taskId = req.params.id;
  const taskStatus = req.body;

  // Get task by id
  const task = taskList.todo.find((task) => task.id.toString() === taskId);

  if (!task) return res.status(404).send("Task not found");

  taskList.todo.splice(taskList.todo.indexOf(task), 1);

  // add the task to the due list with the added status
  task.status = taskStatus.status;
  taskList.due.push(task);

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
    status: null,
  };

  if (!task.name || !task.description) {
    return res.status(400).send("Invalid task. Missing name or description.");
  } else if (!task.date || !task.time) {
    return res.status(400).send("Invalid task. Missing date or time.");
  } else if (!task.createdBy) {
    return res.status(400).send("Invalid task. Missing createdBy.");
  }

  taskList.todo.push(task);
  taskList.id += 1;
  res.status(201).send("Task added successfully");

  // Message all watchers
  await Promise.all(
    task.watchedBy.map(async (username) => {
      const discordId = getDiscordIdFromUsername(username);

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
    taskList.todo = taskList.todo.filter((task) => task.id.toString() !== id);

    res.status(200).send("Task deleted");
  },
  (err) => {
    console.log(err);
  }
);

module.exports = router;
