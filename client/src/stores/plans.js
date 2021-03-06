import { defineStore } from "pinia";
import axios from "axios";
import { getCurrentDate } from "@/utils/index.js";
import { useUserStore } from "@/stores/user.js";

const url = "/api/plans";

export const usePlanStore = defineStore({
  id: "plan",
  state: () => ({
    all: [],
    watching: [],
    today: {},
  }),
  actions: {
    clearPlans() {
      this.all = [];
      this.watching = [];
      this.today = {};
    },
    getAllPlansForUser(username) {
      const userStore = useUserStore();

      return axios
        .get(`${url}?user=${username}`)
        .then((res) => {
          this.all = res.data;
          this.watching = res.data.filter((plan) =>
            plan.watchers.find((watcher) => watcher.name === userStore.username)
          );
          this.today = res.data.find(
            (plan) =>
              plan.dueDate === getCurrentDate() &&
              plan.createdBy === userStore.username
          );
        })
        .catch((err) => {
          if (err.response) {
            throw new Error(err.response.data);
          } else {
            throw new Error(err.message);
          }
        });
    },
    savePlan(plan) {
      return axios
        .post(url, plan)
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
    setTaskCompleted(planId, taskId, isCompleted) {
      return axios
        .put(`${url}/${planId}`, { taskId: taskId, isCompleted: isCompleted })
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
    setWatcherMessage(planId, supportMessage) {
      return axios
        .put(`${url}/${planId}/setwatchermessage`, {
          name: supportMessage.name,
          message: supportMessage.message,
        })
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
    // confirmWatcher(planId, confirmation) {
    //   return axios
    //     .post(`${url}/confirm/${planId}`, { confirmation })
    //     .then((res) => {
    //       return res.data;
    //     })
    //     .catch((err) => {
    //       if (err.response) {
    //         throw new Error(err.response.data);
    //       }
    //       throw new Error(err.message);
    //     });
    // },
    // completePlan(id, conclusion) {
    //   return axios
    //     .post(`${url}/complete/${id}`, { text: conclusion })
    //     .then((res) => {
    //       return res.data;
    //     })
    //     .catch((err) => {
    //       if (err.response) {
    //         throw new Error(err.response.data);
    //       } else {
    //         throw new Error(err.message);
    //       }
    //     });
    // },
    // deletePlan(id) {
    //   return axios
    //     .delete(`${url}/${id}`)
    //     .then((response) => {
    //       return response;
    //     })
    //     .catch((err) => {
    //       if (err.response) {
    //         throw new Error(err.response.data);
    //       } else {
    //         throw new Error(err.message);
    //       }
    //     });
    // },
  },
});
