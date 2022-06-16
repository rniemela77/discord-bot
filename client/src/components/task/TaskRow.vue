<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const emit = defineEmits(["complete-task", "delete-task"]);

defineProps({
  task: {
    type: Object,
    required: true,
  },
});

function listStrings(arr) {
  if (arr.length <= 1) {
    return `[${arr[0]}]`;
  }
  return `[${arr.slice(0, arr.length - 1).join(", ")}] and [${
    arr[arr.length - 1]
  }]`;
}
</script>

<template>
  <div class="task">
    <b>{{ task.name }}</b>
    <p>{{ task.description }}</p>
    <p><b>Due:</b> {{ task.date }} @ {{ task.time }}</p>
    <p v-if="task.watchedBy.length > 0">
      <b>Watchers:</b>
      {{ listStrings(task.watchedBy) }}
    </p>

    <div v-if="userStore.username === task.createdBy">
      <button @click="emit('complete-task')">Complete</button>
      <button @click="emit('delete-task')">x</button>
    </div>
  </div>
</template>

<style scoped>
.task {
  margin-bottom: 1rem;
}
b {
  font-weight: bold;
}
</style>
