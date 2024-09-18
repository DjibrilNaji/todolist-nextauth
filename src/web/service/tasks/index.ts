import { useQuery } from "@tanstack/react-query"

import { getTasksList } from "@/web/service/tasks/function"

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
