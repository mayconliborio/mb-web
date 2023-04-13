<template>
  <button
    :type="type"
    class="btn"
    :class="color"
    :disabled="disabled || waitingAction"
    @click="handleClick()"
  >
    <DefaultLoading v-if="waitingAction" size="xs"></DefaultLoading>
    <span v-else>{{ text }} </span>
  </button>
</template>

<script setup>
import { ref } from 'vue';
import DefaultLoading from './DefaultLoading.vue';

const props = defineProps({
  color: {
    type: String,
    default: 'primary',
  },
  type: {
    type: String,
    default: 'button',
  },
  text: {
    type: String,
    required: true,
  },
  action: {
    type: Function,
    default: () => {},
  },
  disabled: Boolean,
});
const waitingAction = ref(false);

async function handleClick() {
  if (typeof props.action === 'function') {
    waitingAction.value = true;
    await props.action();
    waitingAction.value = false;
  }
}
</script>

<style scoped>
.btn {
  border-radius: 6px;
  line-height: 24px;
  width: 100%;
  min-width: 100px;
  max-width: 140px;
  padding: 2px 8px;
  font-size: 16px;
  border: 1px solid orange;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn:disabled,
.btn:hover:disabled,
.btn:active:disabled {
  background-color: rgba(190, 190, 190, 0.2);
  color: black;
  border: 1px solid rgba(190, 190, 190, 0.1);
  cursor: inherit;
}

.primary {
  color: white;
  background-color: orange;
}

.primary:hover {
  background-color: #ffb84d;
}

.primary:active {
  background-color: #ff9933;
}

.red {
  color: white;
  background-color: #772014;
  border: 1px solid #772014;
}

.red:hover {
  background-color: #802014;
}

.red:active {
  background-color: #702014;
}

.cancel {
  color: orange;
  background-color: white;
}

.cancel:hover {
  background-color: rgba(200, 200, 200, 0.15);
}

.cancel:active {
  background-color: rgba(150, 150, 150, 0.15);
}
</style>
