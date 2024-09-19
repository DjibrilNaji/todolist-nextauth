import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { getTasksList, getTasksListBySlug, updateTaskById } from "@/web/service/tasks/function"

export const useGetTasksList = (userId: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["tasksList", userId],
    queryFn: () => getTasksList(userId)
  })

  return {
    data,
    isPending,
    error
  }
}

export const useGetTasksListBySlug = (userId: string, slug: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["tasksList", userId, slug],
    queryFn: () => getTasksListBySlug(userId, slug)
  })

  return {
    data,
    isPending,
    error
  }
}

export const useUpdateTaskById = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ taskId, done }: { taskId: string; done: boolean }) =>
      await updateTaskById(taskId, { done }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasksList"] })
    }
  })

  return { mutate, isPending }
}
