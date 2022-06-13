<script setup>
import TaskRow from "./TaskRow.vue";

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
  <div>
    <button @click="getTasks()">Get tasks</button>

    <h3>My Tasks</h3>
    <div v-for="task in taskStore.tasks" :key="task">
      <TaskRow
        :task="task"
        @complete-task="completeTask(task.id)"
        @delete-task="deleteTask(task.id)"
      />
    </div>

    <h3>Watching Tasks</h3>
    <div v-for="task in taskStore.tasksWatching" :key="task">
      <TaskRow
        :task="task"
        @complete-task="completeTask(task.id)"
        @delete-task="deleteTask(task.id)"
      />
    </div>
  </div>
</template>

<style scoped></style>
