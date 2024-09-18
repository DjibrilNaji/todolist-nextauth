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
