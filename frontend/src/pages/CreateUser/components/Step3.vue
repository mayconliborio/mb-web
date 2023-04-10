<template>
  <FieldText
    label="Sua senha"
    type="password"
    name="senha"
    :value="formData.senha"
    @update:value="emit('update:form-data', { ...formData, senha: $event })"
  />
</template>

<script setup>
import FieldText from '../../../components/TextField.vue';

const emit = defineEmits(['update:form-data']);
defineProps({
  formData: {
    type: Object,
  },
});
</script>

<style scoped></style>
