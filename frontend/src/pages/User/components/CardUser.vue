<template>
  <div class="card">
    <div class="card-content">
      <CardRow
        v-for="(data, index) in userData"
        :key="`user-${index}`"
        :label="data.label"
        :value="data.value"
      />
    </div>
  </div>
</template>

<script setup>
import { CardRow } from '../../../components/index.js';
import { computed } from 'vue';
const props = defineProps({
  user: {
    type: Object,
    default: () => {},
  },
});

const isPessoaFisica = computed(() => props.user.tipoPessoa === 'fisica');

const userData = computed(() => {
  let isPF = isPessoaFisica.value;

  return {
    nome: {
      label: isPF ? 'Nome' : 'Razão Social',
      value: props.user.nome,
    },
    identificacaoFiscal: {
      label: isPF ? 'CPF' : 'CNPJ',
      value: props.user.identificacaoFiscal,
    },
    dataRegistro: {
      label: isPF ? 'Data de Nascimento' : 'Data de Abertura',
      value: props.user.dataRegistro,
    },
    email: {
      label: 'Email',
      value: props.user.email,
    },
    telefone: {
      label: 'Telefone',
      value: props.user.telefone,
    },
  };
});
</script>

<style scoped>
.card {
  box-sizing: border-box;
  background-color: #fff;
  font-size: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

.card-content {
  display: flex;
  flex-direction: column;
}
</style>
