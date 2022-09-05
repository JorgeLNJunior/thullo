import './index.css'

import App from './App.vue'

import { createApp } from 'vue'
import { router } from './routes/router'

createApp(App).use(router).mount('#app')
