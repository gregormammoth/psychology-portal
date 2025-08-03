import { Eye, Users, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { useAnalyticsStore } from '../store/useAnalyticsStore'
import { useAnalyticsStats, useDailyStats, useHourlyStats } from '../hooks/useAnalytics'
import StatisticsCard from '../components/StatisticsCard'
import PageViewChart from '../components/PageViewChart'
import HourlyChart from '../components/HourlyChart'
import TopPagesTable from '../components/TopPagesTable'

export default function Dashboard() {
  const { dateRange, stats, isLoading, error } = useAnalyticsStore()

  const { isLoading: statsLoading, error: statsError } = useAnalyticsStats(dateRange)
  const { data: dailyData, isLoading: dailyLoading } = useDailyStats(dateRange)
  const { data: hourlyData, isLoading: hourlyLoading } = useHourlyStats(dateRange)

  const mockStats = {
    overview: {
      totalPageViews: 12543,
      uniqueVisitors: 3241,
      uniqueIps: 1234,
      registeredUsers: 1234,
      avgDuration: 145,
      bounceRate: 24.3,
    },
    topPages: [
      { pageUrl: '/', pageTitle: 'Home Page', views: 2341 },
      { pageUrl: '/articles', pageTitle: 'Articles', views: 1876 },
      { pageUrl: '/chat', pageTitle: 'Chat', views: 1234 },
      { pageUrl: '/contacts', pageTitle: 'Contacts', views: 987 },
      { pageUrl: '/faq', pageTitle: 'FAQ', views: 654 },
    ],
    dailyViews: [
      { date: '2024-01-01', views: 1234, uniqueUsers: 345 },
      { date: '2024-01-02', views: 1456, uniqueUsers: 423 },
      { date: '2024-01-03', views: 1123, uniqueUsers: 312 },
      { date: '2024-01-04', views: 1678, uniqueUsers: 478 },
      { date: '2024-01-05', views: 1789, uniqueUsers: 534 },
      { date: '2024-01-06', views: 1345, uniqueUsers: 389 },
      { date: '2024-01-07', views: 1567, uniqueUsers: 445 },
    ],
    hourlyViews: [
      { hour: 0, views: 45 },
      { hour: 1, views: 23 },
      { hour: 2, views: 12 },
      { hour: 3, views: 8 },
      { hour: 4, views: 15 },
      { hour: 5, views: 34 },
      { hour: 6, views: 67 },
      { hour: 7, views: 89 },
      { hour: 8, views: 123 },
      { hour: 9, views: 156 },
      { hour: 10, views: 178 },
      { hour: 11, views: 145 },
      { hour: 12, views: 189 },
      { hour: 13, views: 167 },
      { hour: 14, views: 145 },
      { hour: 15, views: 178 },
      { hour: 16, views: 156 },
      { hour: 17, views: 134 },
      { hour: 18, views: 112 },
      { hour: 19, views: 89 },
      { hour: 20, views: 67 },
      { hour: 21, views: 45 },
      { hour: 22, views: 34 },
      { hour: 23, views: 23 },
    ],
  }

  const currentStats = stats || mockStats;
  const loading = isLoading || statsLoading;

  if (error || statsError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-lg font-medium mb-2">Error loading analytics</div>
          <p className="text-gray-600">{error || statsError}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h2>
        <div className="text-sm text-gray-500">
          {format(dateRange.startDate, 'MMM dd')} - {format(dateRange.endDate, 'MMM dd, yyyy')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard
          title="Total Page Views"
          value={currentStats?.overview?.totalPageViews?.toLocaleString()}
          icon={Eye}
          // trend={{ value: 12.5, isPositive: true }}
          description="vs last period"
          loading={loading}
        />
        <StatisticsCard
          title="Unique Visitors"
          value={currentStats?.overview?.uniqueVisitors?.toLocaleString()}
          icon={Users}
          // trend={{ value: 8.2, isPositive: true }}
          description="vs last period"
          loading={loading}
        />
        <StatisticsCard
          title="Unique IPs"
          value={currentStats?.overview?.uniqueIps?.toLocaleString()}
          icon={Users}
          // trend={{ value: 8.2, isPositive: true }}
          description="vs last period"
          loading={loading}
        />
        <StatisticsCard
          title="Registered Users"
          value={currentStats?.overview?.registeredUsers?.toLocaleString()}
          icon={Users}
          // trend={{ value: 8.2, isPositive: true }}
          description="vs last period"
          loading={loading}
        />
        <StatisticsCard
          title="Avg. Session Duration"
          value={`${Math.floor(currentStats?.overview?.avgDuration / 60)}m ${currentStats?.overview?.avgDuration % 60}s`}
          icon={Clock}
          // trend={{ value: 3.1, isPositive: false }}
          description="vs last period"
          loading={loading}
        />
        <StatisticsCard
          title="Bounce Rate"
          value={`${currentStats?.overview?.bounceRate || 0}%`}
          icon={Clock}
          // trend={{ value: 3.1, isPositive: false }}
          description="vs last period"
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PageViewChart
          data={dailyData || currentStats.dailyViews}
          loading={dailyLoading}
          title="Daily Page Views"
        />
        <HourlyChart
          data={hourlyData || currentStats.hourlyViews}
          loading={hourlyLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPagesTable
          data={currentStats.topPages}
          loading={loading}
        />
        <PageViewChart
          data={dailyData || currentStats.dailyViews}
          type="bar"
          loading={dailyLoading}
          title="Views vs Unique Users"
        />
      </div>
    </div>
  )
} 