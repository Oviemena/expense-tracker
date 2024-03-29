
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/style.css'
import App from './App.vue'
import router from './routes/router'


const app = createApp(App)
app
.use(Toast)
.use(router)
.mount('#app')
