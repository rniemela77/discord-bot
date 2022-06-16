<script setup>
import TaskRow from "@/components/task/TaskRow.vue";

import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useTaskStore } from "@/stores/tasks";
import router from "@/router";

const userStore = useUserStore();
const taskStore = useTaskStore();

const getTasks = async () => {
  await taskStore.getTasksByUser(userStore.username).catch((err) => {
    console.error(err);
  });
};
const getWatchedTasks = async () => {
  await taskStore.getWatchedTasks(userStore.username).catch((err) => {
    console.error(err);
  });
};

const newTask = async () => {
  await router.push("/newtask").catch((err) => {
    console.error(err);
  });
};
const deleteTask = async (id) => {
  try {
    await taskStore.deleteTask(id).catch((err) => {
      console.error(err);
    });
    await getTasks().catch((err) => {
      console.error(err);
    });
  } catch (err) {
    err.value = err.message;
  }
};
const completeTask = async (id) => {
  try {
    await taskStore.completeTask(id).catch((err) => {
      console.error(err);
    });
    await getTasks().catch((err) => {
      console.error(err);
    });
  } catch (err) {
    err.value = err.message;
  }
};

onMounted(async () => {
  await getTasks().catch((err) => {
    console.error(err);
  });
  await getWatchedTasks().catch((err) => {
    console.error(err);
  });
});
</script>

<template>
  <div>
    <button @click="getTasks()">Get tasks</button>

    <div class="row">
      <h3>My Tasks</h3>
      <button @click="newTask()">New task</button>
    </div>

    <div v-for="task in taskStore.tasks" :key="task">
      <TaskRow
        :task="task"
        @complete-task="completeTask(task.id)"
        @delete-task="deleteTask(task.id)"
      />
    </div>
    <small v-if="taskStore.tasks.length === 0">No tasks created yet</small>

    <h3>Watching Tasks</h3>
    <div v-for="task in taskStore.tasksWatching" :key="task">
      <TaskRow
        :task="task"
        @complete-task="completeTask(task.id)"
        @delete-task="deleteTask(task.id)"
      />
    </div>
    <small v-if="taskStore.tasksWatching.length === 0">
      No tasks being watched
    </small>
  </div>
</template>

<style scoped></style>
