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
    getTasksByUser(username) {
      return axios
        .get(`${url}/${username}`)
        .then((response) => {
          this.tasks = response.data;
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
        })
        .catch((err) => {
          if (err.response) {
            throw new Error(err.response.data);
          } else {
            throw new Error(err.message);
          }
        });
    },
    completeTask(id, taskStatus) {
      return axios
        .post(`${url}/complete/${id}`, { status: taskStatus })
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
