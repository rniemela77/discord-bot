exports.id = 4;

// Unfinished tasks
exports.tasks = [
  {
    id: 1,
    name: "first task",
    description: "this task isbeing watched by rob",
    date: "2022-06-15",
    time: "22:19",
    createdBy: "admin",
    notified: false,
    watchedBy: [],
    conclusion: "",
  },
  {
    id: 2,
    name: "second task",
    description: "this task is being watched by admin",
    date: "2020-01-01",
    time: "12:00",
    createdBy: "admin",
    notified: false,
    watchedBy: ["joe"],
    conclusion: "",
  },
  {
    id: 3,
    name: "third task",
    description: "AAAAAAAAAH",
    date: "2022-06-19",
    time: "14:02",
    createdBy: "rob",
    notified: false,
    watchedBy: ["admin"],
    conclusion: "",
  },
  {
    id: 4,
    name: "meal prep",
    description: "cook chicken and veggies",
    date: "2020-01-01",
    time: "12:00",
    createdBy: "rob",
    notified: false,
    watchedBy: ["admin"],
    conclusion: "",
  },
];

// Finished tasks
exports.done = [];
