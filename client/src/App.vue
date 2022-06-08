<script setup>
import { ref, onMounted } from "vue";
import TaskService from "./TaskService";
const tasks = ref([]);

const getTasks = async () => {
  const response = await TaskService.getTasks();
  tasks.value = response;
};

onMounted(async () => {
  getTasks();
});

const taskName = ref("");
const taskDescription = ref("");

const addTask = async () => {
  const task = {
    name: taskName.value.trim(),
    description: taskDescription.value.trim(),
  };

  try {
    await TaskService.insertTask(task);
    taskName.value = "";
    taskDescription.value = "";
    getTasks();
  } catch (err) {
    err.value = err.message;
  }
};
</script>

<template>
  <h1>Vue frontend</h1>
  <p v-for="task in tasks" :key="task">{{ task }}</p>

  <input type="text" v-model="taskName" placeholder="task name" />
  <input type="text" v-model="taskDescription" placeholder="task description" />
  <button @click="addTask">Add task</button>
  <button @click="getTasks">Get tasks</button>
</template>

<style>
@import "./assets/base.css";
</style>
