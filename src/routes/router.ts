import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/HomePage.vue'

const routes: RouteRecordRaw[] = [{ path: '/', component: Home }]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
