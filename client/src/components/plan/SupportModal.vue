<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { usePlanStore } from "@/stores/plans";

import ModalTemplate from "@/components/global/ModalTemplate.vue";

const userStore = useUserStore();
const planStore = usePlanStore();

const props = defineProps({
  plan: {
    type: Object,
    required: true,
  },
});

const message = ref("");

const submit = async () => {
  console.log(props.plan.createdBy, message.value);

  await planStore
    .setWatcherMessage(props.plan.id, {
      name: userStore.username,
      message: message.value,
    })
    .catch((err) => {
      console.error(err);
    });
  await planStore.getAllPlansForUser(userStore.username).catch((err) => {
    console.error(err);
  });
  emit("close");
  // send this username, planId, and message to the server
  // pressing support button will open modal to send generic message or custom
  // maybe show emojis?
  // on submit,
  // send post req to server of planId and message
  // server will store message in [{name: rob, message: yooo}]
  // server will send discord PM to task creator
};

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>
<template>
  <ModalTemplate>
    <h2>Support {{ props.plan.createdBy }}</h2>

    <input
      type="text"
      v-model="message"
      placeholder="(Optional) Send encouragement"
    />
    <button @click="close">Close</button>
    <button @click="submit">Send</button>
  </ModalTemplate>
</template>
