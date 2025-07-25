import axios from 'axios'
import { ref } from 'vue'
import Cookies from 'js-cookie'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    withCredentials: true
})

export const useCarts = () => {
    const cart = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const getToken = () => Cookies.get('token') || localStorage.getItem('token')

    const getHeaders = () => {
        const headers = {}
        const token = getToken()
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        } else {
            const sessionId = localStorage.getItem('sessionId') || generateSessionId()
            headers['X-Session-Id'] = sessionId
        }
        return headers
    }

    const getCartEndpoint = () => getToken() ? 'cart' : 'guest-cart'

    const fetchCart = async () => {
        try {
            isLoading.value = true
            error.value = null
            const res = await API.get(`api/${getCartEndpoint()}`, { headers: getHeaders() })
            cart.value = res.data
            console.log('cart:', cart.value)
            return res.data
        } catch (err) {
            error.value = err.response?.data?.error || 'Lỗi khi tải giỏ hàng'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const addToCart = async (variantId, quantity = 1, price = null) => {
        try {
            if (quantity <= 0) throw new Error('Số lượng phải lớn hơn 0')
            isLoading.value = true
            error.value = null

            const payload = { variant_id: variantId, quantity }
            if (price !== null) payload.price = price

            const res = await API.post(`api/${getCartEndpoint()}`, payload, { headers: getHeaders() })
            await fetchCart()
            return res.data
        } catch (err) {
            if (err.response?.status === 401) {
                Cookies.remove('token')
                localStorage.removeItem('token')
                return addToCart(variantId, quantity, price)
            }
            error.value = err.response?.data?.error || err.message || 'Không thể thêm vào giỏ hàng'
            throw error.value
        } finally {
            isLoading.value = false
        }
    }

    const updateQuantity = async (cartId, quantity) => {
        try {
            if (quantity <= 0) throw new Error('Số lượng phải lớn hơn 0')
            isLoading.value = true
            error.value = null

            const currentItem = cart.value.find(item => item.id === cartId)
            if (!currentItem || !currentItem.variant || !currentItem.variant.inventory) {
                throw new Error('Không thể xác định thông tin sản phẩm hoặc tồn kho')
            }

            if (quantity > currentItem.variant.inventory.quantity) {
                throw new Error(`Số lượng vượt quá tồn kho. Chỉ còn ${currentItem.variant.inventory.quantity}`)
            }

            await API.put(`api/${getCartEndpoint()}/${cartId}`, { quantity }, { headers: getHeaders() })
            await fetchCart()
        } catch (err) {
            error.value = err.response?.data?.error || err.message || 'Không thể cập nhật số lượng'
            throw error.value
        } finally {
            isLoading.value = false
        }
    }

    const removeFromCart = async (cartId) => {
        try {
            isLoading.value = true
            error.value = null
            await API.delete(`api/${getCartEndpoint()}/${cartId}`, { headers: getHeaders() })
            await fetchCart()
        } catch (err) {
            error.value = err.response?.data?.error || 'Không thể xóa sản phẩm'
            throw error.value
        } finally {
            isLoading.value = false
        }
    }

    const transferCartFromSessionToUser = async () => {
        const sessionId = localStorage.getItem('sessionId')
        const token = getToken()
        if (!sessionId || !token) return

        try {
            await API.post('api/cart/transfer-session-to-user', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-Session-Id': sessionId
                }
            })
            localStorage.removeItem('sessionId')
            await fetchCart()
        } catch (err) {
            console.error('Transfer cart error:', err)
        }
    }

    const generateSessionId = () => {
        const id = Math.random().toString(36).substring(2)
        localStorage.setItem('sessionId', id)
        return id
    }

    const getUserId = () => {
        let user = Cookies.get('user') || localStorage.getItem('user')
        try {
            if (typeof user === 'string') user = JSON.parse(decodeURIComponent(user))
        } catch { }
        return user?.id || null
    }

    const increaseQuantity = async (cartId) => {
        const item = cart.value.find(i => i.id === cartId)
        if (!item) throw new Error('Không tìm thấy sản phẩm')
        await updateQuantity(cartId, item.quantity + 1)
    }

    const decreaseQuantity = async (cartId) => {
        const item = cart.value.find(i => i.id === cartId)
        if (!item) throw new Error('Không tìm thấy sản phẩm')
        if (item.quantity > 1) await updateQuantity(cartId, item.quantity - 1)
    }

    return {
        cart,
        isLoading,
        error,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        transferCartFromSessionToUser,
        getUserId,
        increaseQuantity,
        decreaseQuantity
    }
}

export default useCarts
export const useCart = useCarts
