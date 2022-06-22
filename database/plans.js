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
      { id: 0, name: "eat", times: ["Morning"], completed: false },
      { id: 1, name: "exercise", times: ["Afternoon"], completed: false },
    ],
    reminders: [{ id: 0, name: "eat", time: "19:26", sent: false }],
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
      { id: 0, name: "task A", times: ["Morning"], completed: false },
      { id: 1, name: "task B", times: ["Afternoon"], completed: false },
    ],
    reminders: [],
    // reminders: [{ id: 0, name: "eat", time: "19:27", sent: false }],
    conclusion: "",
  },
];

// Finished tasks
exports.done = [];
