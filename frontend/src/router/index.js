import { createRouter, createWebHistory } from 'vue-router';
import UserRegister from '../pages/User/UserRegister.vue';
import UserList from '../pages/User/UserList.vue';

const routes = [
  { path: '/register', component: UserRegister },
  { path: '/users', component: UserList },
  { path: '/:catchAll(.*)', redirect: '/register' },
];

const router = new createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
});

export default router;
