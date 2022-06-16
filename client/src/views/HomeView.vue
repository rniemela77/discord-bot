<script setup>
import TaskList from "@/components/task/TaskList.vue";

import { useUserStore } from "@/stores/user";
import router from "@/router";

const userStore = useUserStore();

const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<template>
  <div>
    <h1>Task List</h1>

    <button @click="logout">Logout</button>

    <TaskList />
  </div>
</template>
