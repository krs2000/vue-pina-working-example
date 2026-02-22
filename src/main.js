import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { persistPlugin } from './plugins/persist'
import { loggerPlugin } from './plugins/logger'
import App from './App.vue'
import './style.css'

const pinia = createPinia()
pinia.use(persistPlugin)
pinia.use(loggerPlugin)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
