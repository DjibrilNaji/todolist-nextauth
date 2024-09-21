import { Trash2 } from "lucide-react"

import { Button } from "@/web/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/web/components/ui/dialog"
import { useDeleteTaskById } from "@/web/service/tasks"

interface DeleteTaskDialogProps {
  taskId: string
}

export function DeleteTaskDialog({ taskId }: DeleteTaskDialogProps) {
  const { mutate } = useDeleteTaskById()

  const handleDeleteTask = () => {
    mutate(taskId)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the task from your list.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDeleteTask}>
            Delete task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
