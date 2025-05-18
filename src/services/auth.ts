import api from './api'

import type { AuthResponse, LoginParams, RegisterParams, User } from '@/types'

export const AuthService = {
  async login(params: LoginParams): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login', params)
      return response.data
    } catch (error) {
      throw new Error(error as string)
    }
  },

  async register(params: RegisterParams): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/register', params)
      return response.data
    } catch (error) {
      throw new Error(error as string)
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get('/auth/me')
      return response.data
    } catch (error) {
      throw new Error(error as string)
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      throw new Error(error as string)
    }
  },
}
