<script setup>
import { onMounted } from "vue";
import router from "@/router";
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

onMounted(() => {
  if (userStore.username) {
    router.push("/");
  } else {
    router.push("/login");
  }
});
</script>

<template>
  <main>
    <RouterLink to="/">Home</RouterLink>
    <!-- <RouterLink to="/about">About</RouterLink> -->
    <!-- <RouterLink to="/profile">Profile</RouterLink> -->

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
