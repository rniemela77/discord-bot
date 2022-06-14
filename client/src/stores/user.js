import { defineStore } from "pinia";

import axios from "axios";

const url = "/api/users";

const signupUrl = "/api/signup";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: "",
    isLoggedIn: false,
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
      axios.post(url, user).then((res) => {
        if (res.status === 200) {
          this.isLoggedIn = true;
          this.username = user.username;
        }
      });
    },
    logout() {
      this.isLoggedIn = false;
      this.username = "";
    },
    getAllUsers() {
      axios.get(url).then((res) => {
        this.allUsers = res.data;
      });
    },
  },
});
