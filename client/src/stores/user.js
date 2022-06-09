import { defineStore } from "pinia";

import * as UserService from "@/UserService";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: "",
    isLoggedIn: false,
  }),
  actions: {
    login(user) {
      return UserService.login(user).then((response) => {
        if (response.status === 200) {
          this.isLoggedIn = true;
          this.username = user.username;
        }
      });
    },
    logout: ({ state }) => {
      state.username = "";
      state.isLoggedIn = false;
    },
  },
});
