<template>
  <FieldText
    label="E-mail"
    name="email"
    :value="formData.email"
    @update:value="emit('update:form-data', { ...formData, email: $event })"
  />
  <Step2
    :form-data="formData"
    @update:form-data="emit('update:form-data', $event)"
  />
  <Step3
    :form-data="formData"
    @update:form-data="emit('update:form-data', $event)"
  />
</template>

<script setup>
import Step2 from './Step2.vue';
import Step3 from './Step3.vue';
import FieldText from '../../../components/TextField.vue';

const emit = defineEmits(['update:form-data']);

defineProps({
  formData: {
    type: Object,
  },
});
</script>

<style scoped></style>
