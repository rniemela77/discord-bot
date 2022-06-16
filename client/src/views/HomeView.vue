<script setup>
import TaskList from "@/components/task/TaskList.vue";

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <div>
    <h1>Task List</h1>

    <button @click="userStore.logout()">Logout</button>

    <TaskList />
  </div>
</template>
