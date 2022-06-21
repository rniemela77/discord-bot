import { defineStore } from "pinia";
import axios from "axios";

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
      return axios
        .get(`${url}?user=${username}`)
        .then((res) => {
          this.all = res.data.plans;
          this.watching = res.data.watching;
          this.today = res.data.today;
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
