import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { format } from 'date-fns'

interface ChartData {
  date: string
  views: number
  uniqueUsers: number
}

interface PageViewChartProps {
  data: ChartData[]
  type?: 'line' | 'bar'
  loading?: boolean
  title?: string
}

export default function PageViewChart({
  data,
  type = 'line',
  loading = false,
  title = 'Page Views Over Time',
}: PageViewChartProps) {
  if (loading) {
    return (
      <div className="card">
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
      </div>
    )
  }

  const ChartComponent = type === 'line' ? LineChart : BarChart

  return (
    <div className="card">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => format(new Date(value), 'MMM dd')}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
              formatter={(value, name) => [value, name === 'views' ? 'Page Views' : 'Unique Users']}
            />
            {type === 'line' ? (
              <>
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ fill: '#0ea5e9' }}
                />
                <Line
                  type="monotone"
                  dataKey="uniqueUsers"
                  stroke="#ec4899"
                  strokeWidth={2}
                  dot={{ fill: '#ec4899' }}
                />
              </>
            ) : (
              <>
                <Bar dataKey="views" fill="#0ea5e9" />
                <Bar dataKey="uniqueUsers" fill="#ec4899" />
              </>
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 