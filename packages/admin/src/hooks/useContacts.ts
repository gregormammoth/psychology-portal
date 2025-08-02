import { useMutation, useQuery, useQueryClient } from 'react-query'
import { contactApi } from '../services/contactApi'

export const useContacts = () => {
  return useQuery('contacts', contactApi.getContacts, {
    refetchInterval: 30000,
  })
}

export const useContact = (id: string) => {
  return useQuery(['contact', id], () => contactApi.getContact(id), {
    enabled: !!id,
  })
}

export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, status }: { id: string; status: string }) =>
      contactApi.updateContactStatus(id, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contacts')
      },
    }
  )
}

export const useDeleteContact = () => {
  const queryClient = useQueryClient()

  return useMutation(contactApi.deleteContact, {
    onSuccess: () => {
      queryClient.invalidateQueries('contacts')
    },
  })
}