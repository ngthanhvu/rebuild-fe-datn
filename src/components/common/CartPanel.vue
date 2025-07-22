<template>
    <div class="cart-panel" :class="{ 'cart-panel-open': isOpen }">
        <div class="cart-panel-content">
            <div class="flex justify-between items-center mb-4">
                <h6 class="font-semibold m-0">Giỏ hàng ({{ cart.length }})</h6>
                <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>

            <div class="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div v-if="!cart.length" class="text-center py-8">
                    <div class="text-gray-500 mb-4">
                        <i class="bi bi-cart text-4xl block mb-3"></i>
                        <p class="text-lg">Giỏ hàng của bạn đang trống</p>
                    </div>
                    <router-link to="/product"
                        class="inline-flex items-center px-4 py-2 bg-[#81AACC] text-white rounded-md hover:bg-[#4a85b6] transition-colors">
                        <i class="bi bi-bag mr-2"></i> Mua sắm ngay
                    </router-link>
                </div>

                <div v-else v-for="item in cart" :key="item.id" class="flex gap-4 pb-4 border-b border-gray-200">
                    <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded" />
                    <div class="flex-1">
                        <h6 class="font-medium mb-1">{{ item.name }}</h6>
                        <p class="text-sm text-gray-600 mb-1">
                            <span v-if="item.size">Size: {{ item.size }}</span>
                            <span v-if="item.color"> | Màu: {{ item.color }}</span>
                        </p>
                        <p class="text-sm text-gray-500 mb-1">Còn lại: {{ item.stock }} sản phẩm</p>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <button class="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                                    @click="decrease(item.id)" :disabled="item.quantity <= 1">-</button>
                                <span class="text-sm">{{ item.quantity }}</span>
                                <button class="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                                    @click="increase(item.id)" :disabled="item.quantity >= item.stock">+</button>
                            </div>
                            <span class="font-medium">{{ formatPrice(item.price) }}</span>
                        </div>
                    </div>
                    <button class="text-gray-400 hover:text-red-500" @click="remove(item.id)">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
            </div>

            <div v-if="cart.length > 0" class="mt-4 pt-4 border-t border-gray-200">
                <div class="flex justify-between items-center mb-4">
                    <span class="font-medium">Tổng tiền:</span>
                    <span class="font-bold text-lg">{{ formatPrice(total) }}</span>
                </div>
                <div class="space-y-2">
                    <router-link to="/gio-hang"
                        class="block w-full border border-[#81AACC] text-[#81AACC] hover:bg-[#81AACC] hover:text-white text-center py-2 rounded-md transition-colors">
                        Xem chi tiết giỏ hàng
                    </router-link>
                    <router-link to="/thanh-toan"
                        class="block w-full bg-[#81AACC] hover:bg-[#6B8FA8] text-white text-center py-2 rounded-md transition-colors">
                        Thanh toán
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="cart-overlay" :class="{ 'cart-overlay-open': isOpen }" @click="$emit('close')"></div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    isOpen: Boolean
})
defineEmits(['close'])

const cart = ref([
    {
        id: 1,
        name: 'Áo thun nam tay ngắn',
        image: 'https://placehold.co/100',
        size: 'M',
        color: 'Trắng',
        stock: 10,
        price: 250000,
        quantity: 1
    },
    {
        id: 2,
        name: 'Giày sneaker nữ',
        image: 'https://placehold.co/100',
        size: '38',
        color: 'Đen',
        stock: 5,
        price: 750000,
        quantity: 2
    }
])

const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

const increase = id => {
    const item = cart.value.find(i => i.id === id)
    if (item && item.quantity < item.stock) item.quantity++
}

const decrease = id => {
    const item = cart.value.find(i => i.id === id)
    if (item && item.quantity > 1) item.quantity--
}

const remove = id => {
    cart.value = cart.value.filter(i => i.id !== id)
}

const total = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
</script>

<style scoped>
.cart-panel {
    position: fixed;
    top: 0;
    right: -400px;
    width: 400px;
    height: 100vh;
    background-color: white;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: right 0.3s ease;
}

.cart-panel-open {
    right: 0;
}

.cart-panel-content {
    height: 100%;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.cart-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.cart-overlay-open {
    opacity: 1;
    visibility: visible;
}
</style>
