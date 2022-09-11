import './index.css'

import App from './App.vue'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { router } from './routes/router'

const head = createHead()

createApp(App).use(router).use(head).mount('#app')
