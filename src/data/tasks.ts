import { prisma } from "@/lib/prisma"

export const updateTaskById = async (taskId: string, { done }: { done?: boolean }) => {
  await prisma.task.update({ where: { id: taskId }, data: { done } })
}
