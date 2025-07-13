import { create } from 'zustand'
import { AnalyticsStats, DateRange } from '../types/analytics'

interface AnalyticsStore {
  stats: AnalyticsStats | null
  dateRange: DateRange
  isLoading: boolean
  error: string | null
  setStats: (stats: AnalyticsStats) => void
  setDateRange: (range: DateRange) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  resetStore: () => void
}

const initialDateRange: DateRange = {
  startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  endDate: new Date(),
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  stats: null,
  dateRange: initialDateRange,
  isLoading: false,
  error: null,
  
  setStats: (stats) => set({ stats }),
  setDateRange: (dateRange) => set({ dateRange }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  resetStore: () => set({
    stats: null,
    dateRange: initialDateRange,
    isLoading: false,
    error: null,
  }),
})) 