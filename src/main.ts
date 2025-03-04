import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';
import store from './store';

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(store)
app.mount('#app')

