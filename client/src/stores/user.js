import { defineStore } from "pinia";
import axios from "axios";

const url = "/api/users";
const signupUrl = "/api/sign-up";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: "",
    allUsers: [],
  }),
  actions: {
    signup(info) {
      return axios
        .post(signupUrl, info)
        .then((res) => {
          if (res.status !== 201) {
            throw new Error(
              "Received a response with status code other than 200"
            );
          }
        })
        .catch((err) => {
          if (err.response) {
            throw new Error(err.response.data);
          } else {
            throw new Error(err.message);
          }
        });
    },
    login(user) {
      return axios
        .post(url, user)
        .then((res) => {
          if (res.status === 200) {
            this.username = user.username;
          } else {
            throw new Error(
              "Received a response with status code other than 200"
            );
          }
        })
        .catch((err) => {
          if (err.response) {
            throw new Error(err.response.data);
          } else {
            throw new Error(err.message);
          }
        });
    },
    logout() {
      this.username = "";
    },
    getAllUsers() {
      return axios
        .get(url)
        .then((res) => {
          this.allUsers = res.data;
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
