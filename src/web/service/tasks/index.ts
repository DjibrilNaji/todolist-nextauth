import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  createTask,
  deleteTaskById,
  getTasksList,
  getTasksListBySlug,
  updateTaskById,
  updateTasksListBySlug
} from "@/web/service/tasks/function"

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

export const useUpdateTasksListBySlug = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      tasksListSlug,
      name,
      description
    }: {
      tasksListSlug: string
      name: string
      description: string
    }) => await updateTasksListBySlug(tasksListSlug, { name, description }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasksList"] })
      toast.success("Tasks list updated successfully")
      router.back()
    }
  })

  return { mutate, isPending }
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      tasksListSlug,
      title,
      description = ""
    }: {
      tasksListSlug: string
      title: string
      description?: string
    }) => await createTask(tasksListSlug, { title, description }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasksList"] })
      toast.success("Task created successfully")
    }
  })

  return { mutate, isPending }
}

export const useDeleteTaskById = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async (taskId: string) => await deleteTaskById(taskId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasksList"] })
      toast.success("Task deleted successfully")
    }
  })

  return { mutate, isPending }
}
