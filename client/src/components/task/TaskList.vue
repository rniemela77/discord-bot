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

    <h4>Todo:</h4>
    <div v-for="task in taskStore.todo" :key="task">
      <TaskRow
        :task="task"
        @complete-task="completeTask(task.id)"
        @delete-task="deleteTask(task.id)"
      />
    </div>
    <small v-if="taskStore.todo.length === 0">No tasks todo</small>
    <hr />

    <h4>Due:</h4>
    <div v-for="task in taskStore.due" :key="task">
      <TaskRow
        :task="task"
        @complete-task="completeTask(task.id)"
        @delete-task="deleteTask(task.id)"
      />
    </div>
    <small v-if="taskStore.due.length === 0">No tasks due</small>
    <hr />

    <h4>Done:</h4>
    <div v-for="task in taskStore.done" :key="task">
      <TaskRow
        :task="task"
        @complete-task="completeTask(task.id)"
        @delete-task="deleteTask(task.id)"
      />
    </div>
    <small v-if="taskStore.done.length === 0">No tasks created yet</small>
    <hr />

    <h3>Watching Tasks</h3>
    <h4>Todo tasks</h4>
    <div v-for="task in taskStore.tasksWatching.todo" :key="task">
      <TaskRow
        :task="task"
        @complete-task="completeTask(task.id)"
        @delete-task="deleteTask(task.id)"
      />
    </div>
    <small v-if="taskStore.tasksWatching.todo.length === 0">
      No tasks being watched
    </small>
    <hr />

    <h4>Due tasks</h4>
    <div v-for="task in taskStore.tasksWatching.due" :key="task">
      <TaskRow
        :task="task"
        @complete-task="completeTask(task.id)"
        @delete-task="deleteTask(task.id)"
      />
    </div>
    <small v-if="taskStore.tasksWatching.due.length === 0">
      No tasks being watched
    </small>
    <hr />

    <h4>Done tasks</h4>
    <div v-for="task in taskStore.tasksWatching.done" :key="task">
      <TaskRow
        :task="task"
        @complete-task="completeTask(task.id)"
        @delete-task="deleteTask(task.id)"
      />
    </div>
    <small v-if="taskStore.tasksWatching.done.length === 0">
      No tasks being watched
    </small>
    <hr />
  </div>
</template>

<style scoped></style>
