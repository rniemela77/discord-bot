import { defineStore } from "pinia";
import axios from "axios";

const url = "/api/users";
const signupUrl = "/api/sign-up";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: "",
    password: "",
    firstName: "",
    discordUserId: "",
    wakeTime: "",
    sleepTime: "",
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
    updateUser() {
      const updatedUser = {
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        discordUserId: this.discordUserId,
        wakeTime: this.wakeTime,
        sleepTime: this.sleepTime,
      };
      return axios
        .put(`${url}/${updatedUser.username}`, updatedUser)
        .then((res) => {
          this.username = res.data.username;
          this.password = res.data.password;
          this.discordUserId = res.data.discordUserId;
          this.wakeTime = res.data.wakeTime;
          this.sleepTime = res.data.sleepTime;
          this.firstName = res.data.firstName;
        })
        .catch((err) => {
          if (err.response) {
            throw new Error(err.response.data);
          }
          throw new Error(err.message);
        });
    },
    login(user) {
      return axios
        .post(url, user)
        .then((res) => {
          this.username = res.data.username;
          this.password = res.data.password;
          this.discordUserId = res.data.discordUserId;
          this.wakeTime = res.data.wakeTime;
          this.sleepTime = res.data.sleepTime;
          this.firstName = res.data.firstName;
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
      this.password = "";
      this.firstName = "";
      this.discordUserId = "";
      this.wakeTime = "";
      this.sleepTime = "";
      this.allUsers = [];
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
