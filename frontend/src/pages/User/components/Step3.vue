<template>
  <InputField
    required
    label="Sua senha"
    type="password"
    name="senha"
    :value="dadosFormulario.senha"
    @emit-error="emit('emit-error', $event)"
    @update:value="
      emit('update:dados-formulario', { ...dadosFormulario, senha: $event })
    "
  />
</template>

<script setup>
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
