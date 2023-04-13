<template>
  <TextField
    required
    :label="fieldNome.label"
    :name="fieldNome.name"
    :value="dadosFormulario.nome"
    @emit-error="emit('emit-error', $event)"
    @update:value="
      emit('update:dados-formulario', { ...dadosFormulario, nome: $event })
    "
  />
  <TextField
    required
    :label="fieldIdentificacaoFiscal.label"
    :name="fieldIdentificacaoFiscal.name"
    :value="dadosFormulario.identificacaoFiscal"
    @emit-error="emit('emit-error', $event)"
    @update:value="
      emit('update:dados-formulario', {
        ...dadosFormulario,
        identificacaoFiscal: $event,
      })
    "
  />
  <TextField
    required
    :label="fieldData.label"
    :name="fieldData.name"
    :value="dadosFormulario.dataRegistro"
    type="date"
    @emit-error="emit('emit-error', $event)"
    @update:value="
      emit('update:dados-formulario', {
        ...dadosFormulario,
        dataRegistro: $event,
      })
    "
  />
  <TextField
    required
    label="Telefone"
    name="telefone"
    :value="dadosFormulario.telefone"
    @emit-error="emit('emit-error', $event)"
    @update:value="
      emit('update:dados-formulario', { ...dadosFormulario, telefone: $event })
    "
  />
</template>

<script setup>
import { TextField } from '../../../components/';
import { computed } from 'vue';

const emit = defineEmits(['update:dados-formulario', 'emit-error']);

const props = defineProps({
  dadosFormulario: {
    type: Object,
    default: () => ({}),
  },
});

const isPessoaFisica = computed(
  () => props.dadosFormulario.tipoPessoa === 'fisica'
);

const fieldNome = computed(() => ({
  label: isPessoaFisica.value ? 'Nome' : 'Razão Social',
  name: isPessoaFisica.value ? 'nome' : 'razao-social',
}));
const fieldIdentificacaoFiscal = computed(() => ({
  label: isPessoaFisica.value ? 'CPF' : 'CNPJ',
  name: isPessoaFisica.value ? 'cpf' : 'cnpj',
}));
const fieldData = computed(() => ({
  label: isPessoaFisica.value ? 'Data de nascimento' : 'Data de abertura',
  name: isPessoaFisica.value ? 'data-nascimento' : 'data-abertura',
}));
</script>
