import { useState } from 'react'
import { format } from 'date-fns'
import { 
  MessageSquare, 
  Mail, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff,
  Star,
  User
} from 'lucide-react'
import { Faq } from '../types/faq'
import { 
  useUpdateQuestionStatus, 
  usePublishQuestion, 
  useUpdatePriority, 
  useDeleteQuestion 
} from '../hooks/useFaq'
import AnswerModal from './AnswerModal'

interface FaqTableProps {
  data: Faq[]
  loading?: boolean
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  answered: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const statusIcons = {
  pending: Clock,
  answered: MessageSquare,
  completed: CheckCircle,
  cancelled: XCircle,
}

const priorityColors = {
  2: 'text-red-600',   // Very High
  1: 'text-orange-600', // High
  0: 'text-gray-600',   // Normal
  '-1': 'text-gray-400', // Low
}

const priorityLabels = {
  2: 'Very High',
  1: 'High',
  0: 'Normal',
  '-1': 'Low',
}

export default function FaqTable({ data, loading }: FaqTableProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<Faq | null>(null)
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false)

  const updateStatusMutation = useUpdateQuestionStatus()
  const publishMutation = usePublishQuestion()
  const updatePriorityMutation = useUpdatePriority()
  const deleteQuestionMutation = useDeleteQuestion()

  const handleStatusUpdate = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status })
  }

  const handlePublishToggle = (id: string, isPublished: boolean) => {
    publishMutation.mutate({ id, isPublished: !isPublished })
  }

  const handlePriorityUpdate = (id: string, priority: number) => {
    updatePriorityMutation.mutate({ id, priority })
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      deleteQuestionMutation.mutate(id)
    }
  }

  const handleAnswerClick = (question: Faq) => {
    setSelectedQuestion(question)
    setIsAnswerModalOpen(true)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">FAQ Questions</h3>
          <p className="text-sm text-gray-500">Manage frequently asked questions</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Answer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No FAQ questions found
                  </td>
                </tr>
              ) : (
                data?.map((faq) => {
                  const StatusIcon = statusIcons[faq.status as keyof typeof statusIcons] || Clock
                  return (
                    <tr key={faq._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900 line-clamp-2">
                            {faq.question}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center text-xs text-gray-500">
                              <Mail className="h-3 w-3 mr-1" />
                              {faq.email}
                            </div>
                            {faq.name && (
                              <div className="flex items-center text-xs text-gray-500">
                                <User className="h-3 w-3 mr-1" />
                                {faq.name}
                              </div>
                            )}
                            {faq.category && (
                              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {faq.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {faq.answer ? (
                          <div className="space-y-1">
                            <div className="text-sm text-gray-900 line-clamp-2">
                              {faq.answer}
                            </div>
                            {faq.answeredBy && (
                              <div className="text-xs text-gray-500">
                                By: {faq.answeredBy}
                              </div>
                            )}
                            {faq.answeredAt && (
                              <div className="text-xs text-gray-500">
                                {format(new Date(faq.answeredAt), 'MMM dd, yyyy')}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">No answer yet</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusColors[faq.status as keyof typeof statusColors] || statusColors.pending
                            }`}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {faq.status}
                          </span>
                          <select
                            value={faq.status}
                            onChange={(e) => handleStatusUpdate(faq._id, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="answered">Answered</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Star 
                            className={`h-4 w-4 ${
                              priorityColors[faq.priority as keyof typeof priorityColors]
                            }`} 
                          />
                          <select
                            value={faq.priority}
                            onChange={(e) => handlePriorityUpdate(faq._id, parseInt(e.target.value))}
                            className={`text-xs border border-gray-300 rounded px-2 py-1 ${
                              priorityColors[faq.priority as keyof typeof priorityColors]
                            }`}
                          >
                            <option value={2}>Very High</option>
                            <option value={1}>High</option>
                            <option value={0}>Normal</option>
                            <option value={-1}>Low</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handlePublishToggle(faq._id, faq.isPublished)}
                          className={`inline-flex items-center px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                            faq.isPublished
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {faq.isPublished ? (
                            <>
                              <Eye className="h-3 w-3 mr-1" />
                              Published
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3 w-3 mr-1" />
                              Draft
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(faq.submittedAt), 'MMM dd, yyyy')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleAnswerClick(faq)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Answer question"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(faq._id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete question"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedQuestion && (
        <AnswerModal
          question={selectedQuestion}
          isOpen={isAnswerModalOpen}
          onClose={() => {
            setIsAnswerModalOpen(false)
            setSelectedQuestion(null)
          }}
        />
      )}
    </>
  )
}