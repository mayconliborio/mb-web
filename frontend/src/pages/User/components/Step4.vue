<template>
  <InputField
    required
    label="E-mail"
    name="email"
    :value="dadosFormulario.email"
    @emit-error="emit('emit-error', $event)"
    @update:value="
      emit('update:dados-formulario', { ...dadosFormulario, email: $event })
    "
  />
  <Step2
    :dados-formulario="dadosFormulario"
    @emit-error="emit('emit-error', $event)"
    @update:dados-formulario="emit('update:dados-formulario', $event)"
  />
  <Step3
    :dados-formulario="dadosFormulario"
    @emit-error="emit('emit-error', $event)"
    @update:dados-formulario="emit('update:dados-formulario', $event)"
  />
</template>

<script setup>
import { Step2, Step3 } from './';
import { InputField } from '../../../components/';

const emit = defineEmits(['update:dados-formulario', 'emit-error']);

defineProps({
  dadosFormulario: {
    type: Object,
    default: () => {},
  },
});
</script>

<style scoped></style>
