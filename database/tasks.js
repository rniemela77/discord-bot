exports.id = 4;

// Unfinished tasks
exports.todo = [
  {
    id: 1,
    name: "first task",
    description: "this task isbeing watched by rob",
    date: "2022-06-15",
    time: "22:19",
    createdBy: "admin",
    watchedBy: ["rob", "joe"],
    status: null,
  },
  {
    id: 2,
    name: "second task",
    description: "this task is being watched by admin",
    date: "2020-01-01",
    time: "12:00",
    createdBy: "admin",
    watchedBy: ["joe"],
    status: null,
  },
  {
    id: 3,
    name: "third task",
    description: "this is the third task",
    date: "2020-01-01",
    time: "12:00",
    createdBy: "admin",
    watchedBy: ["joe", "jane"],
    status: null,
  },
];

// Tasks awaiting completion
exports.due = [
  // {
  //   id: 4,
  //   name: "meal prep",
  //   description: "cook chicken and veggies",
  //   date: "2020-01-01",
  //   time: "12:00",
  //   createdBy: "rob",
  //   watchedBy: ["admin"],
  //   status: "cooking completed! delicious.",
  // },
];

// Finished tasks
exports.done = [];
