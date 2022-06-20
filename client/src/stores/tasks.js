import { defineStore } from "pinia";
import axios from "axios";

const url = "/api/tasks";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: [],
    tasksWatching: [],
  }),
  actions: {
    clearTasks() {
      this.tasks = [];
      this.tasksWatching = [];
    },
    getAllTasksForUser(username) {
      return axios
        .get(`${url}?user=${username}`)
        .then((res) => {
          this.tasks = res.data.userTasks;
          this.tasksWatching = res.data.userWatchingTasks;
        })
        .catch((err) => {
          if (err.response) {
            throw new Error(err.response.data);
          } else {
            throw new Error(err.message);
          }
        });
    },
    completeTask(id, conclusion) {
      return axios
        .post(`${url}/complete/${id}`, { text: conclusion })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          if (err.response) {
            throw new Error(err.response.data);
          } else {
            throw new Error(err.message);
          }
        });
    },
    addTask(task) {
      return axios
        .post(url, task)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          if (err.response) {
            throw new Error(err.response.data);
          } else {
            throw new Error(err.message);
          }
        });
    },
    deleteTask(id) {
      return axios
        .delete(`${url}/${id}`)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          if (err.response) {
            throw new Error(err.response.data);
          } else {
            throw new Error(err.message);
          }
        });
    },
  },
});
