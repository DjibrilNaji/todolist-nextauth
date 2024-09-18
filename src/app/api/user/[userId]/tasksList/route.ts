import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json("User not found", { status: 404 })
    }

    const tasks = await prisma.taskList.findMany({
      where: { ownerId: userId },
      include: { Task: true }
    })

    return NextResponse.json(tasks, { status: 200 })
  } catch (error: unknown) {
    throw new Error("Failed to fetch data")
  }
}
