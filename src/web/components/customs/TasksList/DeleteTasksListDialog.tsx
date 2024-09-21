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
import { useDeleteTasksListBySlug } from "@/web/service/tasks"

interface DeleteTaskDialogProps {
  tasksListSlug: string
}

export function DeleteTasksListDialog({ tasksListSlug }: DeleteTaskDialogProps) {
  const { mutate } = useDeleteTasksListBySlug()

  const handleDeleteTasksList = () => {
    mutate(tasksListSlug)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this tasks list?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. All tasks in this list will be deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleDeleteTasksList}>
              Delete tasks list
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
