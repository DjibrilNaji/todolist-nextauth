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

export const getUniqueTasksListWithTasksBySlug = async (slug: string) =>
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

export const getUniqueTasksListBySlug = async (tasksListSlug: string) =>
  await prisma.taskList.findUnique({
    where: { slug: tasksListSlug }
  })

export const createTask = async (
  title: string,
  description: string,
  userId: string,
  taskListId: string
) =>
  await prisma.task.create({
    data: {
      title,
      description,
      userId,
      taskListId
    }
  })

export const deleteTask = async (taskId: string) =>
  await prisma.task.delete({ where: { id: taskId } })
