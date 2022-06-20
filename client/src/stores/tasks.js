import { defineStore } from "pinia";
import axios from "axios";

const url = "/api/tasks";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    allTasks: [],
    tasks: [],
    tasksWatching: [],
  }),
  actions: {
    clearTasks() {
      this.allTasks = [];
      this.tasks = [];
      this.tasksWatching = [];
    },
    getTasksByUser(username) {
      return axios
        .get(`${url}/${username}`)
        .then((response) => {
          this.tasks = response.data;
          this.allTasks = [...this.tasks, ...this.tasksWatching];
        })
        .catch((err) => {
          if (err.response) {
            throw new Error(err.response.data);
          } else {
            throw new Error(err.message);
          }
        });
    },
    getWatchedTasks(username) {
      return axios
        .get(`${url}/watchedBy/${username}`)
        .then((response) => {
          this.tasksWatching = response.data;
          this.allTasks = [...this.tasks, ...this.tasksWatching];
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
