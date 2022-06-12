import { defineStore } from "pinia";

import axios from "axios";

const url = "/api/tasks";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: [],
  }),
  actions: {
    getTasks() {
      axios.get(url).then((response) => {
        this.tasks = response.data;
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
          console.log(response.data);
          this.tasks = this.tasks.filter((task) => task.id !== id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
