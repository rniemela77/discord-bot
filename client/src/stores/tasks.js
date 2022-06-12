import { defineStore } from "pinia";

import axios from "axios";

const url = "/api/tasks";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: [],
  }),
  actions: {
    getTasksByUser(username) {
      axios.get(`${url}/${username}`).then((response) => {
        this.tasks = response.data;
      });
    },
    completeTask(id) {
      axios.put(`${url}/${id}/complete`).then((res) => {
        if (res.status === 200) {
          this.tasks = this.tasks.map((task) => {
            if (task.id === id) {
              task.completed = true;
            }
            return task;
          });
        } else {
          console.log("Error completing task");
        }
      });
    },
    addTask(task) {
      axios
        .post(url, task)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteTask(id) {
      axios
        .delete(`${url}/${id}`)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
