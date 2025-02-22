import { NextRequest, NextResponse } from "next/server"

import { getTasksListByOwner } from "@/data/tasks"
import { getUserById } from "@/data/user"

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const user = await getUserById(userId)

    if (!user) {
      return NextResponse.json("User not found", { status: 404 })
    }

    const tasksList = await getTasksListByOwner(userId)

    return NextResponse.json(tasksList, { status: 200 })
  } catch (error: unknown) {
    throw new Error("Failed to fetch data")
  }
}
