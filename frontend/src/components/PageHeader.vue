<template>
  <h1 class="page-header">{{ title }}</h1>
</template>

<script setup>
defineProps({ title: { type: String, required: true } });
</script>

<style scoped>
.page-header {
  margin-bottom: 50px;
  font-size: 30px;
}
</style>
