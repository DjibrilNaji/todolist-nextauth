"use client"

import { Pencil } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { DeleteTaskDialog } from "@/web/components/customs/TasksList/DeleteTaskDialog"
import { DeleteTasksListDialog } from "@/web/components/customs/TasksList/DeleteTasksListDialog"
import EmptyTasks from "@/web/components/customs/TasksList/EmptyTasks"
import TaskItem from "@/web/components/customs/TasksList/TaskItem"
import { BackButton } from "@/web/components/customs/Utils/BackButton"
import { Error } from "@/web/components/customs/Utils/Error"
import { Spinner } from "@/web/components/customs/Utils/Spinner"
import { Button } from "@/web/components/ui/button"
import { Input } from "@/web/components/ui/input"
import routes from "@/web/routes"
import { useCreateTask, useGetTasksListBySlug } from "@/web/service/tasks"

interface TasksProps {
  userId: string
}

export default function Tasks({ userId }: TasksProps) {
  const pathname = usePathname()
  const [, , tasksListSlug] = pathname.split("/")
  const { data, isPending, error } = useGetTasksListBySlug(userId, tasksListSlug)
  const [title, setTitle] = useState("")
  const { mutate } = useCreateTask()
  const handleAddTask = () => {
    mutate({ title, tasksListSlug })
    setTitle("")
  }

  if (isPending) {
    return <Spinner />
  }

  if (error) {
    return <Error error={error.message} />
  }

  return (
    <div className="p-4 flex flex-col flex-1 h-full">
      <BackButton className="mb-5" />

      <h1 className="text-lg font-semibold flex items-center justify-between">
        {data?.name}
        <div className="flex gap-5">
          <Link href={routes.tasks.updateTasksList(tasksListSlug)}>
            <Pencil />
          </Link>
          <DeleteTasksListDialog tasksListSlug={tasksListSlug} />
        </div>
      </h1>

      <div className="flex gap-4 py-8">
        <Input
          placeholder="Add a new task"
          className="rounded-xl"
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          value={title}
        />
        <Button onClick={handleAddTask} disabled={!title}>
          Add task
        </Button>
      </div>

      {data?.Task && data.Task.length > 0 ? (
        <div className="flex flex-col gap-4">
          {data.Task.map((task, index) => (
            <div className="flex items-center gap-4 mr-2" key={index}>
              <TaskItem key={index} task={task} />
              <DeleteTaskDialog taskId={task.id} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyTasks />
      )}
    </div>
  )
}
