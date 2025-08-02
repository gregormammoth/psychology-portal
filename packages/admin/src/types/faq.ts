export interface Faq {
  _id: string
  question: string
  answer?: string
  email: string
  name?: string
  status: string
  isPublished: boolean
  priority: number
  category?: string
  submittedAt: string
  answeredAt?: string
  answeredBy?: string
  createdAt: string
  updatedAt: string
}

export interface FaqQuestionData {
  question: string
  email: string
  name?: string
  category?: string
}

export interface FaqAnswerData {
  answer: string
  answeredBy?: string
  isPublished?: boolean
  priority?: number
}