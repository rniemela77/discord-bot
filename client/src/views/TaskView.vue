<script setup>
import FormTemplate from "@/components/global/FormTemplate.vue";

import { computed, ref } from "vue";
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
  const allTasks = [...taskStore.tasks, ...taskStore.tasksWatching];
  return allTasks.find((task) => task.id === taskId.value);
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
  <div v-else>
    <h2>Task not found.</h2>
    <small>
      Either a task by this ID does not exist, or you are not set as a watcher
      by the task creator.
    </small>
  </div>
</template>
