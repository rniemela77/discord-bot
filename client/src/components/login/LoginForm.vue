<script setup>
import { ref } from "vue";

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const username = ref("");
const password = ref("");
const isLoggingIn = ref(false);
const errorMessage = ref("");

const login = async () => {
  isLoggingIn.value = true;

  try {
    if (!username.value || !password.value) {
      throw new Error("Username or password missing");
    }

    const user = {
      username: username.value,
      password: password.value,
    };

    await userStore.login(user).catch((err) => {
      throw err;
    });
  } catch (err) {
    errorMessage.value = err.message;
    isLoggingIn.value = false;
    return;
  }

  isLoggingIn.value = false;
};
</script>

<template>
  <div v-if="isLoggingIn" class="loading-spinner"></div>

  <div :class="['login-page', { 'is-logging-in': isLoggingIn }]">
    <form v-on:submit.prevent="login">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        v-model="username"
        placeholder="username"
        :disabled="isLoggingIn"
        required
      />

      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="password"
        :disabled="isLoggingIn"
        required
      />

      <button type="submit" :disabled="isLoggingIn">Login</button>

      <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
    </form>
  </div>
</template>

<style scoped>
.is-logging-in {
  opacity: 0.5;
}
.loading-spinner {
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.8s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
input {
  display: block;
}
button {
  display: block;
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
}
.error-message {
  color: red;
}
</style>
