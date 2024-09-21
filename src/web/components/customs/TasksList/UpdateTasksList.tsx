"use client"

import { usePathname } from "next/navigation"

import TasksListForm from "@/web/components/customs/TasksList/TaskListForm"
import { Error } from "@/web/components/customs/Utils/Error"
import { Spinner } from "@/web/components/customs/Utils/Spinner"
import { useGetTasksListBySlug } from "@/web/service/tasks"

interface UpdateTasksListProps {
  userId: string
}

export default function UpdateTasksList({ userId }: UpdateTasksListProps) {
  const pathname = usePathname()
  const [, , tasksListSlug] = pathname.split("/")
  const { data, isPending, error } = useGetTasksListBySlug(userId, tasksListSlug)

  if (isPending) {
    return <Spinner />
  }

  if (error) {
    return <Error error={error.message} />
  }

  return <TasksListForm tasksList={data} />
}
