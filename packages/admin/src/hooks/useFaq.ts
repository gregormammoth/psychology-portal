import { useMutation, useQuery, useQueryClient } from 'react-query'
import { faqApi } from '../services/faqApi'
import { FaqAnswerData } from '../types/faq'

export const useFaqQuestions = (includeUnpublished = true) => {
  return useQuery(['faq-questions', includeUnpublished], () => faqApi.getQuestions(includeUnpublished), {
    refetchInterval: 30000,
  })
}

export const usePendingQuestions = () => {
  return useQuery('faq-pending', faqApi.getPendingQuestions, {
    refetchInterval: 15000,
  })
}

export const usePublishedFaqs = (category?: string) => {
  return useQuery(['faq-published', category], () => faqApi.getPublishedFaqs(category), {
    refetchInterval: 60000,
  })
}

export const useFaqQuestion = (id: string) => {
  return useQuery(['faq-question', id], () => faqApi.getQuestion(id), {
    enabled: !!id,
  })
}

export const useFaqCategories = () => {
  return useQuery('faq-categories', faqApi.getCategories, {
    refetchInterval: 300000, // 5 minutes
  })
}

export const useAnswerQuestion = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, answerData }: { id: string; answerData: FaqAnswerData }) =>
      faqApi.answerQuestion(id, answerData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('faq-questions')
        queryClient.invalidateQueries('faq-pending')
        queryClient.invalidateQueries('faq-published')
      },
    }
  )
}

export const useUpdateQuestionStatus = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, status }: { id: string; status: string }) =>
      faqApi.updateQuestionStatus(id, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('faq-questions')
        queryClient.invalidateQueries('faq-pending')
      },
    }
  )
}

export const usePublishQuestion = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      faqApi.publishQuestion(id, isPublished),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('faq-questions')
        queryClient.invalidateQueries('faq-published')
      },
    }
  )
}

export const useUpdatePriority = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, priority }: { id: string; priority: number }) =>
      faqApi.updatePriority(id, priority),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('faq-questions')
        queryClient.invalidateQueries('faq-published')
      },
    }
  )
}

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient()

  return useMutation(faqApi.deleteQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries('faq-questions')
      queryClient.invalidateQueries('faq-pending')
      queryClient.invalidateQueries('faq-published')
    },
  })
}