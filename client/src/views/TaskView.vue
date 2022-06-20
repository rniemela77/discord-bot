<script setup>
import FormTemplate from "@/components/global/FormTemplate.vue";

import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useTaskStore } from "@/stores/tasks";
import router from "@/router";

const route = useRoute();
const taskStore = useTaskStore();
const userStore = useUserStore();

const taskId = ref(Number(route.params.id));
const formStatus = ref("initial");
const conclusion = ref("");

const task = computed(() => {
  return taskStore.allTasks.find((task) => task.id === taskId.value);
});

const isMyTask = computed(() => {
  return task.value.createdBy === userStore.username;
});

const completeTask = async () => {
  formStatus.value = "sending";

  try {
    await taskStore
      .completeTask(taskId.value, conclusion.value)
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    err.value = err.message;
    formStatus.value = "initial";
    return;
  }

  formStatus.value = "success";
  router.push("/");
};

// Todo: maybe put this in a composable, in app.vue, or trigger each route
onMounted(async () => {
  await taskStore.getTasksByUser(userStore.username).catch((err) => {
    console.error(err);
  });
  await taskStore.getWatchedTasks(userStore.username).catch((err) => {
    console.error(err);
  });
});
</script>

<template>
  <div v-if="task">
    <h1 v-if="!isMyTask">{{ task.createdBy }}</h1>
    <h2>{{ task.name }}</h2>
    <p>{{ task.description }}</p>
    <p>Watching: {{ task.watchedBy }}</p>
    <p>Due: {{ task.time }} on {{ task.date }}</p>

    <FormTemplate v-if="isMyTask" :status="formStatus">
      <form v-on:submit.prevent="completeTask">
        <label for="conclusion">Conclusion</label>
        <textarea
          type="text"
          id="conclusion"
          v-model="conclusion"
          placeholder="Tell your watchers what you've done"
          :disabled="formStatus === 'sending'"
          required
        ></textarea>

        <button type="submit" :disabled="formStatus === 'sending'">Send</button>
      </form>
    </FormTemplate>
  </div>
  <div v-else>No task found</div>
</template>
