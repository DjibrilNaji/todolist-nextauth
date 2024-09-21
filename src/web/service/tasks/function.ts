import axios, { AxiosError } from "axios"

import { TaskList } from "@/types/task"
import routes from "@/web/routes"

export const getTasksList = async (userId: string) => {
  try {
    const { data }: { data: TaskList[] } = await axios.get(routes.api.user.tasksList(userId))

    return data
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response?.data) {
      const errorMessage =
        typeof err.response.statusText === "string"
          ? err.response.statusText
          : JSON.stringify(err.response.statusText)

      throw new Error(errorMessage)
    }

    throw new Error("serverError")
  }
}

export const getTasksListBySlug = async (userId: string, slug: string) => {
  try {
    const { data }: { data: TaskList } = await axios.get(
      routes.api.user.tasksListBySlug(userId, slug)
    )

    return data
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response?.data) {
      const errorMessage =
        typeof err.response.statusText === "string"
          ? err.response.statusText
          : JSON.stringify(err.response.statusText)

      throw new Error(errorMessage)
    }

    throw new Error("serverError")
  }
}

export const updateTaskById = async (taskId: string, { done }: { done?: boolean }) => {
  try {
    const { data }: { data: boolean } = await axios.patch(routes.api.tasks.updateTask(taskId), {
      done
    })

    return data
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response?.data) {
      const errorMessage =
        typeof err.response.statusText === "string"
          ? err.response.statusText
          : JSON.stringify(err.response.statusText)

      throw new Error(errorMessage)
    }

    throw new Error("serverError")
  }
}

export const updateTasksListBySlug = async (
  tasksListSlug: string,
  { name, description }: { name?: string; description?: string }
) => {
  try {
    const { data }: { data: boolean } = await axios.patch(
      routes.api.tasks.updateTasksList(tasksListSlug),
      { name, description }
    )

    return data
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response?.data) {
      const errorMessage =
        typeof err.response.statusText === "string"
          ? err.response.statusText
          : JSON.stringify(err.response.statusText)

      throw new Error(errorMessage)
    }

    throw new Error("serverError")
  }
}

export const createTask = async (
  tasksListSlug: string,
  { title, description }: { title: string; description: string }
) => {
  try {
    const { data }: { data: boolean } = await axios.post(
      routes.api.tasks.createTask(tasksListSlug),
      { title, description }
    )

    return data
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response?.data) {
      const errorMessage =
        typeof err.response.statusText === "string"
          ? err.response.statusText
          : JSON.stringify(err.response.statusText)

      throw new Error(errorMessage)
    }

    throw new Error("serverError")
  }
}

export const deleteTaskById = async (taskId: string) => {
  try {
    const { data }: { data: boolean } = await axios.delete(routes.api.tasks.deleteTask(taskId))

    return data
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response?.data) {
      const errorMessage =
        typeof err.response.statusText === "string"
          ? err.response.statusText
          : JSON.stringify(err.response.statusText)

      throw new Error(errorMessage)
    }

    throw new Error("serverError")
  }
}
