import axios, { AxiosError } from "axios"

import { TaskList } from "@/types/task"
import routes from "@/web/routes"

export const getTasksList = async (ownerId: string) => {
  try {
    const { data }: { data: TaskList[] } = await axios.get(routes.api.tasks.tasksList(ownerId))

    return data
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response?.data) {
      const errorMessage =
        typeof err.response.data === "string"
          ? err.response.data
          : JSON.stringify(err.response.data)

      throw new Error(errorMessage)
    }

    throw new Error("serverError")
  }
}
