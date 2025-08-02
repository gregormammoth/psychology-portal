import { useState } from 'react'
import { X, Send } from 'lucide-react'
import { Faq, FaqAnswerData } from '../types/faq'
import { useAnswerQuestion } from '../hooks/useFaq'

interface AnswerModalProps {
  question: Faq
  isOpen: boolean
  onClose: () => void
}

export default function AnswerModal({ question, isOpen, onClose }: AnswerModalProps) {
  const [formData, setFormData] = useState<FaqAnswerData>({
    answer: question.answer || '',
    answeredBy: question.answeredBy || 'Admin',
    isPublished: question.isPublished,
    priority: question.priority,
  })

  const answerMutation = useAnswerQuestion()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await answerMutation.mutateAsync({
        id: question._id,
        answerData: formData,
      })
      onClose()
    } catch (error) {
      console.error('Failed to answer question:', error)
    }
  }

  const handleChange = (field: keyof FaqAnswerData, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Answer Question</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Question</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-gray-900">{question.question}</p>
              <div className="mt-2 text-sm text-gray-500">
                From: {question.name || 'Anonymous'} ({question.email})
                {question.category && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {question.category}
                  </span>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer *
              </label>
              <textarea
                value={formData.answer}
                onChange={(e) => handleChange('answer', e.target.value)}
                rows={6}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Provide a helpful answer..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answered By
                </label>
                <input
                  type="text"
                  value={formData.answeredBy || ''}
                  onChange={(e) => handleChange('answeredBy', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={0}>Normal</option>
                  <option value={1}>High</option>
                  <option value={2}>Very High</option>
                  <option value={-1}>Low</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => handleChange('isPublished', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Publish immediately
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={answerMutation.isLoading || !formData.answer.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded-md transition-colors flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>{answerMutation.isLoading ? 'Saving...' : 'Save Answer'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}