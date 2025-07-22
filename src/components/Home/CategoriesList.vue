<template>
    <section class="bg-white py-10 rounded-[5px]">
        <div class="container mx-auto">
            <h2 class="text-2xl font-semibold text-center mb-10">Thời trang DevGang</h2>

            <!-- Loading State -->
            <div v-if="isLoadingCategories" class="flex gap-6 justify-center mb-6">
                <div v-for="i in 6" :key="i" class="flex flex-col items-center">
                    <div class="w-36 h-36 rounded-full bg-gray-200 animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded mt-4 mb-2 w-24"></div>
                    <div class="h-4 bg-gray-200 rounded w-16"></div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="!categories.length" class="text-center text-gray-500 my-6">
                Không có dữ liệu
            </div>

            <!-- Swiper Content -->
            <swiper v-else :modules="[SwiperPagination]" :slides-per-view="5" :space-between="8"
                :pagination="{ clickable: true }" :breakpoints="{
                    320: { slidesPerView: 2, spaceBetween: 8 },
                    640: { slidesPerView: 3, spaceBetween: 8 },
                    768: { slidesPerView: 4, spaceBetween: 8 },
                    1024: { slidesPerView: 6, spaceBetween: 8 }
                }" class="categories-swiper">
                <swiper-slide v-for="category in categories" :key="category.id">
                    <NuxtLink :to="`/category/${category.slug}`"
                        class="flex flex-col items-center space-y-3 transition-transform duration-300 hover:scale-90 pb-3">
                        <div
                            class="w-36 h-36 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden">
                            <img :src="category.image" :alt="category.name" class="w-28 h-28 object-contain" />
                        </div>
                        <p class="text-base font-medium">{{ category.name }}</p>
                        <p class="text-sm text-gray-500">{{ category.products_count }} sản phẩm</p>
                    </NuxtLink>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// Dữ liệu cứng
const isLoadingCategories = ref(false)

const categories = ref([
    {
        id: 1,
        name: 'Áo thun',
        slug: 'ao-thun',
        image: 'https://placehold.co/150x150?text=Áo+thun',
        products_count: 12
    },
    {
        id: 2,
        name: 'Áo khoác',
        slug: 'ao-khoac',
        image: 'https://placehold.co/150x150?text=Áo+khoác',
        products_count: 8
    },
    {
        id: 3,
        name: 'Quần jean',
        slug: 'quan-jean',
        image: 'https://placehold.co/150x150?text=Quần+jean',
        products_count: 14
    },
    {
        id: 4,
        name: 'Phụ kiện',
        slug: 'phu-kien',
        image: 'https://placehold.co/150x150?text=Phụ+kiện',
        products_count: 6
    },
    {
        id: 5,
        name: 'Đồng hồ',
        slug: 'dong-ho',
        image: 'https://placehold.co/150x150?text=Đồng+hồ',
        products_count: 4
    },
    {
        id: 6,
        name: 'Túi xách',
        slug: 'tui-xach',
        image: 'https://placehold.co/150x150?text=Túi+xách',
        products_count: 9
    }
])
</script>

<style scoped>
:deep(.swiper-pagination) {
    margin-bottom: -10px;
}

:deep(.swiper-pagination-bullet) {
    width: 24px !important;
    height: 6px !important;
    border-radius: 3px !important;
    background: #d0d2d6 !important;
    transition: background 0.2s;
}

:deep(.swiper-pagination-bullet-active) {
    background: #81aacc !important;
}
</style>
