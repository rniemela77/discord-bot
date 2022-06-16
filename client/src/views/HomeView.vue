<script setup>
import LoginForm from "@/components/login/LoginForm.vue";
import TaskList from "@/components/task/TaskList.vue";

import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>

<template>
  <div v-if="!userStore.username">
    <h1>Login</h1>
    <LoginForm />
    <div class="center">
      <p>or</p>
      <RouterLink to="/signup">Sign Up</RouterLink>
    </div>
  </div>

  <div v-else>
    <h1>Task List</h1>
    <button @click="userStore.logout()">Logout</button>
    <TaskList />
  </div>
</template>

<style scoped>
.center {
  text-align: center;
}
.center p {
  margin: 0.5rem;
}
.center a {
  padding: 0.5rem;
}
.center a:hover {
  background: #fafafa;
}
</style>
