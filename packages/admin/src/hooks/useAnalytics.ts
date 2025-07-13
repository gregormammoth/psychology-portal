import { useQuery } from 'react-query'
import { analyticsApi } from '../services/analyticsApi'
import { useAnalyticsStore } from '../store/useAnalyticsStore'
import { DateRange } from '../types/analytics'

export const useAnalyticsStats = (dateRange: DateRange) => {
  const { setStats, setLoading, setError } = useAnalyticsStore()

  return useQuery(
    ['analytics-stats', dateRange],
    () => analyticsApi.getStats(dateRange),
    {
      onSuccess: (data) => {
        setStats(data)
        setLoading(false)
        setError(null)
      },
      onError: (error: any) => {
        setError(error.message || 'Failed to fetch analytics stats')
        setLoading(false)
      },
      onSettled: () => {
        setLoading(false)
      },
      enabled: !!dateRange.startDate && !!dateRange.endDate,
      refetchInterval: 30000,
    }
  )
}

export const usePageViews = (dateRange: DateRange) => {
  return useQuery(
    ['page-views', dateRange],
    () => analyticsApi.getPageViews(dateRange),
    {
      enabled: !!dateRange.startDate && !!dateRange.endDate,
      refetchInterval: 30000,
    }
  )
}

export const useDailyStats = (dateRange: DateRange) => {
  return useQuery(
    ['daily-stats', dateRange],
    () => analyticsApi.getDailyStats(dateRange),
    {
      enabled: !!dateRange.startDate && !!dateRange.endDate,
      refetchInterval: 30000,
    }
  )
}

export const useHourlyStats = (dateRange: DateRange) => {
  return useQuery(
    ['hourly-stats', dateRange],
    () => analyticsApi.getHourlyStats(dateRange),
    {
      enabled: !!dateRange.startDate && !!dateRange.endDate,
      refetchInterval: 30000,
    }
  )
} 