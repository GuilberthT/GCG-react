import axios from './axiosInstance'

export interface ExpenseType {
  _id: string
  description: string
  createdAt?: string
  updatedAt?: string
}

export async function getExpensesTypes(): Promise<ExpenseType[]> {
  const response = await axios.get<ExpenseType[]>('/expenseTypes')

  return response.data
}
