<script setup>
import { onMounted } from "vue";
import router from "@/router";
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
import { usePlanStore } from "@/stores/plans";

const userStore = useUserStore();
const planStore = usePlanStore();

// eslint-disable-next-line no-unused-vars
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

// When app mounts, get all plans for the user
onMounted(async () => {
  await planStore.getAllPlansForUser(userStore.username).catch((err) => {
    console.error(err);
  });
  await userStore.getAllUsers().catch((err) => {
    console.error(err);
  });
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
