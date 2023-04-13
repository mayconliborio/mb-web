<template>
  <div class="page">
    <header class="page__header">
      <PageHeader title="Cadastro de Usuário"></PageHeader>
      <div class="stepper">
        <div
          v-for="(step, index) in stepHeaders"
          v-show="currentStepIndex === index"
          :key="`step-${index}`"
        >
          <p>
            Etapa <span class="primary-color"> {{ index + 1 }}</span> de
            {{ stepHeaders.length }}
          </p>
          <h2>{{ step }}</h2>
        </div>
      </div>
    </header>

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

    <footer class="page__footer">
      <div class="button-row" :class="{ 'solo-button': isFirstStep }">
        <DefaultButton
          v-if="!isFirstStep"
          color="cancel"
          :action="backToPrevStep"
          text="Voltar"
        />
        <DefaultButton
          color="primary"
          :disabled="(!hasSelectedPessoa && isFirstStep) || errors.length > 0"
          :text="isLastStep ? 'Cadastrar' : 'Continuar'"
          :action="isLastStep ? registerUser : goToNextStep"
        />
      </div>

      <div v-if="isFirstStep" class="god-mode-box">
        <h3 class="god-mode-header red-color">God Mode</h3>
        <div class="button-row">
          <DefaultButton
            text="Preencher CPF"
            color="red"
            :action="() => setMockData(PESSOA_FISICA)"
          />
          <DefaultButton
            text="Preencher CNPJ"
            color="red"
            :action="() => setMockData(PESSOA_JURIDICA)"
          />
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Step1, Step2, Step3, Step4 } from './components/';
import { DefaultButton, PageHeader } from '../../components/';
import { formatDate } from '../../composables/date.js';
import { useSnackbarStore } from '../../store/snackbar';
import axios from 'axios';
import { MOCK_CPF, MOCK_CNPJ } from './mock/formData.js';

const PESSOA_FISICA = 'fisica',
  PESSOA_JURIDICA = 'juridica';

const snackbarStore = useSnackbarStore();

const currentStepIndex = ref(0);
const errors = ref([]);

const options = ref({
  fisica: {
    label: 'Pessoa Física',
    value: PESSOA_FISICA,
  },
  juridica: {
    label: 'Pessoa Jurídica',
    value: PESSOA_JURIDICA,
  },
});

const dadosFormulario = ref({
  email: '',
  tipoPessoa: '',
  nome: '',
  identificacaoFiscal: '',
  dataRegistro: '',
  telefone: '',
  senha: '',
});

const stepHeaders = computed(() => [
  'Seja bem vindo(a)',
  `Pessoa ${isPessoaFisica.value ? 'Física' : 'Jurídica'}`,
  'Senha de acesso',
  'Revise suas informações',
]);

const isPessoaFisica = computed(() => {
  return dadosFormulario.value.tipoPessoa === PESSOA_FISICA;
});

const isPessoaJuridica = computed(() => {
  return dadosFormulario.value.tipoPessoa === PESSOA_JURIDICA;
});

const hasSelectedPessoa = computed(() => {
  return isPessoaJuridica.value || isPessoaFisica.value;
});

const lastStepIndex = computed(() => stepHeaders.value.length - 1);

const isFirstStep = computed(() => {
  return currentStepIndex.value === 0;
});

const isLastStep = computed(() => {
  return currentStepIndex.value === lastStepIndex.value;
});

function backToPrevStep() {
  if (!isFirstStep.value && hasSelectedPessoa.value) {
    errors.value = [];
    currentStepIndex.value -= 1;
  }
}

function goToNextStep() {
  if (!isLastStep.value && hasSelectedPessoa.value) {
    currentStepIndex.value += 1;
  }
}

function callSnackBar(message, type) {
  snackbarStore.showSnackbar({ message, type });
}

async function registerUser() {
  const payload = {
    ...dadosFormulario.value,
    dataRegistro: formatDate(dadosFormulario.value.dataRegistro),
  };

  await axios
    .post('http://localhost:3000/registration', payload)
    .then(() => {
      resetDadosFormulario();
      currentStepIndex.value = 0;
      callSnackBar('Usuário cadastrado com sucesso!', 'success');
    })
    .catch((e) => {
      callSnackBar(e.toString(), 'error');
    });
}

function setMockData(mockOption) {
  switch (mockOption) {
    case PESSOA_FISICA: {
      dadosFormulario.value = MOCK_CPF;
      currentStepIndex.value = lastStepIndex.value;
      break;
    }
    case PESSOA_JURIDICA: {
      dadosFormulario.value = MOCK_CNPJ;
      currentStepIndex.value = lastStepIndex.value;
      break;
    }
    default: {
      resetDadosFormulario();
    }
  }
}

function resetDadosFormulario() {
  dadosFormulario.value = {
    email: '',
    tipoPessoa: '',
    nome: '',
    identificacaoFiscal: '',
    dataRegistro: '',
    telefone: '',
    senha: '',
  };
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
    errors.value[errorIndex].message = error.message;
  }

  //se não existe uma mensagem de erro, mas temos um erro anterior do mesmo ID, removemos ele
  if (!hasNewError && errorIndex >= 0) {
    errors.value.splice(errorIndex, 1);
  }
}
</script>

<style scoped>
.page {
  padding: 20px 0;
  min-width: 400px;
  width: auto;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.page__footer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.page__footer,
.page__content {
  margin-top: 20px;
}

.primary-color {
  color: orange;
}

.red-color {
  color: #772014;
}

.solo-button {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.god-mode-box {
  border-radius: 8px;
  box-sizing: border-box;
  padding: 20px 20px;
  width: 100%;
  min-width: 400px;
  text-align: center;
  margin-top: 100px;
}

.god-mode-header {
  margin-bottom: 40px;
}

.button-row {
  display: flex;
  justify-content: space-between;
}
</style>
