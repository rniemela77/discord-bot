<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const addGoal = async () => {
  const newGoal = {
    id: userStore.goals.length,
    name: "",
  };
  userStore.goals.push(newGoal);
};

const deleteGoalById = async (id) => {
  userStore.goals = userStore.goals.filter((goal) => {
    return goal.id !== id;
  });
};

const isEditing = ref(false);

const editGoals = async () => {
  if (isEditing.value) {
    await userStore.updateUser();
    isEditing.value = false;
  } else {
    isEditing.value = !isEditing.value;
  }
};
</script>

<template>
  <h1>Goals</h1>

  <div class="goal" v-for="(goal, index) in userStore.goals" :key="goal.id">
    <label :for="`goal-${goal.id}`">Goal {{ ++index }}</label>
    <textarea
      :disabled="!isEditing"
      :id="`goal-${goal.id}`"
      v-model="goal.name"
    ></textarea>
    <button v-if="isEditing" @click="deleteGoalById(goal.id)">Delete</button>
  </div>

  <button v-if="isEditing" @click="addGoal">Add Goal</button>

  <button @click="editGoals">{{ isEditing ? "Save" : "Edit" }}</button>
</template>

<style scoped>
textarea {
  display: block;
  min-height: 75px;
}
label {
  font-style: italic;
}
</style>
