<script setup>
import LoginPage from "./components/login/LoginPage.vue";
import TaskPage from "./components/task/TaskPage.vue";

import { useUserStore } from "./stores/user";
const userStore = useUserStore();
</script>

<template>
  <main>
    <span v-if="userStore.isLoggedIn">Welcome {{ userStore.username }}.</span>

    <LoginPage v-if="!userStore.isLoggedIn" />

    <TaskPage v-else />
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
