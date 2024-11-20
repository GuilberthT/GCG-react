import axios from './axiosInstance'

interface Expense {
  id?: number
  description: string
  amount: number
  category: string
  date: string
  total: number
}

export async function getExpenses(): Promise<Expense[] | Error> {
  try {
    const response = await axios.get<{ data: Expense[] }>('/expenses')
    return response.data.data
  }
  catch (error) {
    return error as Error
  }
}

export async function createExpense(expense: Expense): Promise<Expense | Error> {
  try {
    const response = await axios.post<{ data: Expense }>('/expenses', expense)
    return response.data.data
  }
  catch (error) {
    return error as Error
  }
}

export async function getTotalExpenses(mouth: number) {
  const response = await axios.get<Expense>(`/expenses/total/${mouth}`)

  return response.data
}
