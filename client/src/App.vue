<script setup>
// import { ref } from "vue";

import { RouterView } from "vue-router";

// import ViewTasks from "./components/task/ViewTasks.vue";
// import CreateTask from "./components/task/CreateTask.vue";

// import { useUserStore } from "./stores/user";
// const userStore = useUserStore();

// const creatingTask = ref(false);

// toggle creatingTask
// const toggleCreatingTask = () => {
// creatingTask.value = !creatingTask.value;
// };
</script>

<template>
  <main>
    <!-- <div v-else>
      <h1>
        Welcome {{ userStore.username }}.
        <button @click="userStore.logout()">Logout</button>
      </h1>

      <button @click="toggleCreatingTask">
        <span v-if="creatingTask">Back to Tasks</span>
        <span v-else>Create Task</span>
      </button>

      <CreateTask v-if="creatingTask" @close="toggleCreatingTask" />

      <ViewTasks v-else />
    </div> -->

    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>

    <RouterView />
  </main>
</template>

<style>
@import "./assets/base.css";
main {
  padding: 4rem;
  background: #ffffffb9;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
</style>
