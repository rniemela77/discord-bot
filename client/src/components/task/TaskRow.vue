<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const emit = defineEmits(["delete-task"]);

const displayUsername = computed(() => {
  if (props.task.createdBy !== userStore.username) {
    return props.task.createdBy;
  }
  return "";
});

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="task">
    <b v-if="displayUsername">{{ displayUsername }}<br /></b>
    <b>{{ task.name }}</b>
    <p>{{ task.description }}</p>
    <p><b>Due:</b> {{ task.date }} @ {{ task.time }}</p>
    <p>
      <b>Watchers: </b>
      <span v-if="task.watchedBy.length > 0">{{
        task.watchedBy.join(", ")
      }}</span>
      <span v-else>None</span>
    </p>

    <div v-if="userStore.username === task.createdBy">
      <RouterLink :to="`/task/${task.id}`">Complete</RouterLink>
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
