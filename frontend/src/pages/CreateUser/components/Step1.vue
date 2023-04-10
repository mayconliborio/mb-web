<template>
  <FieldText
    label="Endereço de e-mail"
    name="email"
    :value="formData.email"
    @update:value="emit('update:form-data', { ...formData, email: $event })"
  />
  <div class="form-row">
    <FieldRadioButton
      v-for="(option, index) in options"
      :key="index"
      :id="`option-${index + 1}`"
      :checked="formData.tipoPessoa === option.value"
      :label="option.label"
      :value="option.value"
      name="pessoa"
      @update:value="updateFormData($event)"
    />
  </div>
</template>

<script setup>
import FieldText from '../../../components/TextField.vue';
import FieldRadioButton from '../../../components/RadioButton.vue';

const props = defineProps({
  formData: {
    type: Object,
  },
  options: {
    type: Array,
  },
});

function updateFormData(data) {
  let newFormData = { ...props.formData, tipoPessoa: data.value };

  emit('update:form-data', newFormData);
}

const emit = defineEmits(['update:form-data']);
</script>

<style scoped></style>
