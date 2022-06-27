import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "../Views/MainPage.vue";
import LoginForm from "../Views/LoginForm.vue";
import RegisterForm from "../Views/RegisterForm.vue";

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  
  {
    path: '/signin',
    name: 'loginForm',
    component: LoginForm
  },
  {
    path: '/signup',
    name: 'registerForm',
    component: RegisterForm
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router