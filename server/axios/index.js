const axios = require("axios");

const production = "https://supporting.herokuapp.com";
const development = "http://localhost:" + process.env.PORT;

const BASE_URL =
  process.env.NODE_ENV === "production" ? production : development;

const API_URL = `${BASE_URL}/api/tasks`;

// Fetch all tasks
const getTasks = async () => {
  console.log("endpoints.js: Getting tasks");

  return await axios
    .get(API_URL)
    .then((response) => {
      let tasks = "";
      // convert array of objects into single string
      response.data.forEach((a) => {
        for (let key in a) {
          tasks += `[${key}: ${a[key]}]`;
        }
      });

      return tasks;
    })
    .catch((error) => {
      console.log(error);
      return "There was an error getting the tasks.";
    });
};

// Add a task
const addTask = async (task) => {
  console.log("endpoints.js: Posting task");

  return await axios.post(API_URL, task).then(
    (res) => {
      return true;
    },
    (error) => {
      console.log(error);
      return false;
    }
  );
};

exports.getTasks = getTasks;
exports.addTask = addTask;
