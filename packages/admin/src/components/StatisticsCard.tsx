import { LucideIcon } from 'lucide-react'

interface StatisticsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  description?: string
  loading?: boolean
}

export default function StatisticsCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  loading = false,
}: StatisticsCardProps) {
  if (loading) {
    return (
      <div className="stat-card">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="stat-card">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-8 w-8 text-primary-600" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
              {trend && (
                <div
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trend.isPositive ? '↗' : '↘'}
                  <span className="ml-1">{Math.abs(trend.value)}%</span>
                </div>
              )}
            </dd>
            {description && (
              <dd className="text-sm text-gray-600 mt-1">{description}</dd>
            )}
          </dl>
        </div>
      </div>
    </div>
  )
} 