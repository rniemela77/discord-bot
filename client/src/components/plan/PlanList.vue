<script setup>
import { ref } from "vue";
import SupportModal from "@/components/plan/SupportModal.vue";

const props = defineProps({
  tasks: {
    type: Object,
    required: true,
  },
});

const supporting = ref({});
</script>

<template>
  <div v-for="userPlans in props.tasks" :key="userPlans">
    <h2>{{ userPlans.createdBy }}</h2>

    <p v-for="task in userPlans.tasks" :key="task">
      {{ task.name }}
      - {{ task.times.join(", ") }} - {{ task.completed }}
    </p>

    <button @click="supporting = userPlans">Support</button>

    <template v-for="watcher in userPlans.watchers" :key="watcher.name">
      <p v-if="watcher.message">{{ watcher.name }}: "{{ watcher.message }}"</p>
    </template>
  </div>

  <SupportModal
    v-if="supporting?.id"
    :plan="supporting"
    @close="supporting = {}"
  />
</template>

<style scoped></style>
