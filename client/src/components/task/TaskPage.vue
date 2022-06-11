<script setup>
import { ref, onMounted } from "vue";

import * as TaskService from "@/TaskService";

import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

const tasks = ref([]);

// Get tasks
const getTasks = async () => {
  const response = await TaskService.getTasks();
  tasks.value = response;
};

// Add a task
const taskName = ref("");
const taskDescription = ref("");
const taskDate = ref("");
const taskTime = ref("");

const addTask = async () => {
  const task = {
    name: taskName.value.trim(),
    description: taskDescription.value.trim(),
    date: taskDate.value,
    time: taskTime.value,
    taskCreator: userStore.username,
  };

  try {
    await TaskService.addTask(task);
    taskName.value = "";
    taskDescription.value = "";
    getTasks();
  } catch (err) {
    err.value = err.message;
  }
};

onMounted(async () => {
  getTasks();
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
    <button @click="getTasks">Get tasks</button>

    <ul>
      <li v-for="task in tasks" :key="task">
        <span>{{ task.name }}</span>
        <span>{{ task.description }}</span>
        <span>--{{ task.completed }}</span>
      </li>
    </ul>
  </form>
</template>

<style scoped>
input {
  display: block;
}
</style>
