
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/style.css'
import App from './App.vue'
import router from './routes/router'

import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'


const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app
.use(Toast)
.use(router)
.use(vuetify)
.mount('#app')
