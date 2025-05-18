import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<{ id: string; name: string; email: string } | null>(null)

  // 登录成功后设置用户信息和token
  const setAuth = (newToken: string, userData: { id: string; name: string; email: string }) => {
    token.value = newToken
    user.value = userData
  }

  // 清除认证信息（登出）
  const clearAuth = () => {
    token.value = null
    user.value = null
  }

  // 检查是否已认证
  const isAuthenticated = () => !!token.value

  return {
    token,
    user,
    setAuth,
    clearAuth,
    isAuthenticated,
  }
})
