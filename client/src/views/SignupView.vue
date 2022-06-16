<script setup>
import SignupForm from "@/components/signup/SignupForm.vue";
</script>

<template>
  <h1>Sign Up</h1>

  <SignupForm />

  <div class="center">
    <p><small>or</small></p>
    <RouterLink to="/login">Log In</RouterLink>
  </div>
</template>
