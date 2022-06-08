const express = require("express");
const router = express.Router();

let taskList = [
  {
    name: "first task",
    description: "this is the first task",
  },
  {
    name: "second task",
    description: "this is the second task",
  },
  {
    name: "third task",
    description: "this is the third task",
  },
  {
    name: "fourt task",
    description: "this is the fourt task",
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
  };

  if (!task.name || !task.description) {
    return res.status(400).send("Invalid task. Missing name or description.");
  }

  console.log("(server) added to database");
  taskList.push(task);
  res.status(201).send();
});

module.exports = router;
