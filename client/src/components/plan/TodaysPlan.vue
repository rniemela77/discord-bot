<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { usePlanStore } from "@/stores/plans";
import { getCurrentDate, getCurrentTime } from "@/utils/index.js";

const userStore = useUserStore();
const planStore = usePlanStore();

const isEditing = ref(false);

const toggleEditingMode = async () => {
  if (isEditing.value) {
    await savePlan();
    isEditing.value = false;
  } else {
    isEditing.value = !isEditing.value;
  }
};

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
    id: plan.value.tasks.length,
    name: "",
    times: [],
    completed: false,
  });
};
const savePlan = async () => {
  const newPlan = {
    id: plan.value.id,
    createdBy: userStore.username,
    watchers: plan.value.watchers,
    createdAtDate: getCurrentDate(),
    createdAtTime: getCurrentTime(),
    tasks: [...plan.value.tasks],
    reminders: [...plan.value.reminders],
  };

  try {
    await planStore
      .savePlan(newPlan)
      .then(async () => {
        await planStore.getAllPlansForUser(userStore.username);
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    err.value = err.message;
  }
};

// Whenever a task is completed, notify the server
const setTaskCompleted = async (taskId, isCompleted) => {
  await planStore.setTaskCompleted(plan.value.id, taskId, isCompleted);
  await planStore.getAllPlansForUser(userStore.username);
};

const addReminder = async () => {
  const newReminder = {
    id: plan.value.reminders.length,
    name: "",
    time: "",
    sent: false,
  };
  plan.value.reminders.push(newReminder);
};
</script>

<template>
  <div>
    <h1>Today's Plan</h1>
    <div v-if="plan.tasks">
      <div v-for="(task, index) in plan.tasks" :key="index">
        <label for="task-name">Task</label>
        <input
          type="text"
          v-model="task.name"
          id="task-name"
          :disabled="!isEditing"
        />

        <label for="task-times">Task Times</label>
        <input
          type="checkbox"
          v-model="task.times"
          value="Morning"
          id="task-times"
          :disabled="!isEditing"
        />
        <input
          type="checkbox"
          v-model="task.times"
          value="Afternoon"
          id="task-times"
          :disabled="!isEditing"
        />
        <input
          type="checkbox"
          v-model="task.times"
          value="Evening"
          id="task-times"
          :disabled="!isEditing"
        />

        <label :for="`completed-${index}`">Task Complete</label>
        <input
          type="checkbox"
          v-model="task.completed"
          :id="`completed-${index}`"
          @change="setTaskCompleted(task.id, $event.target.checked)"
          :disabled="isEditing"
        />
      </div>

      <template v-for="user in possibleWatchers" :key="user">
        <label :for="`watcher-${user}`">{{ user }}</label>
        <input
          type="checkbox"
          v-model="plan.watchers"
          :value="user"
          :id="`watcher-${user}`"
          :disabled="!isEditing"
        />
      </template>

      <br />
      <button @click="addReminder">Add Reminder</button>

      <!-- TODO: make reminders required if it exists.-->
      <template v-for="reminder in plan.reminders" :key="reminder.id">
        <br />
        <input type="text" v-model="reminder.name" :disabled="!isEditing" />
        <label :for="`reminder-${reminder.id}`">Remind me at</label>
        <input
          type="time"
          v-model="reminder.time"
          :id="`reminder-${reminder.id}`"
          :disabled="!isEditing"
        />
      </template>
      <br />

      <button @click="toggleEditingMode">
        {{ isEditing ? "Save" : "Edit" }}
      </button>

      <button v-if="isEditing" @click="addTask">Add Task</button>
    </div>

    <div v-else>
      <h2>No plan found for today</h2>
    </div>
  </div>
</template>
