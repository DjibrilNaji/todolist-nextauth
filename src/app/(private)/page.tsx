"use client"

import { TodoList } from "@/web/components/customs/TasksList/TodoList"
import useAppContext from "@/web/hooks/useAppContext"

export default function Home() {
  const { userId } = useAppContext()

  if (!userId) {
    return null
  }

  return <TodoList userId={userId} />
}
