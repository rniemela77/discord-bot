const express = require("express");
// const mongodb = require("mongodb");

const router = express.Router();

// Get Tasks
router.get("/", async (req, res) => {
  console.log("GETTING TASKS");
  //   const tasks = await loadTasksCollection();

  const taskList = [
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
  //   res.send(await tasks.find({}).toArray());
  res.send(taskList);
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
