<script setup>
import { ref } from "vue";

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["select"]);

const checkboxState = ref(false);
const checkboxId = ref(props.value);

const onChange = () => {
  emit("select", checkboxState.value);
};
</script>

<template>
  <div>
    <input
      type="checkbox"
      v-model="checkboxState"
      :id="checkboxId"
      @change="onChange"
    />
    <label :for="checkboxId">{{ props.text }}</label>
  </div>
</template>

<style scoped>
input {
  display: none;
}
input:checked + label {
  background: lime;
}
label {
  display: inline-block;
}
</style>
