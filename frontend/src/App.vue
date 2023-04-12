<template>
  <div class="background">
    <div class="app__header">
      <nav class="nav-bar">
        <router-link to="/register" class="logo">MB - WEB</router-link>
        <ul>
          <li class="nav-item">
            <router-link to="/register"> Cadastrar Usuário </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/users"> Usuários Cadastrados </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div ref="pageContentRef" class="app__content">
      <MessageSnackBar />
      <router-view />
    </div>
    <div class="app__footer" :class="{ fixed: isPageSmallWindow }">
      <p>
        Desenvolvido por Maycon Liborio -
        <a target="_blank" href="https://github.com/mayconliborio">Github</a>
        -
        <a target="_blank" href="https://www.linkedin.com/in/mayconliborio/"
          >Linkedin</a
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { MessageSnackBar } from './components/';

const pageContentRef = ref(null);

const pageContentHeight = ref(0);
const windowHeight = computed(() => window.innerHeight || 0);

const isPageSmallWindow = computed(
  () => pageContentHeight.value < windowHeight.value
);

onMounted(() => {
  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      pageContentHeight.value = entry.target.offsetHeight;
    }
  });

  observer.observe(pageContentRef.value);
});
</script>

<style scoped>
.background {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app__header {
  height: 50px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav-bar {
  width: 80%;
  display: flex;
  justify-content: space-between;
}

.logo {
  text-decoration: none;
  color: inherit;
  font-size: 26px;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-bar ul {
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
}

.nav-item {
  display: inline-block;
  margin: 0;
  padding: 0;
}

.nav-item a {
  font-size: 18px;
  display: block;
  text-decoration: none;
  color: #333;
  padding: 10px 20px;
  transition: all 0.2s;
}

.nav-item a:hover {
  color: orange;
}

.nav-item .active {
  color: orange !important;
}

.app__footer {
  bottom: 0;
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
  background-color: #f5f5f5;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;
}
.app__footer a {
  color: orange;
  text-decoration: none;
}

.app__footer a:hover {
  color: #ffb84d;
}

.fixed {
  position: fixed;
  bottom: 0;
}

.app__content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
