<script setup>
import { onMounted } from "vue";

import { useUserStore } from "@/stores/user";
import { useTaskStore } from "@/stores/tasks";
const userStore = useUserStore();
const taskStore = useTaskStore();

const getTasks = async () => {
  await taskStore.getTasksByUser(userStore.username);
};
const getWatchedTasks = async () => {
  await taskStore.getWatchedTasks(userStore.username);
};

const deleteTask = async (id) => {
  try {
    await taskStore.deleteTask(id);
    await getTasks();
  } catch (err) {
    err.value = err.message;
  }
};
const completeTask = async (id) => {
  try {
    await taskStore.completeTask(id);
    await getTasks();
  } catch (err) {
    err.value = err.message;
  }
};

onMounted(async () => {
  await getTasks();
  await getWatchedTasks();
});
</script>

<template>
  <h2>Tasks</h2>
  <button @click="getTasks()">Get tasks</button>

  <h3>My tasks</h3>
  <ul>
    <li v-for="task in taskStore.tasks" :key="task">
      <span>{{ task.id }}</span>
      <span>{{ task.name }}</span>
      <span>{{ task.description }}</span>
      <span>--{{ task.completed }}</span>
      <button @click="completeTask(task.id)">Complete</button>
      <button @click="deleteTask(task.id)">x</button>
    </li>
  </ul>

  <h3>Watching tasks</h3>
  <ul>
    <li v-for="task in taskStore.tasksWatching" :key="task">
      <span>{{ task.id }}</span>
      <span>{{ task.name }}</span>
      <span>{{ task.description }}</span>
      <span>--{{ task.completed }}</span>
    </li>
  </ul>
</template>

<style scoped></style>
