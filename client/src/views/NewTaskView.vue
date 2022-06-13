<script setup>
import CheckboxInput from "../components/global/CheckboxInput.vue";

import { onMounted, ref, defineEmits } from "vue";

import { useUserStore } from "@/stores/user";
import { useTaskStore } from "@/stores/tasks";
const userStore = useUserStore();
const taskStore = useTaskStore();

const emit = defineEmits(["close"]);

// Add a task
const taskName = ref("");
const taskDescription = ref("");
const taskDate = ref("");
const taskTime = ref("");
const taskWatchers = ref([]);

const setWatchers = async (user, isPicked) => {
  console.log("setWatchers", user, isPicked);
  if (isPicked) {
    taskWatchers.value.push(user);
  } else {
    taskWatchers.value = taskWatchers.value.filter(
      (watcher) => watcher !== user
    );
  }
  console.log(taskWatchers.value);
};

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
    emit("close");
  } catch (err) {
    err.value = err.message;
  }
};

onMounted(async () => {
  await userStore.getAllUsers();
});
</script>

<template>
  <div>
    <h2>Create Task</h2>
    <form v-on:submit.prevent="addTask">
      <label for="taskName">Task Name</label>
      <input
        type="text"
        id="taskName"
        v-model="taskName"
        placeholder="Task Name"
        required
      />

      <label for="taskDescription">Task Description</label>
      <input
        type="text"
        id="taskDescription"
        v-model="taskDescription"
        placeholder="Task Description"
        required
      />

      <label>I will report on the task status at:</label>
      <input type="date" id="taskDate" v-model="taskDate" required />
      <input type="time" id="taskTime" v-model="taskTime" required />

      <h3>Set task watchers</h3>
      <div v-for="user in userStore.allUsers" :key="user">
        <CheckboxInput
          :value="user"
          :text="user"
          @select="(isPicked) => setWatchers(user, isPicked)"
        />
      </div>

      <button type="submit">Add Task</button>
    </form>
  </div>
</template>

<style scoped>
input:not([type="checkbox"]) {
  display: block;
}
</style>
