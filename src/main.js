import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

const api = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? 'https://iron-pool.com/api' : '/api'
})

app.config.globalProperties.$api = api

app.use(router)
app.use(VueAxios, axios)
app.use(i18n)
app.mount('#app')
