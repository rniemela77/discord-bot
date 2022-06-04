<script setup>
import { ref, onMounted } from "vue";
import TaskService from "./TaskService";
const tasks = ref([]);

onMounted(async () => {
  setInterval(async () => {
    try {
      tasks.value = await TaskService.getTasks();
      console.log(tasks.value);
    } catch (err) {
      err.value = err.message;
    }
  }, 5000);
});
</script>

<template>
  <h1>Vue frontend</h1>
  <p v-for="task in tasks" :key="task">{{ task }}</p>
</template>

<style>
@import "./assets/base.css";
</style>
