<template>
  <div class="page">
    <div class="page__header">
      <div class="stepper">
        <div
          v-for="(step, index) in stepHeaders"
          :key="`step-${index}`"
          v-show="currentStepIndex === index"
        >
          <p>
            Etapa <span style="color: orange"> {{ index + 1 }}</span> de
            {{ stepHeaders.length }}
          </p>
          <h2>{{ step }}</h2>
        </div>
      </div>
    </div>

    <section class="page__content">
      <form>
        <Step1
          v-if="currentStepIndex === 0"
          :options="options"
          :dados-formulario="dadosFormulario"
          @emit-error="errorManager($event)"
          @update:dados-formulario="updateDadosFormulario($event)"
        />
        <Step2
          v-if="currentStepIndex === 1"
          :dados-formulario="dadosFormulario"
          @emit-error="errorManager($event)"
          @update:dados-formulario="updateDadosFormulario($event)"
        />
        <Step3
          v-if="currentStepIndex === 2"
          :dados-formulario="dadosFormulario"
          @emit-error="errorManager($event)"
          @update:dados-formulario="updateDadosFormulario($event)"
        />
        <Step4
          v-if="currentStepIndex === 3"
          :dados-formulario="dadosFormulario"
          @emit-error="errorManager($event)"
          @update:dados-formulario="updateDadosFormulario($event)"
        />
      </form>
    </section>

    <div class="page__footer">
      <DefaultButton v-if="!isFirstStep" type="cancel" @click="backToPrevStep">
        Voltar
      </DefaultButton>
      <DefaultButton
        type="primary"
        :disabled="!hasSelectedPessoa || errors.length > 0"
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
const PESSOA_FISICA = 'fisica',
  PESSOA_JURIDICA = 'juridica';

const currentStepIndex = ref(0);
const errors = ref([]);
const stepHeaders = computed(() => [
  'Seja bem vindo(a)',
  `Pessoa ${isPessoaFisica.value ? 'Física' : 'Jurídica'}`,
  'Senha de acesso',
  'Revise suas informações',
]);
const options = ref({
  fisica: {
    label: 'Pessoa Física',
    value: PESSOA_JURIDICA,
  },
  juridica: {
    label: 'Pessoa Jurídica',
    value: PESSOA_FISICA,
  },
});

const dadosFormulario = ref({
  email: '',
  tipoPessoa: '',
  nome: '',
  identificacaoFiscal: '',
  data: '',
  telefone: '',
  senha: '',
});
const isPessoaFisica = computed(() => {
  return dadosFormulario.value.tipoPessoa === PESSOA_FISICA;
});
const isPessoaJuridica = computed(() => {
  return dadosFormulario.value.tipoPessoa === PESSOA_JURIDICA;
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
  if (!isLastStep.value && hasSelectedPessoa.value) {
    currentStepIndex.value += 1;
  }
}

function createTipoPessoa() {
  const {
    nome,
    data,
    identificacaoFiscal,
    telefone,
    email,
    senha,
    tipoPessoa,
  } = dadosFormulario.value;
  const pessoa = {
    email,
    telefone,
    senha,
  };

  switch (tipoPessoa) {
    case PESSOA_FISICA: {
      pessoa.nome = nome;
      pessoa.cpf = identificacaoFiscal;
      pessoa.dataNascimento = data;
      break;
    }
    case PESSOA_JURIDICA: {
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
  let pessoa = createTipoPessoa();

  console.log(pessoa);

  if (isPessoaFisica.value) {
    //cadastrar pessoa fisica
  }
  if (isPessoaJuridica.value) {
    //cadastrar pessoa juridica
  }

  dadosFormulario.value = {
    email: '',
    tipoPessoa: '',
    nome: '',
    identificacaoFiscal: '',
    data: '',
    telefone: '',
    senha: '',
  };

  currentStepIndex.value = 0;
}

function updateDadosFormulario(data) {
  dadosFormulario.value = data;
}

//Sempre que um campo é alterado um erro é emitido e gerenciado por essa função
function errorManager(error) {
  //se o erro já foi registrado o encontramos aqui
  let errorIndex = errors.value.findIndex((e) => e.id === error.id);
  //se existe uma mensagem de erro salvamos aqui
  let hasNewError = error.message.length > 0;

  //se existe uma mensagem de erro e ainda não registramos aquele id, o registramos aqui
  if (errorIndex < 0 && hasNewError) {
    errors.value.push(error);
  }

  //se o id ja foi cadastrado, substituimos a mensagem de erro
  if (errorIndex >= 0 && hasNewError) {
    errors[errorIndex].message = error.message;
  }

  //se não existe uma mensagem de erro mas temos um erro anterior do mesmo ID, removemos ele
  if (!hasNewError && errorIndex >= 0) {
    errors.value.splice(errorIndex, 1);
  }
}
</script>

<style scoped>
.page {
  max-width: 500px;
}
</style>
