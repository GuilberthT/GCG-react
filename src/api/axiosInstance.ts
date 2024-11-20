import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_HOMOLOG,
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('token')

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default instance
