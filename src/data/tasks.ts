import { prisma } from "@/lib/prisma"

export const updateTaskById = async (taskId: string, { done }: { done?: boolean }) => {
  await prisma.task.update({ where: { id: taskId }, data: { done } })
}

export const updateTasksListBySlug = async (
  tasksListSlug: string,
  { name, description }: { name: string; description: string }
) =>
  await prisma.taskList.update({
    where: { slug: tasksListSlug },
    data: { name, description }
  })

export const getTasksListByOwner = async (ownerId: string) =>
  await prisma.taskList.findMany({
    where: { ownerId },
    include: { Task: true },
    orderBy: {
      id: "desc"
    }
  })

export const getUniqueTasksListBySlug = async (slug: string) =>
  await prisma.taskList.findUnique({
    where: { slug },
    include: {
      Task: {
        orderBy: {
          id: "asc"
        }
      }
    }
  })
