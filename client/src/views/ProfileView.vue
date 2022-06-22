<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <h1>My Profile</h1>

  <form v-on:submit.prevent="userStore.updateUser()">
    <label for="username">username:</label>
    <input type="text" id="username" disabled v-model="userStore.username" />

    <label for="discordUserId">discordUserId:</label>
    <input
      type="text"
      id="discordUserId"
      disabled
      v-model="userStore.discordUserId"
    />

    <label for="firstName">First Name:</label>
    <input type="text" id="firstName" required v-model="userStore.firstName" />

    <label for="wake-time">Wake Time</label>
    <input type="time" id="wake-time" required v-model="userStore.wakeTime" />

    <label for="sleep-time">Sleep Time</label>
    <input type="time" id="sleep-time" required v-model="userStore.sleepTime" />

    <button type="submit">Save</button>
  </form>
</template>

<style scoped>
label {
  display: block;
}
button {
  display: block;
  margin-top: 2rem;
}
</style>
