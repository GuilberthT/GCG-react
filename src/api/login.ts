import Cookies from 'js-cookie'
import axios from './axiosInstance'

interface LoginData {
  email: string
  password: string
}

export async function login(data: LoginData): Promise<string> {
  const response = await axios.post<{ token: string }>('/user/login', data)

  return response.data.token
}

export async function logout(): Promise<void> {
  Cookies.remove('token')

  localStorage.removeItem('token')
}
