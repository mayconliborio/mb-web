<template>
  <div class="card-row">
    <span class="card-label">{{ label }}:</span>
    <span class="card-value">{{ value }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.card-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 6px;
}

.card-row:last-child {
  margin-bottom: 0;
}

.card-label {
  font-weight: bold;
}

.card-value {
  margin-left: 8px;
}
</style>
