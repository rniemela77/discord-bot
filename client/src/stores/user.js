import { defineStore } from "pinia";

import axios from "axios";

const url = "/api/users";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: "",
    isLoggedIn: false,
    allUsers: [],
  }),
  actions: {
    login(user) {
      axios.post(url, user).then((res) => {
        if (res.status === 200) {
          this.isLoggedIn = true;
          this.username = user.username;
        }
      });
    },
    getAllUsers() {
      axios.get(url).then((res) => {
        this.allUsers = res.data;
      });
    },
  },
});
