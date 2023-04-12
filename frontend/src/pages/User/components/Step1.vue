<template>
  <TextField
    label="Endereço de e-mail"
    name="email"
    required
    :value="dadosFormulario.email"
    @emit-error="emit('emit-error', $event)"
    @update:value="
      emit('update:dados-formulario', { ...dadosFormulario, email: $event })
    "
  />
  <div class="form-row">
    <FieldRadioButton
      v-for="option in options"
      :id="`option-${option.value}`"
      :key="`option-${option.label}-${option.value}`"
      :checked="dadosFormulario.tipoPessoa === option.value"
      :label="option.label"
      :value="option.value"
      name="pessoa"
      @update:value="updateDadosFormulario($event)"
    />
  </div>
</template>

<script setup>
import { TextField, FieldRadioButton } from '../../../components/';

const emit = defineEmits(['update:dados-formulario', 'emit-error']);

const props = defineProps({
  dadosFormulario: {
    type: Object,
    default: () => {},
  },
  options: {
    type: Object,
    default: () => {},
  },
});

function updateDadosFormulario(data) {
  let newDadosFormulario = {
    ...props.dadosFormulario,
    tipoPessoa: data.value,
  };

  emit('update:dados-formulario', newDadosFormulario);
}
</script>

<style scoped>
.form-row {
  display: flex;
  justify-content: space-between;
}
</style>
