import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignupView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/newtask",
      name: "newtask",
      component: () => import("../views/NewTaskView.vue"),
    },
    // {
    //   path: "/item/:id",
    //   name: "item",
    //   component: () => import("../views/ItemView.vue"),
    // },
  ],
});

export default router;
