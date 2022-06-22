<script setup>
const props = defineProps({
  watchers: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <p v-for="watcher in props.watchers" :key="watcher.name">
    <strong>{{ watcher.name }}</strong> "<i>{{ watcher.message }}</i
    >"
  </p>
</template>
