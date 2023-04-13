<template>
  <div class="loading">
    <div class="spinner" :class="size"></div>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'm',
  },
});
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.spinner {
  border: 0.25em solid rgba(0, 0, 0, 0.1);
  border-top-color: orange;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  animation: spin 1s linear infinite;
}

.xs {
  width: 1em;
  height: 1em;
}

.m {
  width: 1.5em;
  height: 1.5em;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
