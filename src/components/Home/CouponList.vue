<template>
    <div>
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold text-gray-800">Mã Giảm Giá Mới Nhất</h2>
            <NuxtLink to="/kho-voucher" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                Xem tất cả
                <i class="fa-solid fa-arrow-right"></i>
            </NuxtLink>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="i in 4" :key="i" class="flex max-w-xs w-full bg-white shadow-md rounded-md animate-pulse">
                <div class="left-edge bg-gray-300"></div>
                <div class="flex flex-col justify-center px-4 py-4 flex-1 space-y-2">
                    <div class="h-4 bg-gray-300 rounded"></div>
                    <div class="h-3 bg-gray-300 rounded"></div>
                    <div class="h-6 bg-gray-300 rounded w-20"></div>
                </div>
            </div>
        </div>

        <!-- Coupons -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="coupon in latestCoupons" :key="coupon.id"
                class="flex max-w-xs w-full bg-white shadow-md rounded-md"
                :class="{ 'opacity-60': getCouponStatus(coupon) !== 'active' }">
                <div class="left-edge flex items-center justify-center">
                    <i class="fa-solid fa-ticket text-white text-2xl"></i>
                </div>

                <div class="flex flex-col justify-center px-4 py-4 flex-1">
                    <p class="text-sm text-blue-600 font-semibold text-center">
                        NHẬP MÃ: <span class="font-normal">{{ coupon.code || 'N/A' }}</span>
                    </p>
                    <p class="text-xs text-gray-500 text-center mt-1 leading-tight">
                        {{ coupon.description || coupon.name || 'Không có mô tả' }}
                    </p>

                    <div class="mt-2 text-xs text-gray-600 text-center">
                        <div v-if="coupon.type === 'percent'">
                            Giảm {{ coupon.value }}%
                            <span v-if="coupon.max_discount_value">
                                tối đa {{ formatCurrency(coupon.max_discount_value) }}
                            </span>
                        </div>
                        <div v-else>Giảm {{ formatCurrency(coupon.value) }}</div>
                        <div v-if="coupon.min_order_value > 0">
                            Đơn tối thiểu: {{ formatCurrency(coupon.min_order_value) }}
                        </div>
                    </div>

                    <div class="mt-3 flex items-center justify-between">
                        <button v-if="getCouponStatus(coupon) === 'active' && !coupon.is_claimed"
                            class="bg-blue-600 text-white text-xs px-3 py-1 rounded-sm hover:bg-blue-700 transition">
                            Lấy ngay
                        </button>
                        <button v-else-if="getCouponStatus(coupon) === 'active' && coupon.is_claimed" disabled
                            class="bg-gray-300 text-white text-xs px-3 py-1 rounded-sm cursor-not-allowed">
                            Đã lưu
                        </button>
                        <button v-else disabled
                            class="bg-gray-400 text-white text-xs px-3 py-1 rounded-sm cursor-not-allowed">
                            {{
                                getCouponStatus(coupon) === 'expired'
                                    ? 'Đã hết hạn'
                                    : getCouponStatus(coupon) === 'used'
                                        ? 'Đã sử dụng'
                                        : 'Không hoạt động'
                            }}
                        </button>

                        <div class="text-xs text-gray-700 hover:underline cursor-pointer">
                            Hạn: {{ formatDate(coupon.end_date) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="!isLoading && latestCoupons.length === 0" class="text-center py-8">
            <i class="fa-solid fa-ticket text-4xl text-gray-400 mb-4"></i>
            <p class="text-gray-500">Không có voucher nào</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isLoading = ref(false)

const coupons = ref([
    {
        id: 1,
        code: 'SALE10',
        description: 'Giảm 10% cho đơn từ 500K',
        type: 'percent',
        value: 10,
        max_discount_value: 50000,
        min_order_value: 500000,
        is_active: true,
        is_claimed: false,
        end_date: '2025-12-31',
        used_count: 2,
        usage_limit: 100,
        created_at: '2025-07-20'
    },
    {
        id: 2,
        code: 'FREESHIP',
        description: 'Freeship toàn quốc',
        type: 'value',
        value: 30000,
        min_order_value: 200000,
        is_active: true,
        is_claimed: true,
        end_date: '2025-08-30',
        used_count: 10,
        usage_limit: 100,
        created_at: '2025-07-18'
    },
    {
        id: 3,
        code: 'NEWUSER',
        description: 'Chào mừng khách hàng mới',
        type: 'percent',
        value: 15,
        max_discount_value: 70000,
        min_order_value: 300000,
        is_active: true,
        is_claimed: false,
        end_date: '2025-10-15',
        used_count: 20,
        usage_limit: 50,
        created_at: '2025-07-01'
    }
])

const latestCoupons = computed(() =>
    coupons.value
        .filter(c => c.is_active)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 4)
)

const formatCurrency = amount =>
    new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount)

const formatDate = date =>
    date ? new Date(date).toLocaleDateString('vi-VN') : 'N/A'

const isExpired = coupon => new Date() > new Date(coupon.end_date)

const isUsedUp = coupon => coupon.used_count >= coupon.usage_limit

const getCouponStatus = coupon => {
    if (!coupon.is_active) return 'inactive'
    if (isExpired(coupon)) return 'expired'
    if (isUsedUp(coupon)) return 'used'
    return 'active'
}
</script>

<style scoped>
.left-edge {
    width: 64px;
    background-color: #1565d8;
    clip-path: polygon(0 0,
            100% 0,
            100% 100%,
            0 100%,
            0 85%,
            10% 85%,
            10% 70%,
            0 70%,
            0 55%,
            10% 55%,
            10% 40%,
            0 40%,
            0 25%,
            10% 25%,
            10% 10%,
            0 10%);
}
</style>
