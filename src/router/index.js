import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import Home from '../pages/index.vue'
import ProductsPage from '../pages/products.vue'
import LoginPage from '../pages/auth/login.vue'
import RegisterPage from '../pages/auth/register.vue'

import Admin from '../pages/admin/index.vue'
import { authGuard } from './middleware/auth'

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '',
                component: Home
            },
            {
                path: '/login',
                component: LoginPage,
                meta: { guestOnly: true }
            },
            {
                path: '/register',
                component: RegisterPage,
                meta: { guestOnly: true }
            },
            {
                path: '/san-pham',
                component: ProductsPage,
                meta: { requiresAuth: true, requiresUser: true }
            }
        ]
    },
    {
        path: '/admin',
        component: Admin,
        meta: { requiresAuth: true, requiresAdmin: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(authGuard)

export default router
