import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)
const head = createHead()

app.use(pinia)
app.use(head)
app.use(router)
app.mount('#app')