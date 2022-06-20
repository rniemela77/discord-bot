import { defineStore } from "pinia";
import axios from "axios";

const url = "/api/tasks";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    todo: [],
    due: [],
    done: [],
    tasksWatching: {
      todo: [],
      due: [],
      done: [],
    },
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
          const allTasks = response.data;

          this.todo = allTasks.todo;
          this.due = allTasks.due;
          this.done = allTasks.done;
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
          const allTasks = response.data;

          this.tasksWatching.todo = allTasks.todo;
          this.tasksWatching.due = allTasks.due;
          this.tasksWatching.done = allTasks.done;
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
