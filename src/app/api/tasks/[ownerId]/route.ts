import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params: { ownerId } }: { params: { ownerId: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: ownerId }
    })

    if (!user) {
      return NextResponse.json("User not found", { status: 404 })
    }

    const tasks = await prisma.taskList.findMany({
      where: { ownerId },
      include: { Task: true }
    })

    return NextResponse.json(tasks, { status: 200 })
  } catch (error: unknown) {
    throw new Error("Failed to fetch data")
  }
}
