<script setup>
import FormTemplate from "../components/global/FormTemplate.vue";

import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const isEditing = ref(false);
const formStatus = ref("initial");

const updateProfile = async () => {
  formStatus.value = "sending";

  await userStore
    .updateUser()
    .then(() => {
      formStatus.value = "success";
    })
    .catch((err) => {
      formStatus.value = "error";
      return err;
    });

  isEditing.value = false;
};
</script>

<template>
  <h1>My Profile</h1>
  <FormTemplate :status="formStatus">
    <form v-on:submit.prevent="updateProfile">
      <label for="username">username</label>
      <input type="text" id="username" disabled v-model="userStore.username" />

      <label for="discordUserId">discordUserId</label>
      <input
        type="text"
        id="discordUserId"
        disabled
        v-model="userStore.discordUserId"
      />

      <label for="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        required
        :disabled="!isEditing"
        v-model="userStore.firstName"
      />

      <label for="wake-time">Wake Time</label>
      <input
        type="time"
        id="wake-time"
        :disabled="!isEditing"
        required
        v-model="userStore.wakeTime"
      />

      <label for="sleep-time">Sleep Time</label>
      <input
        type="time"
        id="sleep-time"
        :disabled="!isEditing"
        required
        v-model="userStore.sleepTime"
      />

      <button v-if="!isEditing" @click="isEditing = true">Edit Profile</button>

      <button v-if="isEditing" type="submit">Save Profile</button>
    </form>
  </FormTemplate>
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
