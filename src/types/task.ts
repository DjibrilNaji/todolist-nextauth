export type TaskList = {
  id: string
  name: string
  slug: string
  ownerId: string
  description?: string
  Task: Task[]
}

export type Task = {
  id: string
  title: string
  description?: string
  userId: string
  taskListId: string
  done: boolean
}
