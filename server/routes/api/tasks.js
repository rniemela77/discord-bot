const axios = require("axios");
const express = require("express");
// const mongodb = require("mongodb");

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
  console.log("GETTING TASKS");
  //   const tasks = await loadTasksCollection();

  //   res.send(await tasks.find({}).toArray());
  res.send(taskList);
});

// Add Task
router.post("/", async (req, res) => {
  console.log("POSTING TASK");
  await axios.post("/api/tasks", {
    task6: req.body.task1,
  });
  console.log("POSTED");
  res.status(201).send();
});

/*
// Add Post
router.post("/", async (req, res) => {
  const tasks = await loadTasksCollection();

  await tasks.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });

  res.status(201).send();
});

// Delete Post
router.delete("/:id", async (req, res) => {
  const tasks = await loadTasksCollection();

  await tasks.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });

  res.status(200).send();
});

// Connect to the Post collection
async function loadTasksCollection() {
  const user = "rvniemela";
  const pw = "sloppyjoe";
  const str = `mongodb+srv://${user}:${pw}@accountability.kx8t8eq.mongodb.net/?retryWrites=true&w=majority`;
  const client = await mongodb.MongoClient.connect(str, {
    useNewUrlParser: true,
  });

  return client.db("accountability").collection("tasks");
}
*/

module.exports = router;
