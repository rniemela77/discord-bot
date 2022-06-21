exports.id = {
  number: 3,
};

// All Plans
exports.plans = [
  {
    id: 1,
    createdAtDate: "2022-06-21",
    createdAtTime: "14:00",
    dueDate: "2022-06-21",
    dueTime: "22:19",
    createdBy: "admin",
    watchedBy: ["rob"],
    tasks: [
      { name: "eat", times: ["Morning"], completed: false },
      { name: "exercise", times: ["Afternoon"], completed: false },
    ],
    conclusion: "",
  },
  {
    id: 2,
    createdAtDate: "2022-06-21",
    createdAtTime: "15:00",
    dueDate: "2022-06-21",
    dueTime: "22:19",
    createdBy: "rob",
    watchedBy: ["admin"],
    tasks: [
      { name: "task A", times: ["Morning"], completed: false },
      { name: "task B", times: ["Afternoon"], completed: false },
    ],
    conclusion: "",
  },
];

// Finished tasks
exports.done = [];
