"use client"

import Tasks from "@/web/components/customs/TasksList/Tasks"
import useAppContext from "@/web/hooks/useAppContext"

export default function TasksList() {
  const { userId } = useAppContext()

  if (!userId) {
    return null
  }

  return <Tasks userId={userId} />
}
