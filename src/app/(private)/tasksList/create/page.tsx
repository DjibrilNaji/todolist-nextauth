"use client"
import CreateTasksList from "@/web/components/customs/TasksList/CreateTasksList"
import useAppContext from "@/web/hooks/useAppContext"

export default function TasksListCreate() {
  const { userId } = useAppContext()

  if (!userId) {
    return null
  }

  return <CreateTasksList userId={userId} />
}
