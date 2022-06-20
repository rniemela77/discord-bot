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
  router.push("/new");
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

const viewTask = async (id) => {
  router.push(`/task/${id}`);
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

    <h4>All Tasks:</h4>
    <TaskRow
      class="task-row"
      v-for="task in taskStore.tasks"
      :key="task"
      :task="task"
      @click="viewTask(task.id)"
      @complete-task="completeTask(task.id)"
      @delete-task="deleteTask(task.id)"
    />
    <small v-if="taskStore.tasks.length === 0">No tasks found</small>
    <hr />

    <h3>Watching Tasks</h3>
    <TaskRow
      class="task-row"
      v-for="task in taskStore.tasksWatching"
      :key="task"
      :task="task"
      @click="viewTask(task.id)"
      @delete-task="deleteTask(task.id)"
    />
    <small v-if="taskStore.tasksWatching.length === 0">
      No tasks being watched
    </small>
  </div>
</template>

<style scoped>
.task-row {
  background: rgba(0, 0, 0, 0.1);
}
.task-row:hover {
  background: rgba(37, 75, 201, 0.1);
  cursor: pointer;
}
</style>
