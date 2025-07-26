<template>
    <div class="products-page">
        <div class="page-header flex items-center justify-between">
            <div>
                <h1>Quản lý sản phẩm</h1>
                <p class="text-gray-600">Quản lý danh sách sản phẩm của bạn</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
                <button @click="handleRefresh"
                    class="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                        </path>
                    </svg>
                    Tải lại
                </button>
            </div>
        </div>

        <!-- <ProductsTable :columns="columns" :data="products" :categories="categories" :brands="brands"
            :isLoading="isLoading" @delete="handleDelete" @refresh="handleRefresh" /> -->
        <ProductsTable :columns="columns" :data="products" :categories="categories" :brands="brands"
            :isLoading="isLoading" :itemsPerPage="10" @delete="handleDelete" @refresh="handleRefresh" />

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductsTable from './ProductsTable.vue'

// Cột hiển thị
const columns = [
    { key: 'main_image', label: 'Ảnh chính', type: 'main_image' },
    { key: 'sub_images', label: 'Ảnh phụ', type: 'sub_images' },
    { key: 'name', label: 'Tên sản phẩm' },
    { key: 'category', label: 'Danh mục', type: 'category' },
    { key: 'brand', label: 'Thương hiệu', type: 'brand' },
    { key: 'price', label: 'Giá bán', type: 'price' },
    { key: 'discount_price', label: 'Giá khuyến mãi', type: 'price' },
    { key: 'variants', label: 'Biến thể', type: 'variants' },
    { key: 'is_active', label: 'Trạng thái', type: 'status' }
]

// Dữ liệu giả lập
const products = ref([
    {
        "id": 1,
        "name": "Áo thun và quần",
        "description": "<p>Thông tin sản phẩm</p><p>- Chất liệu:&nbsp;Cotton</p><p>- Form:&nbsp;Oversize</p><p>- Màu sắc: Đen</p><p>- Thiết kế:&nbsp;In trame</p><p><img src=\"https://cf.shopee.vn/file/d76f32074cbecca4b0d33b383918960b\" width=\"1024\" height=\"1024\"></p><p>Về TEELAB:&nbsp;</p><p>You will never be younger than you are at this very moment “Enjoy Your Youth!”</p><p>Không chỉ là thời trang, TEELAB còn là “phòng thí nghiệm” của tuổi trẻ - nơi nghiên cứu và cho ra đời năng lượng mang tên “Youth”. Chúng mình luôn muốn tạo nên những trải nghiệm vui vẻ, năng động và trẻ trung.&nbsp;</p><p>Lấy cảm hứng từ giới trẻ, sáng tạo liên tục, bắt kịp xu hướng và phát triển đa dạng các dòng sản phẩm là cách mà chúng mình hoạt động để tạo nên phong cách sống hằng ngày của bạn. Mục tiêu của TEELAB là cung cấp các sản phẩm thời trang chất lượng cao với giá thành hợp lý.&nbsp;</p><p>Chẳng còn thời gian để loay hoay nữa đâu youngers ơi! Hãy nhanh chân bắt lấy những những khoảnh khắc tuyệt vời của tuổi trẻ. TEELAB đã sẵn sàng trải nghiệm cùng bạn!</p><p>“Enjoy Your Youth”, now!</p><p><img src=\"https://bizweb.dktcdn.net/100/415/697/files/6aab4d65e60c4da750011152191f7e6a.jpg?v=1690009219201\" width=\"1024\" height=\"1024\"></p><p><img src=\"https://bizweb.dktcdn.net/100/415/697/files/ao-thun-fcf21558-fabe-4196-a43c-d8d50502aad9.jpg?v=1732247660450\" width=\"1200\" height=\"900\">Hướng dẫn sử dụng sản phẩm Teelab:</p><p>- Giặt ở nhiệt độ bình thường, với đồ có màu tương tự.&nbsp;</p><p>- Không dùng hóa chất tẩy.</p><p>- Hạn chế sử dụng máy sấy và ủi (nếu có) thì ở nhiệt độ thích hợp.</p><p>&nbsp;</p><p>Chính sách bảo hành:</p><p>- Miễn phí đổi hàng cho khách mua ở TEELAB trong trường hợp bị lỗi từ nhà sản xuất, giao nhầm hàng, bị hư hỏng trong quá trình vận chuyển hàng.</p><p>- Sản phẩm đổi trong thời gian 3 ngày kể từ ngày nhận hàng</p><p>- Sản phẩm còn mới nguyên tem, tags và mang theo hoá đơn mua hàng, sản phẩm chưa giặt và không dơ bẩn, hư hỏng bởi những tác nhân bên ngoài cửa hàng sau khi mua hàng.</p><p>#genz #teelab #aothun #streetwear #aonam #aonu #aothundep #aophong #tshirt</p>",
        "price": 150000,
        "discount_price": 0,
        "slug": "ao-thun-va-quan",
        "categories_id": 1,
        "brand_id": 1,
        "is_active": 1,
        "images": [
            {
                "id": 1,
                "image_path": "http://localhost:8000/storage/products/Y6QKQK7xTe0IGxiwZk4mS2ROCuZ8XrnviDnPKzUo.png",
                "is_main": 1,
                "product_id": 1
            },
            {
                "id": 2,
                "image_path": "http://localhost:8000/storage/products/8kX3dJbg5U923lknpcyBtqvazQvYn8MEJqMoCMEn.png",
                "is_main": 0,
                "product_id": 1
            }
        ],
        "variants": [
            {
                "id": 1,
                "color": "blue",
                "size": "S",
                "price": 150000,
                "sku": "OTHU-703731",
                "product_id": 1
            },
            {
                "id": 2,
                "color": "blue",
                "size": "X",
                "price": 150000,
                "sku": "OTHU-912241",
                "product_id": 1
            }
        ]
    },
])

const brands = ref([
    { value: 'Nike', label: 'Nike' },
    { value: 'Levis', label: 'Levis' }
])

const categories = ref([
    { value: 'Áo', label: 'Áo' },
    { value: 'Quần', label: 'Quần' }
])

const isLoading = ref(false)

const handleDelete = async (product) => {
    if (confirm(`Xoá sản phẩm: ${product.name}?`)) {
        products.value = products.value.filter(p => p.id !== product.id)
        alert('Đã xoá sản phẩm.')
    }
}

const handleRefresh = () => {
    // Tải lại từ mock data (hoặc từ server nếu dùng API thật)
    alert('Dữ liệu đã được làm mới')
}
</script>

<style scoped>
.products-page {
    padding: 1.5rem;
}

.page-header {
    margin-bottom: 2rem;
}

.page-header h1 {
    font-size: 1.875rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
}
</style>
