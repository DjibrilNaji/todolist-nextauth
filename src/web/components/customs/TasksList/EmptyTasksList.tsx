import { Button } from "@/web/components/ui/button"

export default function EmptyTasksList() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold">You don't have any todos list yet.</h3>
        <p className="text-sm text-muted-foreground">
          Click the button below to add a new list of todo.
        </p>
        (not implemented)
        <Button className="mt-4" disabled>
          Add list of todo
        </Button>
      </div>
    </div>
  )
}
