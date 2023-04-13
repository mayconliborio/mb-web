<template>
  <div v-if="show" class="snackbar" :class="type">
    {{ message }}
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
.snackbar {
  position: absolute;
  top: -200px;
  right: 60px;
  width: auto;
  max-width: 500px;
  padding: 10px;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  animation: upToDown 5s;
  z-index: 9999;
}

@keyframes upToDown {
  0% {
    top: -200px;
  }
  10% {
    top: 64px;
  }
  15% {
    top: 56px;
  }
  20% {
    top: 60px;
  }
  80% {
    top: 60px;
  }
  90% {
    top: 64px;
  }
  100% {
    top: -200px;
  }
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
