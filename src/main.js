import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import "./assets/styles.css"
import 'material-icons/iconfont/material-icons.css';

const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
