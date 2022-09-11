import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../pages/HomePage.vue') },
  { path: '/board/:id', component: () => import('../pages/BoardPage.vue') }
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
