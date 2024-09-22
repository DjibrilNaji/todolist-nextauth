"use client"

import CreateTasksListForm from "@/web/components/customs/TasksList/CreateTasksListForm"

interface UpdateTasksListProps {
  userId: string
}

export default function CreateTasksList({ userId }: UpdateTasksListProps) {
  return <CreateTasksListForm userId={userId} />
}
