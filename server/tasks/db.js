exports.id = 4;

exports.data = [
  {
    id: 1,
    name: "first task",
    description: "this task isbeing watched by rob",
    date: "2022-06-10",
    time: "22:19",
    createdBy: "admin",
    completed: false,
    watchedBy: ["rob"],
  },
  {
    id: 2,
    name: "second task",
    description: "this task is being watched by admin",
    date: "2020-01-01",
    time: "12:00",
    createdBy: "rob",
    completed: false,
    watchedBy: ["admin"],
  },
  {
    id: 3,
    name: "third task",
    description: "this is the third task",
    date: "2020-01-01",
    time: "12:00",
    createdBy: "rob",
    completed: false,
    watchedBy: ["joe", "jane", "admin"],
  },
  {
    id: 4,
    name: "fourt task",
    description: "this is the fourt task",
    date: "2022-06-10",
    time: "23:09",
    createdBy: "admin",
    completed: false,
    watchedBy: ["rob", "joe", "jane"],
  },
];
