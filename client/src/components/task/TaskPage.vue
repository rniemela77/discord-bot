<script setup>
import { ref, onMounted } from "vue";

import { useUserStore } from "@/stores/user";
import { useTaskStore } from "@/stores/tasks";
const userStore = useUserStore();
const taskStore = useTaskStore();

// Add a task
const taskName = ref("");
const taskDescription = ref("");
const taskDate = ref("");
const taskTime = ref("");

const getTasks = async () => {
  await taskStore.getTasksByUser(userStore.username);
};
const getWatchedTasks = async () => {
  await taskStore.getWatchedTasks(userStore.username);
};

const addTask = async () => {
  const task = {
    name: taskName.value.trim(),
    description: taskDescription.value.trim(),
    date: taskDate.value,
    time: taskTime.value,
    createdBy: userStore.username,
  };
  console.log(task);

  try {
    await taskStore.addTask(task);
    taskName.value = "";
    taskDescription.value = "";
    await getTasks();
  } catch (err) {
    err.value = err.message;
  }
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
  getTasks();
  getWatchedTasks();
});
</script>

<template>
  <h1>Tasks</h1>
  <form v-on:submit.prevent="addTask">
    <label for="taskName">Task Name</label>
    <input
      type="text"
      id="taskName"
      v-model="taskName"
      placeholder="task name"
      required
    />

    <label for="taskDescription">Task Description</label>
    <input
      type="text"
      id="taskDescription"
      v-model="taskDescription"
      placeholder="task description"
      required
    />

    <label for="taskTime">I will report on the task status at:</label>
    <input type="date" id="taskDate" v-model="taskDate" required />
    <input type="time" id="taskTime" v-model="taskTime" required />

    <button type="submit">Add Task</button>
  </form>
  <button @click="getTasks()">Get tasks</button>

  <h2>My tasks</h2>
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

  <h2>Watching tasks</h2>
  <ul>
    <li v-for="task in taskStore.tasksWatching" :key="task">
      <span>{{ task.id }}</span>
      <span>{{ task.name }}</span>
      <span>{{ task.description }}</span>
      <span>--{{ task.completed }}</span>
    </li>
  </ul>
</template>

<style scoped>
input {
  display: block;
}
</style>
