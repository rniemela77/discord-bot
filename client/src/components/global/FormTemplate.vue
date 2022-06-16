<script setup>
const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div v-if="props.status === 'sending'" class="loading-spinner"></div>

  <div>
    <slot></slot>
  </div>
</template>

<style scoped>
.loading-spinner {
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.8s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
input {
  display: block;
}
button {
  display: block;
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
}
.error-message {
  color: red;
}
</style>
