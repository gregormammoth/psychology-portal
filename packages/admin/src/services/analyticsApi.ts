import axios from 'axios'
import { AnalyticsStats, DateRange, PageViewData } from '../types/analytics'

const API_BASE_URL = 'http://localhost:3003' // process.env.VITE_API_URL || 'http://localhost:3003'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const analyticsApi = {
  getStats: async (dateRange: DateRange): Promise<AnalyticsStats> => {
    // return {
    //   totalViews: 100,
    //   uniqueUsers: 50,
    //   avgDuration: 100,
    //   topPages: [],
    //   dailyViews: [],
    //   hourlyViews: [],
    //   languageStats: [],
    //   deviceStats: [],
    // }
    const response = await apiClient.get('/api/analytics/stats', {
      params: {
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
      },
    })
    return response.data
  },

  getPageViews: async (dateRange: DateRange): Promise<PageViewData[]> => {
    return []
    // const response = await apiClient.get('/api/analytics/pageviews', {
    //   params: {
    //     startDate: dateRange.startDate.toISOString(),
    //     endDate: dateRange.endDate.toISOString(),
    //   },
    // })
    // return response.data
  },

  getDailyStats: async (dateRange: DateRange) => {
    return []
    // const response = await apiClient.get('/api/analytics/daily', {
    //   params: {
    //     startDate: dateRange.startDate.toISOString(),
    //     endDate: dateRange.endDate.toISOString(),
    //   },
    // })
    // return response.data
  },

  getHourlyStats: async (dateRange: DateRange) => {
    return []
    // const response = await apiClient.get('/api/analytics/hourly', {
    //   params: {
    //     startDate: dateRange.startDate.toISOString(),
    //     endDate: dateRange.endDate.toISOString(),
    //   },
    // })
    // return response.data
  },
} 