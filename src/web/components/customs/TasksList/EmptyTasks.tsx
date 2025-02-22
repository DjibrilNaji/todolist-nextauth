export default function EmptyTasks() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold">You don't have any task yet.</h3>
        <p className="text-sm text-muted-foreground">Add a new task to get started.</p>
      </div>
    </div>
  )
}
