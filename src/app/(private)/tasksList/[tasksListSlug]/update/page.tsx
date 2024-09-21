"use client"

import UpdateTasksList from "@/web/components/customs/TasksList/UpdateTasksList"
import useAppContext from "@/web/hooks/useAppContext"

export default function TasksListUpdate() {
  const { userId } = useAppContext()

  if (!userId) {
    return null
  }

  return <UpdateTasksList userId={userId} />
}
