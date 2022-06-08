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
  console.log("Express: Getting tasks");
  res.send(taskList);
});

// Add Task
router.post("/", async (req, res) => {
  console.log("Express: Posting task");
  taskList.push(req.body);
  res.status(201).send();
});

module.exports = router;
