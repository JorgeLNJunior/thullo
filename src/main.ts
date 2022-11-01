import './index.css'

import App from './App.vue'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createHead } from '@vueuse/head'
import { router } from './routes/router'
import Toast, { PluginOptions } from 'vue-toastification'

import 'vue-toastification/dist/index.css'

const options: PluginOptions = { timeout: 3000 }

const head = createHead()

createApp(App)
  .use(router)
  .use(head)
  .use(autoAnimatePlugin)
  .use(Toast, options)
  .mount('#app')
