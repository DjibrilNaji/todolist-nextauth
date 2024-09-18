import { Button } from "@/web/components/ui/button"

export default function EmptyTasks() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold">You don't have any task yet.</h3>
        <p className="text-sm text-muted-foreground">Click the button below to add a new task.</p>
        (not implemented)
        <Button className="mt-4" disabled>
          Add task
        </Button>
      </div>
    </div>
  )
}
