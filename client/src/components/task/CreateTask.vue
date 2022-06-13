<script setup>
import { onMounted, ref } from "vue";

import { useUserStore } from "@/stores/user";
import { useTaskStore } from "@/stores/tasks";
const userStore = useUserStore();
const taskStore = useTaskStore();

// Add a task
const taskName = ref("");
const taskDescription = ref("");
const taskDate = ref("");
const taskTime = ref("");
const taskWatchers = ref([]);

const addTask = async () => {
  const task = {
    name: taskName.value.trim(),
    description: taskDescription.value.trim(),
    date: taskDate.value,
    time: taskTime.value,
    createdBy: userStore.username,
    watchedBy: taskWatchers.value,
  };

  try {
    await taskStore.addTask(task);
    taskName.value = "";
    taskDescription.value = "";
    await taskStore.getTasksByUser(userStore.username);
  } catch (err) {
    err.value = err.message;
  }
};

onMounted(async () => {
  await userStore.getAllUsers();
});
</script>

<template>
  <h2>Create Task</h2>
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

    <h3>Set task watchers</h3>
    <ul>
      <li v-for="user in userStore.allUsers" :key="user">
        <input
          type="checkbox"
          v-model="taskWatchers"
          :value="user"
          :id="user"
        />
        <label :for="user"> {{ user }}</label>
      </li>
    </ul>

    <button type="submit">Add Task</button>
  </form>
</template>

<style scoped>
input:not([type="checkbox"]) {
  display: block;
}
</style>
