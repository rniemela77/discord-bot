const axios = require("axios");

const production = "https://supporting.herokuapp.com";
const development = "http://localhost:" + process.env.PORT;

const BASE_URL =
  process.env.NODE_ENV === "production" ? production : development;

const API_URL = `${BASE_URL}/api/plans`;

// Fetch all plans
const getTasks = async () => {
  return await axios
    .get(API_URL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return "There was an error getting the plans.";
    });
};

// Add a plan
const addTask = async (plan) => {
  return await axios.post(API_URL, plan).then(
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
