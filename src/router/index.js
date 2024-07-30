import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from "@/views/admin/dashboard/index.vue";
import {useAuthStore} from "@/stores/authStore.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            redirect: "/"
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('../views/admin/auth/LoginView.vue')
        },
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                authRequired: true,
                breadcrumb: 'Dashboard'
            }
        },
        {
            path: '/users',
            name: 'users',
            component: () => import('@/views/admin/users/index.vue'),
            meta: {
                authRequired: true,
                breadcrumb: 'Users'
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const publicPages = ['login'];
    const authRequired = !publicPages.includes(to.name);
    const auth = useAuthStore();

    if (authRequired && !auth.token) {
        next({name: "login"})
    }else{
        if (to.name === "login" && auth.token) next({name: "dashboard"})
        next()
    }
})
export default router
