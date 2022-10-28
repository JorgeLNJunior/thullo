import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import decode from 'jwt-decode'
import { AccessToken, AuthService } from '../api/auth.service'

const routes: RouteRecordRaw[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('../pages/LoginPage.vue'),
    meta: { requiresAuth: false }
  },
  {
    name: 'Home',
    path: '/',
    component: () => import('../pages/HomePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    name: 'Board',
    path: '/board/:id',
    component: () => import('../pages/BoardPage.vue'),
    meta: { requiresAuth: true }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) return next()

  const access_token = localStorage.getItem('access_token')
  const refresh_token = localStorage.getItem('refresh_token')

  if (refresh_token) {
    const decoded: AccessToken = decode<AccessToken>(refresh_token)

    const isExpired = Date.now() >= decoded.exp * 1000
    if (isExpired) return next('/login')
  }

  if (access_token) {
    const decoded: AccessToken = decode<AccessToken>(access_token)

    const isAccessTokenExpired = Date.now() >= decoded.exp * 1000

    if (isAccessTokenExpired) {
      if (!refresh_token) return next('/login')
      const refreshed_token = await new AuthService().refresh(refresh_token)
      localStorage.setItem('access_token', refreshed_token)
      return next()
    }
    return next()
  }

  return next('/login')
})
