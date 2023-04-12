<template>
  <div v-if="show" class="snackbar-cover">
    <div :class="['snackbar', type]">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSnackbarStore } from '../store/snackbar.js';

const snackbarStore = useSnackbarStore();

const show = computed(() => snackbarStore.show);
const message = computed(() => snackbarStore.message);
const type = computed(() => snackbarStore.type);
</script>

<style scoped>
.snackbar-cover {
  position: absolute;
  top: 60px;
  right: 50px;
  justify-content: center;
  z-index: 9999;
}
.snackbar {
  width: auto;
  max-width: 400px;
  top: 20px;
  padding: 10px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  transition: opacity 0.3s ease;
}

.success {
  background-color: #28a745;
}

.error {
  background-color: #dc3545;
}

.warning {
  background-color: #ffc107;
}
</style>
