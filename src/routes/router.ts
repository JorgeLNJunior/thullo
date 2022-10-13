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

  let decoded: AccessToken
  const access_token = localStorage.getItem('access_token')
  const refresh_token = localStorage.getItem('refresh_token')

  if (access_token) {
    decoded = decode<AccessToken>(access_token)

    const isAccessTokenExpired = Date.now() >= decoded.exp * 1000

    if (isAccessTokenExpired) {
      if (!refresh_token) return next('/login')
      const newToken = await new AuthService().refresh(refresh_token)
      localStorage.setItem('access_token', newToken)
      return next()
    }
    return next()
  }

  return next('/login')
})
