import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import Home from '../pages/index.vue'
import ProductsPage from '../pages/products.vue'

import Admin from '../pages/admin/index.vue'

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
                path: '/san-pham',
                component: ProductsPage
            }
        ]
    },
    {
        path: '/admin',
        component: Admin,
        meta: { layout: 'AdminLayout' }
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
