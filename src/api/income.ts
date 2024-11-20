import axios from "./axiosInstance"

export interface Income {
  id?: number
  description: string
  amount: number
  date: string
  category: string
  total: number
}

export interface CreateIncomePayload {
  description: string
  amount: number
  date: string
  category: string
}

export async function getIncomes(): Promise<Income[]> {
  const response = await axios.get<{ data: Income[] }>('/incomes')
  return response.data.data
}

export async function createIncome(payload: CreateIncomePayload): Promise<Income> {
  const response = await axios.post<{ data: Income }>('/incomes', payload)

  return response.data.data
}

export async function getTotalIncomes(mouth: number) {
  const response = await axios.get<{ data: Income }>(`/incomes/total/${mouth}`)
  return response.data.data
}