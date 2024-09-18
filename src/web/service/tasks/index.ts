import { useQuery } from "@tanstack/react-query"

import { getTasksList } from "@/web/service/tasks/function"

export const useGetTasksList = (ownerId: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["tasksList", ownerId],
    queryFn: () => getTasksList(ownerId)
  })

  return {
    data,
    isPending,
    error
  }
}
