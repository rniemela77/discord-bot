<script setup>
import PlanList from "@/components/plan/PlanList.vue";
import TodaysPlan from "@/components/plan/TodaysPlan.vue";

import { useUserStore } from "@/stores/user";
import { usePlanStore } from "@/stores/plans";
import router from "@/router";

const userStore = useUserStore();
const planStore = usePlanStore();

const logout = () => {
  planStore.clearPlans();
  userStore.logout();
  router.push("/login");
};
</script>

<template>
  <div>
    <h1>Task List</h1>

    <button @click="logout">Logout</button>

    <h2>Today</h2>
    <TodaysPlan />

    <h2>Watching</h2>
    <PlanList :tasks="planStore.watching" />
  </div>
</template>
