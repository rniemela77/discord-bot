<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/user";
import { usePlanStore } from "@/stores/plans";
import { getCurrentDate, getCurrentTime } from "@/utils/index.js";
import router from "@/router";

const userStore = useUserStore();
const planStore = usePlanStore();

const plan = computed(() => {
  return planStore.today;
});

const possibleWatchers = computed(() => {
  return userStore.allUsers.filter((user) => {
    return user !== userStore.username;
  });
});

const addTask = () => {
  plan.value.tasks.push({
    name: "",
    times: [],
    completed: false,
  });
};
const savePlan = async () => {
  const newPlan = {
    id: plan.value.id,
    createdBy: userStore.username,
    watchedBy: plan.value.watchedBy,
    createdAtDate: getCurrentDate(),
    createdAtTime: getCurrentTime(),
    // TODO: only add tasks that have content (trim, check if length)
    tasks: [...plan.value.tasks],
  };

  try {
    await planStore
      .savePlan(newPlan)
      .then(async () => {
        await planStore.getAllPlansForUser(userStore.username);
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    err.value = err.message;
  }
};
</script>

<template>
  <div>
    <h1>Today's Plan</h1>
    <div v-if="plan.tasks">
      <div v-for="(task, index) in plan.tasks" :key="index">
        <label for="task-name">Task</label>
        <input type="text" v-model="task.name" id="task-name" />

        <label for="task-times">Task Times</label>
        <input
          type="checkbox"
          v-model="task.times"
          value="Morning"
          id="task-times"
        />
        <input
          type="checkbox"
          v-model="task.times"
          value="Afternoon"
          id="task-times"
        />
        <input
          type="checkbox"
          v-model="task.times"
          value="Evening"
          id="task-times"
        />

        <label :for="`completed-${index}`">Task Complete</label>
        <input
          type="checkbox"
          v-model="task.completed"
          :id="`completed-${index}`"
        />
      </div>

      <template v-for="user in possibleWatchers" :key="user">
        <label :for="`watcher-${user}`">{{ user }}</label>
        <input
          type="checkbox"
          v-model="plan.watchedBy"
          :value="user"
          :id="`watcher-${user}`"
        />
      </template>

      <button @click="addTask">Add Task</button>

      <button @click="savePlan">Save Plan</button>
    </div>

    <div v-else>
      <h2>No plan found for today</h2>
    </div>
  </div>
</template>
