<template>
    <aside class="sidebar">
        <div class="sidebar-logo">
            <!-- <img src="https://i.imgur.com/1X6hF8g.png" alt="Logo" /> -->
            <span class="logo-text">Admin Panel</span>
        </div>
        <nav class="sidebar-nav">
            <!-- Tổng quan -->
            <div class="nav-section">
                <div class="section-title font-bold text-sm text-gray-500">Tổng quan</div>

                <RouterLink to="/admin" class="nav-item">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Bảng điều khiển</span>
                </RouterLink>

                <!-- Sản phẩm -->
                <div class="nav-item dropdown-toggle mt-1" @click="showProductsMenu = !showProductsMenu">
                    <i class="fa-solid fa-tags"></i>
                    <span class="flex items-center justify-between w-full">
                        Sản phẩm
                        <i class="fas fa-caret-down transition-transform duration-300"
                            :class="{ 'rotate-180': showProductsMenu }"></i>
                    </span>
                </div>
                <div v-show="showProductsMenu" class="submenu">
                    <RouterLink to="/admin/products" class="nav-sub-item">Tất cả sản phẩm</RouterLink>
                    <RouterLink to="/admin/categories" class="nav-sub-item">Danh mục</RouterLink>
                    <RouterLink to="/admin/brands" class="nav-sub-item">Thương hiệu</RouterLink>
                </div>

                <RouterLink to="/admin/orders" class="nav-item">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Đơn hàng</span>
                </RouterLink>
                <RouterLink to="/admin/customers" class="nav-item">
                    <i class="fas fa-users"></i>
                    <span>Khách hàng</span>
                </RouterLink>
                <RouterLink to="/admin/promotions" class="nav-item">
                    <i class="fa-solid fa-ticket"></i>
                    <span>Khuyến mãi</span>
                </RouterLink>
                <RouterLink to="/admin/flashsale" class="nav-item">
                    <i class="fa-solid fa-bolt"></i>
                    <span>Flash Sale</span>
                </RouterLink>

                <!-- Quản lý kho -->
                <div class="nav-item dropdown-toggle" @click="showInventoryMenu = !showInventoryMenu">
                    <i class="fas fa-warehouse"></i>
                    <span class="flex items-center justify-between w-full">
                        Quản lý kho
                        <i class="fas fa-caret-down transition-transform duration-300"
                            :class="{ 'rotate-180': showInventoryMenu }"></i>
                    </span>
                </div>
                <div v-show="showInventoryMenu" class="submenu">
                    <RouterLink to="/admin/inventory" class="nav-sub-item">Tổng quan kho</RouterLink>
                    <RouterLink to="/admin/inventory/import" class="nav-sub-item">Nhập hàng</RouterLink>
                    <RouterLink to="/admin/inventory/history" class="nav-sub-item">Hoá đơn</RouterLink>
                </div>
            </div>

            <!-- Giao tiếp -->
            <div class="nav-section">
                <div class="section-title font-bold text-sm text-gray-500">Giao tiếp</div>

                <RouterLink to="/admin/blogs" class="nav-item">
                    <i class="fa-solid fa-newspaper"></i>
                    <span>Bài viết</span>
                </RouterLink>
                <RouterLink to="/admin/messages" class="nav-item">
                    <i class="fas fa-envelope"></i>
                    <span>Tin nhắn</span>
                    <span v-if="unreadMessages > 0" class="badge">{{ unreadMessages }}</span>
                </RouterLink>
                <RouterLink to="/admin/comments" class="nav-item">
                    <i class="fas fa-comments"></i>
                    <span>Đánh giá</span>
                    <span v-if="unapprovedReviews > 0" class="badge">{{ unapprovedReviews }}</span>
                </RouterLink>
            </div>

            <!-- Hệ thống -->
            <div class="nav-section">
                <div class="section-title font-bold text-sm text-gray-500">Hệ thống</div>
                <RouterLink to="/admin/settings" class="nav-item">
                    <i class="fas fa-cog"></i>
                    <span>Cài đặt</span>
                </RouterLink>
            </div>
        </nav>
    </aside>
</template>

<script setup>
import { ref } from 'vue'

const showProductsMenu = ref(false)
const showInventoryMenu = ref(false)
const unreadMessages = ref(0)
const unapprovedReviews = ref(0)

// Gắn dữ liệu thực tế sau nếu cần
unreadMessages.value = 3
unapprovedReviews.value = 2
</script>

<style scoped>
.submenu {
    padding-left: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 0.25rem;
}

.nav-sub-item {
    font-size: 0.9rem;
    color: #4b5563;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    transition: background 0.2s, color 0.2s;
    text-decoration: none;
}

.nav-sub-item:hover,
.nav-sub-item.router-link-active {
    background: #e9f6ef;
    color: #3bb77e;
}

.sidebar {
    width: 250px;
    background: #fff;
    border-right: 1px solid #e5e7eb;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    overflow-y: auto;
}

.sidebar-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
}

.logo-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: #3bb77e;
    letter-spacing: 1px;
}

.sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    color: #253d4e;
    text-decoration: none;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: background 0.2s, color 0.2s;
    cursor: pointer;
    margin-top: calc(var(--spacing) * 1)
}

.nav-item i {
    width: 20px;
    text-align: center;
}

.nav-item.router-link-active,
.nav-item:hover {
    background: #e9f6ef;
    color: #3bb77e;
}

.badge {
    background: #3bb77e;
    color: white;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 0.75rem;
    margin-left: auto;
}
</style>
