<script setup>
const props = defineProps({
  tasks: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div v-for="userPlans in props.tasks" :key="userPlans">
    <h2>{{ userPlans.createdBy }}</h2>
    <p v-for="task in userPlans.tasks" :key="task">
      {{ task.name }}
      - {{ task.times.join(", ") }} - {{ task.completed }}
    </p>
  </div>
</template>

<style scoped></style>
