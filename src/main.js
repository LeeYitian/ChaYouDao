import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import NotificationToast from './components/NotificationToast'
import PaginationBar from '@/components/PaginationBar.vue'
import { currency, date } from './methods/textFilter'

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.component('loadingComponent', Loading)
app.component('NotificationToast', NotificationToast)
app.component('PaginationBar', PaginationBar)
app.config.globalProperties.$filters = {
  currency, date
}
app.mount('#app')
