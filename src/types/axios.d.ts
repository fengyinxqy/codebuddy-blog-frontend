import 'axios'

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _silent?: boolean
  }
}
