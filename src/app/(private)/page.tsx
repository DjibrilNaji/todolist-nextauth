"use client"

import { TasksList } from "@/web/components/customs/TasksList/TasksList"
import useAppContext from "@/web/hooks/useAppContext"

export default function Home() {
  const { userId } = useAppContext()

  if (!userId) {
    return null
  }

  return <TasksList userId={userId} />
}
