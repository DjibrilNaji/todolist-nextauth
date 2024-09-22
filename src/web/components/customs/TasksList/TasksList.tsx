"use client"

import { SquarePlus } from "lucide-react"
import Link from "next/link"

import EmptyTasksList from "@/web/components/customs/TasksList/EmptyTasksList"
import { Error } from "@/web/components/customs/Utils/Error"
import { Spinner } from "@/web/components/customs/Utils/Spinner"
import { Progress } from "@/web/components/ui/progress"
import routes from "@/web/routes"
import { useGetTasksList } from "@/web/service/tasks"

interface TasksListProps {
  userId: string
}

export function TasksList({ userId }: TasksListProps) {
  const { data, isPending, error } = useGetTasksList(userId)

  if (isPending) {
    return <Spinner />
  }

  if (error) {
    return <Error error={error.message} />
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between mr-2">
        <h1 className="text-lg font-semibold md:text-2xl">Select your lists</h1>
        <Link href={routes.tasks.createTasksList}>
          <SquarePlus className="w-8 h-8 cursor-pointer" />
        </Link>
      </div>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((taskList) => (
            <Link
              key={taskList.id}
              href={routes.tasks.tasksList(taskList.slug)}
              className="border p-2 truncate cursor-pointer flex flex-col gap-4 rounded-lg justify-between"
              title="TaskList"
            >
              <div className="flex justify-between md:flex-row gap-2">
                <h2 className="font-semibold truncate">{taskList.name}</h2>
                <span className="border rounded px-1 py-0 w-fit bg-white">
                  {taskList.Task.length}
                </span>
              </div>

              <p
                className={`truncate ${taskList.description ? "" : "text-sm italic text-muted-foreground"}`}
              >
                {taskList.description ? taskList.description : "No description"}
              </p>

              <Progress
                value={
                  (taskList.Task.filter((task) => task.done).length / taskList.Task.length) * 100
                }
              />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyTasksList />
      )}
    </div>
  )
}
