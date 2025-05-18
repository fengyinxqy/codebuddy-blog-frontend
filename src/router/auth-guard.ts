import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated()

  document.title = `${to.meta.title ? `${to.meta.title} - ` : ''}Blog`

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.guestOnly && isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
}
