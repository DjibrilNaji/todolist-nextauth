import { Task } from "@/types/task"
import { Checkbox } from "@/web/components/ui/checkbox"
import { useUpdateTaskById } from "@/web/service/tasks"

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const { mutate } = useUpdateTaskById()
  const onTaskUpdate = (taskId: string, done: boolean) => {
    mutate({ taskId, done })
  }

  return (
    <div className="border rounded-xl p-2 px-4 flex justify-between items-center w-full">
      <h1 className={task.done ? "line-through" : ""}>{task.title}</h1>
      <Checkbox
        checked={task.done}
        className="rounded-full h-6 w-6"
        onCheckedChange={() => {
          onTaskUpdate(task.id, !task.done)
        }}
      />
    </div>
  )
}
