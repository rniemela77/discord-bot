<script setup>
import TaskList from "@/components/task/TaskList.vue";

import { onMounted } from "vue";
import router from "@/router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

onMounted(() => {
  if (userStore.username) {
    router.push("/");
  } else {
    router.push("/login");
  }
});
</script>

<template>
  <div>
    <h1>Task List</h1>

    <button @click="userStore.logout()">Logout</button>

    <TaskList />
  </div>
</template>
