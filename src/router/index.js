import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';

import Home from '../pages/index.vue';
import ProductsPage from '../pages/products.vue';
import ProducDetail from '../pages/detail.vue';
import LoginPage from '../pages/auth/login.vue';
import RegisterPage from '../pages/auth/register.vue';
import ProfilePage from '../pages/profile.vue';
import VoucherPage from '../pages/voucher.vue';
import AboutPage from '../pages/about.vue';
import ContactPage from '../pages/contacts.vue';
import CartPage from '../pages/cart.vue';
import OrderTracking from '../pages/order-tracking.vue';
import BlogPage from '../pages/blogs.vue';
import CheckOutPage from '../pages/checkout.vue';
import FavoriteProductPage from '../pages/favorite.vue';

import Admin from '../pages/admin/index.vue';
import ProductsPageAdmin from '../pages/admin/products/index.vue';
import ProductsCreate from '../pages/admin/products/create.vue';

import { authGuard } from './middleware/auth';

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
                // meta: { requiresAuth: true, requiresUser: true }
            },
            {
                path: '/san-pham/:slug',
                component: ProducDetail
            },
            {
                path: '/trang-ca-nhan',
                component: ProfilePage
            },
            {
                path: '/kho-voucher',
                component: VoucherPage
            },
            {
                path: '/gioi-thieu',
                component: AboutPage
            },
            {
                path: '/lien-he',
                component: ContactPage
            },
            {
                path: '/gio-hang',
                component: CartPage
            },
            {
                path: '/tra-cuu-don-hang',
                component: OrderTracking
            },
            {
                path: '/tin-tuc',
                component: BlogPage
            },
            {
                path: '/thanh-toan',
                component: CheckOutPage
            },
            {
                path: '/san-pham-yeu-thich',
                component: FavoriteProductPage
            }
        ]
    },
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            {
                path: '',
                component: Admin
            },
            {
                path: '/admin/products',
                component: ProductsPageAdmin
            },
            {
                path: '/admin/products/create',
                component: ProductsCreate
            }
        ]
        // meta: { requiresAuth: true, requiresAdmin: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(authGuard)

export default router
