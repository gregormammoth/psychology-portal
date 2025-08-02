import axios from 'axios'
import { Contact } from '../types/contact'

const API_BASE_URL = 'http://localhost:3003'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const contactApi = {
  getContacts: async (): Promise<Contact[]> => {
    const response = await apiClient.get('/api/contacts')
    return response.data
  },

  getContact: async (id: string): Promise<Contact> => {
    const response = await apiClient.get(`/api/contacts/${id}`)
    return response.data
  },

  updateContactStatus: async (id: string, status: string): Promise<Contact> => {
    const response = await apiClient.put(`/api/contacts/${id}/status`, { status })
    return response.data
  },

  deleteContact: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/contacts/${id}`)
  },
}