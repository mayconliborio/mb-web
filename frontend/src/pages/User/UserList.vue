<template>
  <div class="page">
    <div class="page__header">
      <PageHeader title="Usuários Cadastrados" />
    </div>
    <div class="page__content">
      <DefaultLoading v-if="loading" />
      <div v-else class="card-list">
        <CardUser
          v-for="(user, index) in users"
          :key="`user-${index}`"
          :user="user"
        ></CardUser>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { CardUser } from './components/';
import { DefaultLoading, PageHeader } from '../../components/';
import axios from 'axios';

const loading = ref(false);

async function getAllUser() {
  loading.value = true;
  await axios
    .get('http://localhost:3000/users')
    .then((res) => {
      users.value = res.data;
    })
    .catch((e) => e)
    .finally(() => {
      loading.value = false;
    });
}

const users = ref([]);

onMounted(async () => {
  await getAllUser();
});
</script>

<style scoped>
.page {
  margin: 50px 0 0 0;
  min-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 2fr)
  ); /* 5 cards por linha */
  gap: 20px; /* espaçamento entre os cards */
}
.page__header {
  margin-bottom: 20px;
}
.page__content {
  width: 80%;
}
</style>
