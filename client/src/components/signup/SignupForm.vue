<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import router from "../../router";

const userStore = useUserStore();

const username = ref("");
const password = ref("");
const repeatPassword = ref("");
const loading = ref(false);
const errorMessage = ref("");

const signup = async () => {
  errorMessage.value = "";
  loading.value = true;

  try {
    if (password.value !== repeatPassword.value) {
      throw new Error("Passwords do not match");
    }
    if (username.value.length < 3) {
      throw new Error("Username must be at least 3 characters long");
    }
    if (password.value.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    if (password.value.length > 100) {
      throw new Error("Password must be less than 100 characters long");
    }
    if (username.value.length > 100) {
      throw new Error("Username must be less than 100 characters long");
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
      throw new Error(
        "Username must use only letters, numbers, and underscores"
      );
    }

    const user = {
      username: username.value,
      password: password.value,
    };

    await userStore
      .signup(user)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    errorMessage.value = err.message;
    loading.value = false;
    return;
  }
};
</script>

<template>
  <div v-if="loading" class="loading-spinner"></div>

  <div :class="['signup-page', { 'is-logging-in': loading }]">
    <form v-on:submit.prevent="signup">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        v-model="username"
        placeholder="Username"
        :disabled="loading"
        required
      />

      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="Password"
        :disabled="loading"
        required
      />

      <label for="repeatPassword">Re-enter Password</label>
      <input
        type="password"
        id="repeatPassword"
        v-model="repeatPassword"
        placeholder="Re-enter password"
        :disabled="loading"
        required
      />

      <button type="submit" :disabled="loading">Create Account</button>

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
