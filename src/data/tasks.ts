import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const updateTaskById = async (taskId: string, { done }: { done?: boolean }) => {
  await prisma.task.update({ where: { id: taskId }, data: { done } })
}

export const updateTasksListBySlug = async (
  tasksListSlug: string,
  { name, description, slug }: { name: string; description: string; slug: string }
) => {
  await prisma.taskList.update({
    where: { slug: tasksListSlug },
    data: { name, description, slug }
  })

  return NextResponse.json({ result: true })
}

export const getTasksListByOwner = async (ownerId: string) =>
  await prisma.taskList.findMany({
    where: { ownerId },
    include: { Task: true },
    orderBy: {
      id: "asc"
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

export const createTask = async ({
  title,
  description,
  userId,
  taskListId
}: {
  title: string
  description: string
  userId: string
  taskListId: string
}) =>
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

export const deleteTaskByTasksListSlug = async (taskListId: string) =>
  await prisma.task.deleteMany({ where: { taskListId } })

export const deleteTasksList = async (tasksListSlug: string) => {
  await prisma.taskList.delete({ where: { slug: tasksListSlug } })
}

export const createTasksList = async ({
  name,
  description,
  ownerId,
  slug
}: {
  name: string
  description: string
  ownerId: string
  slug: string
}) => {
  await prisma.taskList.create({
    data: {
      name,
      description,
      ownerId,
      slug
    }
  })
}
