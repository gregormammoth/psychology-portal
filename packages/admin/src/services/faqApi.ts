import axios from 'axios'
import { Faq, FaqAnswerData } from '../types/faq'

const API_BASE_URL = 'http://localhost:3003'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const faqApi = {
  getQuestions: async (includeUnpublished = true): Promise<Faq[]> => {
    const response = await apiClient.get('/api/faq/questions', {
      params: { includeUnpublished: includeUnpublished.toString() }
    })
    return response.data
  },

  getPendingQuestions: async (): Promise<Faq[]> => {
    const response = await apiClient.get('/api/faq/questions/pending')
    return response.data
  },

  getPublishedFaqs: async (category?: string): Promise<Faq[]> => {
    const response = await apiClient.get('/api/faq/questions/published', {
      params: category ? { category } : {}
    })
    return response.data
  },

  getQuestion: async (id: string): Promise<Faq> => {
    const response = await apiClient.get(`/api/faq/questions/${id}`)
    return response.data
  },

  answerQuestion: async (id: string, answerData: FaqAnswerData): Promise<Faq> => {
    const response = await apiClient.put(`/api/faq/questions/${id}/answer`, answerData)
    return response.data
  },

  updateQuestionStatus: async (id: string, status: string): Promise<Faq> => {
    const response = await apiClient.put(`/api/faq/questions/${id}/status`, { status })
    return response.data
  },

  publishQuestion: async (id: string, isPublished: boolean): Promise<Faq> => {
    const response = await apiClient.put(`/api/faq/questions/${id}/publish`, { isPublished })
    return response.data
  },

  updatePriority: async (id: string, priority: number): Promise<Faq> => {
    const response = await apiClient.put(`/api/faq/questions/${id}/priority`, { priority })
    return response.data
  },

  deleteQuestion: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/faq/questions/${id}`)
  },

  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get('/api/faq/categories')
    return response.data
  },
}