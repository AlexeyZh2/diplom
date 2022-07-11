import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "../Views/MainPage.vue";
import LoginForm from "../Views/LoginForm.vue";
import RegisterForm from "../Views/RegisterForm.vue";

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,

        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/signin',
        name: 'login',
        component: LoginForm,
        meta: {
            guest: true
        }
    },
    {
        path: '/signup',
        name: 'register',
        component: RegisterForm,
        meta: {
            guest: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})



router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/signin',
                params: { nextUrl: to.fullPath }
            })
        } else { next()
           
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
         }
        else {
            next({ name: 'MainPage' })
        }
    } else {
        next()
    }
})



export default router;
