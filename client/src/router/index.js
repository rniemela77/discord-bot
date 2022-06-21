import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import ErrorView from "@/views/ErrorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:catchAll(.*)*",
      name: "ErrorView",
      component: ErrorView,
    },
    {
      path: "/sign-up",
      name: "signup",
      component: () => import("@/views/SignupView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/plans/new",
      name: "new-plan",
      component: () => import("@/views/NewPlanView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/plan/:id",
      name: "plan",
      component: () => import("@/views/TaskView.vue"),
    },
  ],
});

export default router;
