<template>
  <button type="button" class="btn" :class="type" :disabled="disabled">
    <slot> </slot>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'primary',
  },
  disabled: Boolean,
});
</script>

<style scoped>
.btn {
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  padding: 6px 8px;
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
