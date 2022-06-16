<script setup>
import FormTemplate from "@/components/global/FormTemplate.vue";

import { onMounted, ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useTaskStore } from "@/stores/tasks";
import router from "@/router";

const userStore = useUserStore();
const taskStore = useTaskStore();

// Add a task
const taskName = ref("");
const taskDescription = ref("");
const taskDate = ref("");
const taskTime = ref("");
const taskWatchers = ref([]);
const formStatus = ref("initial");

const displayWatchersList = computed(() => {
  return userStore.allUsers.filter((user) => {
    return user !== userStore.username;
  });
});

const addTask = async () => {
  formStatus.value = "sending";

  const task = {
    name: taskName.value.trim(),
    description: taskDescription.value.trim(),
    date: taskDate.value,
    time: taskTime.value,
    createdBy: userStore.username,
    watchedBy: taskWatchers.value,
  };

  try {
    await taskStore
      .addTask(task)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    err.value = err.message;
    formStatus.value = "initial";
    return;
  }
};

onMounted(async () => {
  await userStore.getAllUsers().catch((err) => {
    console.error(err);
  });
});
</script>

<template>
  <FormTemplate :status="formStatus">
    <form v-on:submit.prevent="addTask">
      <label for="taskName">Task Name</label>
      <input
        type="text"
        id="taskName"
        v-model="taskName"
        placeholder="Task Name"
        :disabled="formStatus === 'sending'"
        required
      />

      <label for="taskDescription">Task Description</label>
      <input
        type="text"
        id="taskDescription"
        v-model="taskDescription"
        placeholder="Task Description"
        :disabled="formStatus === 'sending'"
        required
      />

      <label>I will report on the task status at:</label>
      <input
        type="date"
        id="taskDate"
        v-model="taskDate"
        :disabled="formStatus === 'sending'"
        required
      />
      <input
        type="time"
        id="taskTime"
        v-model="taskTime"
        :disabled="formStatus === 'sending'"
        required
      />

      <h3>Set task watchers</h3>
      <div v-for="user in displayWatchersList" :key="user">
        <input
          type="checkbox"
          v-model="taskWatchers"
          :disabled="formStatus === 'sending'"
          :value="user"
          :id="user"
        />
        <label :for="user">{{ user }}</label>
      </div>

      <button :disabled="formStatus === 'sending'" type="submit">
        Add Task
      </button>
    </form>
  </FormTemplate>
</template>

<style scoped></style>
