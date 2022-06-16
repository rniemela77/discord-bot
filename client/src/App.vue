<script setup>
import router from "@/router";
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

router.beforeEach(async (to, from) => {
  if (
    !userStore.username &&
    to.name !== "login" &&
    to.name !== "signup" &&
    to.name !== "about"
  ) {
    // redirect the user to the login page
    return { name: "login" };
  }
});
</script>

<template>
  <main>
    <header>
      <RouterLink to="/">Tasks</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </header>

    <RouterView />
  </main>
</template>

<style>
@import "./assets/base.css";
main {
  padding: 4rem;
  background: #ffffffb9;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
</style>
