export interface LoginParams {
  email: string
  password: string
}

export interface RegisterParams extends LoginParams {
  name: string
}

export interface AuthResponse {
  success: boolean
  token?: string
  user?: User
  message?: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
  updatedAt: string
}
