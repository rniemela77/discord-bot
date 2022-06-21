<script setup>
import { ref } from "vue";

const emit = defineEmits(["task-change", "task-delete"]);

const props = defineProps({
  formStatus: {
    type: String,
    required: true,
  },
  task: {
    type: Object,
    required: true,
  },
  taskIndex: {
    type: Number,
    required: true,
  },
});

const taskName = ref(props.task.name);
const taskTimes = ref(props.task.times);

const inputChange = async () => {
  emit("task-change", {
    index: props.taskIndex,
    name: taskName.value,
    times: [...taskTimes.value],
  });
};

const taskDelete = () => {
  emit("task-delete", { id: props.id });
};

const timeOptions = ["Morning", "Afternoon", "Evening"];
</script>

<template>
  <div class="task">
    <label :for="`task-${props.taskIndex}`">Task:</label>
    <input
      type="text"
      :id="`task-${props.taskIndex}`"
      placeholder="Task Name"
      :disabled="props.formStatus === 'sending'"
      v-model="taskName"
      @input="inputChange"
    />

    <template v-for="time in timeOptions" :key="time">
      <label :for="`input-${time}-${props.taskIndex}`">{{ time }}</label>
      <input
        type="checkbox"
        :id="`input-${time}-${props.taskIndex}`"
        :disabled="props.formStatus === 'sending'"
        :value="time"
        v-model="taskTimes"
        @change="inputChange"
      />
    </template>

    <button @click="taskDelete">Delete</button>
  </div>
</template>

<style scoped>
.task {
  display: block;
}
</style>
