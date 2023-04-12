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

const emit = defineEmits(['update:dados-formulario', 'emit-error']);

const props = defineProps({
  dadosFormulario: {
    type: Object,
    default: () => ({}),
  },
  isPessoaFisica: Boolean,
});

const fieldNome = {
    label: props.isPessoaFisica ? 'Nome' : 'Razão Social',
    name: props.isPessoaFisica ? 'nome' : 'razao-social',
  },
  fieldIdentificacaoFiscal = {
    label: props.isPessoaFisica ? 'CPF' : 'CNPJ',
    name: props.isPessoaFisica ? 'cpf' : 'cnpj',
  },
  fieldData = {
    label: props.isPessoaFisica ? 'Data de nascimento' : 'Data de abertura',
    name: props.isPessoaFisica ? 'data-nascimento' : 'data-abertura',
  };
</script>
