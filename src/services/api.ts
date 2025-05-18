import axios from 'axios'
import { ElMessage } from 'element-plus'

import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器 - 添加认证token和错误提示配置
api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }

  // 标记是否禁用全局错误提示
  config._silent = config._silent || false
  return config
})

// 响应拦截器 - 增强错误处理
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = '请求失败'

    if (error.response) {
      // HTTP错误
      message =
        error.response.data?.message ||
        error.response.statusText ||
        `请求错误: ${error.response.status}`
    } else if (error.request) {
      // 网络错误
      message = '网络错误，请检查网络连接'
    }

    // 全局错误提示
    if (import.meta.env.VITE_GLOBAL_ERROR_TOAST === 'true' && !error.config?._silent) {
      ElMessage.error(message)
    }

    return Promise.reject({
      message,
      code: error.response?.status,
      data: error.response?.data,
      isNetworkError: !error.response,
    })
  },
)

// 创建不显示全局错误提示的API实例
export const silentApi = axios.create({
  ...api.defaults,
  _silent: true,
})

export default api
