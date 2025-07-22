import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import Home from '../pages/index.vue'
import Admin from '../pages/admin/index.vue'

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '',
                component: Home
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
