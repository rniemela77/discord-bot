const express = require("express");
const router = express.Router();

let taskList = [
  {
    task1: "hello",
  },
  {
    task2: "tkasks",
  },
  {
    task3: "dfssdf",
  },
  {
    task4: "sdfsdf",
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
