<template>
  <label :for="id" class="radio" :class="{ checked: checked }">
    <input
      :id="id"
      :value="value"
      :checked="checked"
      :name="name"
      type="radio"
      @input="updateValue({ checked: $event.target.checked, value })"
    />
    {{ label }}
  </label>
</template>

<script setup>
const emit = defineEmits(['update:value']);
defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  checked: {
    type: Boolean,
    default: true,
  },
});

function updateValue(newValue) {
  emit('update:value', newValue);
}
</script>
<style scoped>
input[type='radio'] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  pointer-events: none;
}

label {
  display: inline-block;
  text-align: center;
  position: relative;
  padding-left: 28px;
  margin-right: 16px;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
}

label:before {
  content: '';
  display: inline-block;
  text-align: center;
  width: 12px;
  height: 12px;
  position: absolute;
  left: 1px;
  bottom: 2px;
  background-color: #fff;
  border: 1px solid rgba(1, 1, 1, 1);
  border-radius: 50%;
}

label.checked:before {
  content: '';
  display: inline-block;
  width: 13px;
  height: 13px;
  position: absolute;
  left: 1px;
  bottom: 2px;
  background-color: orange;
  border-radius: 50%;
}
</style>
