import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    component: App,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/')
  } else {
    next()
  }
})

export default router