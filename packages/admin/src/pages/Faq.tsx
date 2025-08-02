import { useState } from 'react'
import { MessageSquare, CheckCircle, Clock, Eye, Users } from 'lucide-react'
import { useFaqQuestions, usePendingQuestions, usePublishedFaqs } from '../hooks/useFaq'
import FaqTable from '../components/FaqTable'
import StatisticsCard from '../components/StatisticsCard'

type FaqView = 'all' | 'pending' | 'published'

export default function Faq() {
  const [currentView, setCurrentView] = useState<FaqView>('all')
  
  const { data: allQuestions, isLoading: allLoading, error: allError } = useFaqQuestions(true)
  const { data: pendingQuestions, isLoading: pendingLoading, error: pendingError } = usePendingQuestions()
  const { data: publishedQuestions, isLoading: publishedLoading, error: publishedError } = usePublishedFaqs()

  const getCurrentData = () => {
    switch (currentView) {
      case 'pending':
        return { data: pendingQuestions, loading: pendingLoading, error: pendingError }
      case 'published':
        return { data: publishedQuestions, loading: publishedLoading, error: publishedError }
      default:
        return { data: allQuestions, loading: allLoading, error: allError }
    }
  }

  const { data: currentData, loading: currentLoading, error: currentError } = getCurrentData()

  const stats = allQuestions ? {
    total: allQuestions.length,
    pending: allQuestions.filter(q => q.status === 'pending').length,
    answered: allQuestions.filter(q => q.answer && q.answer.trim() !== '').length,
    published: allQuestions.filter(q => q.isPublished).length,
  } : { total: 0, pending: 0, answered: 0, published: 0 }

  const viewOptions = [
    { key: 'all', name: 'All Questions', count: stats.total },
    { key: 'pending', name: 'Pending', count: stats.pending },
    { key: 'published', name: 'Published', count: stats.published },
  ]

  if (currentError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-lg font-medium mb-2">Error loading FAQ data</div>
          <p className="text-gray-600">
            {currentError instanceof Error ? currentError.message : 'Unknown error'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">FAQ Management</h2>
        <div className="text-sm text-gray-500">
          {stats.total} total questions
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard
          title="Total Questions"
          value={stats.total.toString()}
          icon={MessageSquare}
          description="All time"
          loading={allLoading}
        />
        <StatisticsCard
          title="Pending"
          value={stats.pending.toString()}
          icon={Clock}
          description="Awaiting answers"
          loading={allLoading}
        />
        <StatisticsCard
          title="Answered"
          value={stats.answered.toString()}
          icon={CheckCircle}
          description="Have responses"
          loading={allLoading}
        />
        <StatisticsCard
          title="Published"
          value={stats.published.toString()}
          icon={Eye}
          description="Publicly visible"
          loading={allLoading}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {viewOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setCurrentView(option.key as FaqView)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  currentView === option.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {option.name}
                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  currentView === option.key
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {option.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <FaqTable data={currentData || []} loading={currentLoading} />
        </div>
      </div>
    </div>
  )
}