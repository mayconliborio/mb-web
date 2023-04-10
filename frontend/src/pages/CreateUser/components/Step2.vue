<template>
  <FieldText
    :label="nome.label"
    :name="nome.name"
    :value="formData.nome"
    @update:value="emit('update:form-data', { ...formData, nome: $event })"
  />
  <FieldText
    :label="identificacaoFiscal.label"
    :name="identificacaoFiscal.name"
    :value="formData.identificacaoFiscal"
    @update:value="
      emit('update:form-data', { ...formData, identificacaoFiscal: $event })
    "
  />
  <FieldText
    :label="data.label"
    :name="data.name"
    :value="formData.data"
    @update:value="emit('update:form-data', { ...formData, data: $event })"
  />
  <FieldText
    label="Telefone"
    name="telefone"
    :value="formData.telefone"
    @update:value="emit('update:form-data', { ...formData, telefone: $event })"
  />
</template>

<script setup>
import FieldText from '../../../components/TextField.vue';

const emit = defineEmits(['update:form-data']);

const props = defineProps({
  formData: {
    type: Object,
  },
  isPessoaFisica: Boolean,
});

const nome = {
    label: props.isPessoaFisica ? 'Nome' : 'Razão Social',
    name: props.isPessoaFisica ? 'nome' : 'razao-social',
  },
  identificacaoFiscal = {
    label: props.isPessoaFisica ? 'CPF' : 'CNPJ',
    name: props.isPessoaFisica ? 'cpf' : 'cnpj',
  },
  data = {
    label: props.isPessoaFisica ? 'Data de nascimento' : 'Data de abertura',
    name: props.isPessoaFisica ? 'data-nascimento' : 'data-abertura',
  };
</script>
