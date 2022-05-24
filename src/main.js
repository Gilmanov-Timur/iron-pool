import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

const api = axios.create({
	//baseURL: 'https://iron-pool.com:8443',
	baseURL: 'https://iron-pool.xyz/api/home',
})

app.config.globalProperties.$api = api

app.use(router)
app.use(VueAxios, axios)
app.use(i18n)
app.mount('#app')
