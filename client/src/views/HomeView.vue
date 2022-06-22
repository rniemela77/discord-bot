<script setup>
import PlanList from "@/components/plan/PlanList.vue";
import TodaysPlan from "@/components/plan/TodaysPlan.vue";
import WatcherMessages from "@/components/watcher/WatcherMessages.vue";

import { computed } from "vue";

import { useUserStore } from "@/stores/user";
import { usePlanStore } from "@/stores/plans";
import router from "@/router";

const userStore = useUserStore();
const planStore = usePlanStore();

const logout = async () => {
  await router.push("/login");
  planStore.clearPlans();
  userStore.logout();
};

const watchers = computed(() => {
  if (!planStore.today?.watchers) return [];

  return planStore.today.watchers.filter((watcher) => {
    return watcher.name && watcher.message;
  });
});
</script>

<template>
  <div>
    <h1>Task List</h1>

    <button @click="logout">Logout</button>

    <h2 v-if="watchers.length">Watcher Messages</h2>
    <WatcherMessages :watchers="watchers" />

    <h2>Today</h2>
    <TodaysPlan />

    <h2>Watching</h2>
    <PlanList :tasks="planStore.watching" />
  </div>
</template>
