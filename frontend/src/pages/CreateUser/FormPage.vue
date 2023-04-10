<template>
  <div class="page">
    <header class="page__header">
      <div class="stepper">
        <div
          v-for="(step, index) in stepHeaders"
          :key="step & { index }"
          v-show="currentStepIndex === index"
          :class="{ currentStepIndex }"
        >
          Etapa <span style="color: orange"> {{ index + 1 }}</span> de
          {{ stepHeaders.length }} <br />
          <h2>{{ step.title }}</h2>
        </div>
      </div>
    </header>

    <section class="page__content">
      <form>
        <Step1
          v-if="currentStepIndex === 0"
          :options="options"
          :form-data="formData"
          @update:form-data="updateFormData($event)"
        />
        <Step2
          v-if="currentStepIndex === 1"
          :form-data="formData"
          @update:form-data="updateFormData($event)"
        />
        <Step3
          v-if="currentStepIndex === 2"
          :form-data="formData"
          @update:form-data="updateFormData($event)"
        />
        <Step4
          v-if="currentStepIndex === 3"
          :form-data="formData"
          @update:form-data="updateFormData($event)"
        />
      </form>
    </section>

    <div class="page__footer">
      <DefaultButton v-if="!isFirstStep" type="cancel" @click="backToPrevStep">
        Voltar
      </DefaultButton>
      <DefaultButton
        type="primary"
        :disabled="!hasSelectedPessoa"
        @click="isLastStep ? submitForm() : goToNextStep()"
      >
        {{ isLastStep ? 'Cadastrar' : 'Continuar' }}
      </DefaultButton>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Step1, Step2, Step3, Step4 } from './components/';
import { DefaultButton } from '../../components/';

const currentStepIndex = ref(0);
const stepHeaders = computed(() => [
  'Seja bem vindo(a)',
  `Pessoa ${isPessoaFisica.value ? 'Física' : 'Jurídica'}`,
  'Senha de acesso',
  'Revise suas informações',
]);
const options = ref([
  {
    label: 'Pessoa Física',
    value: 'fisica',
  },
  {
    label: 'Pessoa Jurídica',
    value: 'juridica',
  },
]);
const formData = ref({
  email: '',
  tipoPessoa: '',
  nome: '',
  identificacaoFiscal: '',
  data: '',
  telefone: '',
  senha: '',
});
const isPessoaFisica = computed(() => {
  return formData.value.tipoPessoa === options.value[0].value;
});
const isPessoaJuridica = computed(() => {
  return formData.value.tipoPessoa === options.value[1].value;
});
const hasSelectedPessoa = computed(() => {
  return isPessoaJuridica.value || isPessoaFisica.value;
});
const isFirstStep = computed(() => {
  return currentStepIndex.value === 0;
});
const isLastStep = computed(() => {
  return currentStepIndex.value === stepHeaders.value.length - 1;
});

function backToPrevStep() {
  if (!isFirstStep.value && hasSelectedPessoa.value) {
    currentStepIndex.value -= 1;
  }
}

function goToNextStep() {
  console.log(!isLastStep.value, hasSelectedPessoa.value);
  if (!isLastStep.value && hasSelectedPessoa.value) {
    currentStepIndex.value += 1;
  }
}

function schemmaPessoa() {
  const {
    nome,
    data,
    identificacaoFiscal,
    telefone,
    email,
    senha,
    tipoPessoa,
  } = formData.value;
  const pessoa = {
    email,
    telefone,
    senha,
  };

  switch (tipoPessoa) {
    case 'fisica': {
      pessoa.nome = nome;
      pessoa.cpf = identificacaoFiscal;
      pessoa.dataNascimento = data;
      break;
    }
    case 'juridica': {
      pessoa.razaoSocial = nome;
      pessoa.cnpj = identificacaoFiscal;
      pessoa.dataAbertura = data;
      break;
    }
    default:
      return {};
  }

  return pessoa;
}

function submitForm() {
  let pessoa = schemmaPessoa();

  console.log(pessoa);

  if (isPessoaFisica.value) {
    //cadastrar pessoa fisica
  }
  if (isPessoaJuridica.value) {
    //cadastrar pessoa juridica
  }
}

function updateFormData(data) {
  formData.value = data;
}
</script>

<style scoped>
.page {
  max-width: 400px;
}
</style>
