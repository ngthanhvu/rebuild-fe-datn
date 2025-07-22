<template>
    <div class="mt-3 bg-white p-8 rounded-[5px]">
        <div class="flex justify-between items-center mb-3">
            <h2 class="text-2xl font-semibold text-gray-800">Sản phẩm mới</h2>
            <NuxtLink to="/products/new" class="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Xem tất cả →
            </NuxtLink>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div v-for="i in 5" :key="i" class="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                <div class="h-80 bg-gray-200"></div>
                <div class="p-4">
                    <div class="h-4 bg-gray-200 rounded mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded mb-2"></div>
                    <div class="h-6 bg-gray-200 rounded mb-2"></div>
                    <div class="h-8 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center py-8">
            <div class="text-red-500 mb-4">{{ error }}</div>
            <button @click="fetchNewProducts" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Thử lại
            </button>
        </div>

        <!-- Product Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <Card v-for="product in products.slice(0, 5)" :key="product.id" :product="product" />
        </div>

        <!-- Empty -->
        <div v-if="!isLoading && !error && products.length === 0" class="text-center py-8">
            <p class="text-gray-500">Chưa có sản phẩm mới</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '../UI/Card.vue'

// Tạm thời dùng data cứng
const isLoading = ref(false)
const error = ref(null)

const products = ref([
    {
        id: 1,
        slug: 'ao-thun-basic',
        name: 'Áo thun basic nam cotton thoáng mát',
        price: 199000,
        discount_price: 159000,
        categories_id: 1,
        images: [
            {
                is_main: 1,
                image_path: 'https://placehold.co/300x400?text=Product+1'
            }
        ],
        variants: [
            { color: '#000000' },
            { color: '#f87171' },
            { color: '#60a5fa' }
        ]
    },
    {
        id: 2,
        slug: 'quan-jean-nam',
        name: 'Quần jean nam ống đứng trẻ trung',
        price: 299000,
        discount_price: 0,
        categories_id: 2,
        images: [
            {
                is_main: 1,
                image_path: 'https://placehold.co/300x400?text=Product+2'
            }
        ],
        variants: [{ color: '#334155' }]
    },
    {
        id: 3,
        slug: 'ao-khoac-du',
        name: 'Áo khoác dù 2 lớp chống nước',
        price: 399000,
        discount_price: 349000,
        categories_id: 1,
        images: [
            {
                is_main: 1,
                image_path: 'https://placehold.co/300x400?text=Product+3'
            }
        ],
        variants: [
            { color: '#facc15' },
            { color: '#4ade80' }
        ]
    },
    {
        id: 4,
        slug: 'giay-sneaker',
        name: 'Giày sneaker năng động cho nam',
        price: 499000,
        discount_price: 450000,
        categories_id: 3,
        images: [
            {
                is_main: 1,
                image_path: 'https://placehold.co/300x400?text=Product+4'
            }
        ],
        variants: [
            { color: '#ffffff' },
            { color: '#1e3a8a' }
        ]
    },
    {
        id: 5,
        slug: 'non-nam',
        name: 'Nón nam thời trang',
        price: 99000,
        discount_price: 0,
        categories_id: 4,
        images: [
            {
                is_main: 1,
                image_path: 'https://placehold.co/300x400?text=Product+5'
            }
        ],
        variants: []
    }
])
</script>
