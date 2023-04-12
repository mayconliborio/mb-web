<template>
  <div class="text-field">
    <label :for="name">{{ label }}</label>
    <input
      :id="name"
      v-model="internValue"
      :type="type"
      @input="$emit('update:value', $event.target.value)"
    />
    <span v-show="errorMessage" class="error-message"> {{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { validateDate } from '../composables/date.js';

const emit = defineEmits(['emit-error', 'update:value']);

const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String || Number,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  validator: {
    type: Function,
    default: () => {},
  },
  type: {
    type: String,
    default: 'text',
  },
});

const errorMessage = ref('');

const internValue = ref('');

//sempre que o valor for alterado, é emitido esse evento emitError que envia um id e o erro caso exista
function emitError() {
  emit('emit-error', { message: errorMessage.value, id: props.name });
}

watch(internValue, (newValue) => {
  // esse validator é uma função que recebemos por parametro, espera-se que essa função retorne true ou uma string que seria o erro caso a validação falhe
  //ex: validator: (senha) => senha.length < 6 || 'Senha muito curta'
  if (props.validator) {
    let validate = props.validator(newValue);
    if (typeof validate === 'string') {
      errorMessage.value = validate;
    } else {
      errorMessage.value = '';
    }
  }
  // aqui se passamos a prop required validamos se o campo está vazio
  if (props.required && newValue.length === 0) {
    errorMessage.value = 'Campo obrigatório!';
  } else {
    errorMessage.value = '';
  }

  //aqui emitimos o erro
  emitError();
});

//ao montar o componente carregamos com o valor pre alocado e se required iniciamos a validação
onMounted(() => {
  internValue.value = props.value;

  if (props.type === 'date') {
    const input = document.getElementById(props.name);

    if (input)
      input.addEventListener('input', () => {
        errorMessage.value = validateDate(input.value);
        emitError();
      });
  }

  if (props.required && internValue.value.length === 0) {
    errorMessage.value = 'Campo obrigatório!';
  }

  emitError();
});
</script>

<style scoped>
.text-field {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5px 0;
  width: 100%;
}

label {
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid black;
  border-radius: 6px;
  box-sizing: border-box;
}

.error-message {
  font-size: 12px;
  color: red;
  margin-top: 2px;
}
</style>
