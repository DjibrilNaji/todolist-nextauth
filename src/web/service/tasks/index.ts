import { useQuery } from "@tanstack/react-query"

import { getTasksList, getTasksListBySlug } from "@/web/service/tasks/function"

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
