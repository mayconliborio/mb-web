<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input
      :id="name"
      v-model="internValue"
      :type="type"
      @input="$emit('update:value', $event.target.value)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  value: {
    type: [String, Number],
  },
  label: String,
  type: {
    type: String,
    default: 'text',
  },
});
const internValue = props.value || null;
</script>
