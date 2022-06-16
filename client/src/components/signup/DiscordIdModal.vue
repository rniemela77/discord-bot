<script setup>
const emit = defineEmits(["showDiscordIdModal"]);
</script>

<template>
  <div class="discord-id-modal">
    <div class="discord-id-modal-content">
      <h1>How to get your Discord User ID</h1>
      <p>Go into any channel on The Mantra</p>
      <p class="bold">OR</p>
      <p>Start a direct message with SunBot</p>
      <p class="bold">THEN</p>
      <b>Send the following command:</b>
      <br />
      <p class="code">!userid</p>
      <p>The bot will send you a private message with your User ID.</p>
      <p>Copy it, and paste it in the sign up form.</p>

      <button @click="emit('showDiscordIdModal')">Close</button>
    </div>
  </div>
</template>

<style scoped>
.discord-id-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.discord-id-modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 500px;
  padding: 1rem;
  background: #fff;
  border-radius: 0.25rem;
  text-align: center;
}
.bold {
  font-weight: bold;
}
.bold:last-of-type {
  margin: 1rem;
}
.code {
  font-family: monospace;
  background: #dbdbdb;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  display: inline-block;
  margin-top: 1rem;
  font-size: 1.5rem;
}
button {
  display: block;
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
}
</style>
