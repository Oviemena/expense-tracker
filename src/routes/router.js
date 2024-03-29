import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'

const routes = [
  { path: '/', component: Home, },
  { path: '/user/login', component: Login },
  { path: '/user/register', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router