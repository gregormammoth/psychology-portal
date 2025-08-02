export interface Contact {
  _id: string
  name: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  consultationType: string
  message?: string
  status: string
  submittedAt: string
  createdAt: string
  updatedAt: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  consultationType: string
  message?: string
}