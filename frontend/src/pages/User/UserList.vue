<template>
  <div class="page">
    <div class="page__header">
      <PageHeader title="Usuários Cadastrados" />
    </div>
    <div class="page__content">
      <DefaultLoading v-if="loading" />
      <div v-if="!loading && hasUsers" class="card-list">
        <CardUser
          v-for="(user, index) in users"
          :key="`user-${index}`"
          :user="user"
        ></CardUser>
      </div>
      <div v-if="!loading && !hasUsers" class="not-found-message">
        <span>Nenhum usuário encontrado</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { CardUser } from './components/';
import { DefaultLoading, PageHeader } from '../../components/';
import axios from 'axios';
import { useSnackbarStore } from '../../store/snackbar';

const snackbarStore = useSnackbarStore();

const loading = ref(false);
const users = ref([]);

const hasUsers = computed(() => users.value.length > 0);

async function getAllUser() {
  loading.value = true;
  await axios
    .get('http://localhost:3000/users')
    .then((res) => {
      users.value = res.data;
    })
    .catch((e) => {
      const data = e?.response?.data;
      let message = 'Falha ao consultar usuários!',
        status = 'error';

      if (data) {
        message = data.message;
        status = data.status;
      }

      snackbarStore.showSnackbar({ message, type: status });
    })
    .finally(() => {
      loading.value = false;
    });
}

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
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  gap: 20px;
}
.page__header {
  margin-bottom: 20px;
}
.page__content {
  width: 80%;
}

.not-found-message {
  width: 100%;
  text-align: center;
  color: rgba(20, 20, 20, 0.7);
  font-size: 18px;
}
</style>
