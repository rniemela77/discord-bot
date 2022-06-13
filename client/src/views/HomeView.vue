<script setup>
import LoginForm from "../components/login/LoginForm.vue";
import TaskList from "../components/task/TaskList.vue";

import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>

<template>
  <div v-if="!userStore.isLoggedIn">
    <h1>Login</h1>
    <LoginForm />
  </div>

  <div v-else>
    <h1>Task List</h1>
    <button @click="userStore.logout()">Logout</button>
    <TaskList />
  </div>
</template>
