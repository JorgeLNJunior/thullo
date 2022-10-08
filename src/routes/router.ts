import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { name: 'Home', path: '/', component: () => import('../pages/HomePage.vue') },
  {
    name: 'Board',
    path: '/board/:id',
    component: () => import('../pages/BoardPage.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
