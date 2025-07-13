export interface PageViewData {
  sessionId: string
  userId?: string
  pageUrl: string
  pageTitle: string
  referrer?: string
  screenResolution?: string
  language: string
  duration?: number
  timestamp: string
}

export interface AnalyticsStats {
  totalViews: number
  uniqueUsers: number
  avgDuration: number
  topPages: Array<{
    pageUrl: string
    pageTitle: string
    views: number
  }>
  dailyViews: Array<{
    date: string
    views: number
    uniqueUsers: number
  }>
  hourlyViews: Array<{
    hour: number
    views: number
  }>
  languageStats: Array<{
    language: string
    count: number
  }>
  deviceStats: Array<{
    resolution: string
    count: number
  }>
}

export interface DateRange {
  startDate: Date
  endDate: Date
} 