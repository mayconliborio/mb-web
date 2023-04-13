<template>
  <div class="page">
    <header class="page__header">
      <PageHeader title="Cadastro de Usuário"></PageHeader>
      <div class="stepper">
        <!-- Renderizamos os titulos dos steps aqui -->
        <div
          v-for="(step, index) in steps"
          v-show="currentStepIndex === index"
          :key="`step-${index}`"
        >
          <p>
            Etapa <span class="primary-color"> {{ index + 1 }}</span> de
            {{ steps.length }}
          </p>
          <h2>{{ step.header }}</h2>
        </div>
      </div>
    </header>

    <section class="page__content">
      <form>
        <!-- Renderizamos os steps aqui -->
        <div v-for="(step, index) in steps" :key="`step-${index}`">
          <component
            :is="step?.component"
            v-if="step?.component && index === currentStepIndex"
            :dados-formulario="dadosFormulario"
            @emit-error="errorManager($event)"
            @update:dados-formulario="updateDadosFormulario($event)"
          ></component>
        </div>
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

      <!-- God Mode pra preencher todos os dados -->
      <div v-if="isFirstStep" class="god-mode-box">
        <h3 class="god-mode-header red-color">God Mode</h3>
        <div class="button-row">
          <DefaultButton
            text="Preencher CPF"
            color="red"
            :action="() => setMockedData(PESSOA_FISICA)"
          />
          <DefaultButton
            text="Preencher CNPJ"
            color="red"
            :action="() => setMockedData(PESSOA_JURIDICA)"
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
import axios from 'axios';
import { MOCK_CPF, MOCK_CNPJ } from './mock/formData.js';
import { PESSOA_FISICA, PESSOA_JURIDICA } from './utils/sharedData.js';

import { useSnackbarStore } from '../../store/snackbar';

const snackbarStore = useSnackbarStore();

const currentStepIndex = ref(0);
const errors = ref([]);

const dadosFormulario = ref({
  email: '',
  tipoPessoa: '',
  nome: '',
  identificacaoFiscal: '',
  dataRegistro: '',
  telefone: '',
  senha: '',
});

const steps = computed(() => {
  return [
    {
      header: 'Seja bem vindo(a)',
      component: Step1,
    },
    {
      header: `Pessoa ${isPessoaFisica.value ? 'Física' : 'Jurídica'}`,
      component: Step2,
    },
    {
      header: 'Senha de acesso',
      component: Step3,
    },
    {
      header: 'Senha de acesso',
      component: Step4,
    },
  ];
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

const lastStepIndex = computed(() => steps.value.length - 1);

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

function showMessageSnackBar(message, type) {
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
      showMessageSnackBar('Usuário cadastrado com sucesso!', 'success');
    })
    .catch((e) => {
      const data = e?.response?.data;
      let message = 'Falha ao cadastrar usuário',
        status = 'error';

      if (data) {
        message = data.message;
        status = data.status;
      }

      showMessageSnackBar(message, status);
    });
}

function setMockedData(mockOption) {
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

//Sempre que um componente input é alterado um "erro" é emitido e gerenciado por essa função
//O erro pode valido se tiver uma mensagem valida ou invalido se não tiver mensagem
// ex: valido    -   {id: 1, message: 'Mensagem de erro'}
// ex: invalido  -   {id: 1, message: ''}
function errorManager(error) {
  //se o input já tem um erro anterior cadastrado, encontramos aqui pelo seu id
  let errorIndex = errors.value.findIndex((e) => e.id === error.id);

  let isValidError = error.message.length > 0;

  //se o erro é valido e ainda não temos registro de erro do ID informado incluimos ele aqui
  if (errorIndex < 0 && isValidError) {
    errors.value.push(error);
  }

  //se o erro é valido e já tinhamos um registro de erro para esse id, substituimos a mensagem de erro
  if (errorIndex >= 0 && isValidError) {
    errors.value[errorIndex].message = error.message;
  }

  //se o erro é invalido e o input tinha um erro anterior, removemos ele do nosso array de erros
  if (!isValidError && errorIndex >= 0) {
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
