<script setup>
import LoginForm from "@/components/login/LoginForm.vue";
</script>

<template>
  <h1>Login</h1>

  <LoginForm />

  <div class="center">
    <p><small>or</small></p>
    <RouterLink to="/sign-up">Sign Up</RouterLink>
  </div>
</template>
