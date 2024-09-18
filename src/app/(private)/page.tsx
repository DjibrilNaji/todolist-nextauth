"use client"

import { TodoList } from "@/web/components/customs/TasksList/TodoList"
import useAppContext from "@/web/hooks/useAppContext"

export default function Home() {
  const { ownerId } = useAppContext()

  if (!ownerId) {
    return null
  }

  return <TodoList ownerId={ownerId} />
}
