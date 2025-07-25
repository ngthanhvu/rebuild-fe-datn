<template>
    <div class="mt-3 bg-white p-8 rounded-[10px]">
        <h2 class="text-2xl font-semibold text-gray-800 mb-3">Bài viết nổi bật</h2>

        <!-- Loading State -->
        <div v-if="loading" class="flex gap-6 justify-center mb-6">
            <div v-for="i in 3" :key="i" class="blog-card" style="width: 100%; max-width: 400px;">
                <div class="image-container bg-gray-200 animate-pulse"></div>
                <div class="blog-card-content">
                    <div class="h-4 bg-gray-200 rounded mb-2 w-32"></div>
                    <div class="h-6 bg-gray-200 rounded mb-2 w-48"></div>
                    <div class="h-4 bg-gray-200 rounded mb-2 w-64"></div>
                    <div class="h-4 bg-gray-200 rounded mb-2 w-56"></div>
                    <div class="h-6 bg-gray-200 rounded w-24"></div>
                </div>
            </div>
        </div>

        <!-- Không có dữ liệu -->
        <div v-else-if="!latestBlogs.length" class="text-center text-gray-500 my-6">
            Không có bài viết
        </div>

        <!-- Swiper hiển thị blog -->
        <swiper v-else :modules="[SwiperPagination]" :slides-per-view="1" :space-between="0"
            :pagination="{ clickable: true }" :breakpoints="{
                '640': { slidesPerView: 2, spaceBetween: 16 },
                '1024': { slidesPerView: 3, spaceBetween: 24 }
            }" class="w-full">
            <swiper-slide v-for="blog in latestBlogs" :key="blog.id">
                <router-link :to="`/blog/${blog.slug}`" class="no-underline text-gray-900">
                    <div class="blog-card border border-gray-100">
                        <div class="image-container">
                            <img v-if="blog.image" :src="blog.image" :alt="blog.title"
                                class="w-full h-full object-cover" />
                            <div v-else class="bg-gray-200 w-full h-full flex items-center justify-center">
                                <span class="text-gray-500">Không có hình ảnh</span>
                            </div>
                        </div>
                        <div class="blog-card-content">
                            <div class="flex items-center text-sm text-gray-500 mb-2">
                                <span>{{ formatDate(blog.published_at || blog.created_at) }}</span>
                                <span class="mx-2">•</span>
                                <span>{{ blog.author?.username || 'Unknown' }}</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 line-clamp-2 cursor-pointer">{{ blog.title }}</h3>
                            <p class="text-gray-600 mb-4 line-clamp-3">{{ blog.description }}</p>
                            <div class="text-[#81aacc] font-medium hover:underline cursor-pointer">Đọc thêm</div>
                        </div>
                    </div>
                </router-link>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const loading = ref(false)

const latestBlogs = ref([
    {
        id: 1,
        title: '5 mẹo chăm sóc da vào mùa hè',
        description: 'Khám phá cách giữ làn da khỏe mạnh trong những ngày nắng nóng.',
        image: 'https://placehold.co/600x400?text=Blog+1',
        slug: 'meo-cham-soc-da-mua-he',
        published_at: '2024-07-10',
        author: {
            username: 'beauty_admin'
        }
    },
    {
        id: 2,
        title: 'Top 10 sản phẩm bán chạy tháng 6',
        description: 'Danh sách những sản phẩm được yêu thích nhất trong tháng 6.',
        image: 'https://placehold.co/600x400?text=Blog+2',
        slug: 'san-pham-ban-chay-thang-6',
        published_at: '2024-07-01',
        author: {
            username: 'shop_editor'
        }
    },
    {
        id: 3,
        title: 'Hướng dẫn chọn kem chống nắng phù hợp',
        description: 'Tìm hiểu cách chọn loại kem chống nắng phù hợp với từng loại da.',
        image: '',
        slug: 'chon-kem-chong-nang',
        published_at: '2024-06-25',
        author: {
            username: 'skin_expert'
        }
    }
])

const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}
</script>

<style scoped>
.swiper-slide {
    height: auto !important;
    display: flex;
    align-items: stretch;
}

.blog-card {
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    background: #fff;
    overflow: hidden;
    transition: border 0.2s, box-shadow 0.2s;
}

.image-container {
    width: 100%;
    height: 200px;
    min-height: 200px;
    max-height: 200px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
}

.blog-card-content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    padding: 1.5rem;
    min-height: 0;
}

h3.line-clamp-2 {
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5em;
}

.line-clamp-3 {
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5em;
}

.blog-card:hover h3.line-clamp-2 {
    color: #81AACC;
}
</style>
