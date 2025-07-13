import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface HourlyData {
  hour: number
  views: number
}

interface HourlyChartProps {
  data: HourlyData[]
  loading?: boolean
}

export default function HourlyChart({ data, loading = false }: HourlyChartProps) {
  if (loading) {
    return (
      <div className="card">
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
      </div>
    )
  }

  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM'
    if (hour < 12) return `${hour} AM`
    if (hour === 12) return '12 PM'
    return `${hour - 12} PM`
  }

  return (
    <div className="card">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Hourly Activity</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              tickFormatter={formatHour}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => `${formatHour(value as number)}`}
              formatter={(value) => [value, 'Page Views']}
            />
            <Bar dataKey="views" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 