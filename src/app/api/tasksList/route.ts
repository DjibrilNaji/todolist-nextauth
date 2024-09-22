import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { createTasksList, getUniqueTasksListBySlug } from "@/data/tasks"

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    name: string
    description: string
    ownerId: string
  }
  const data = z.object({
    name: z.string(),
    description: z.string(),
    ownerId: z.string()
  })
  const isValidParams = data.safeParse({
    name: body.name,
    description: body.description,
    ownerId: body.ownerId
  })

  if (!isValidParams.success) {
    const { errors } = isValidParams.error

    return NextResponse.json({ error: "Invalid Argument", errors }, { status: 422 })
  }

  const { name, description, ownerId } = body

  try {
    const slug = name.toLowerCase().replace(/ /gu, "-")
    const existingTasksList = await getUniqueTasksListBySlug(slug)

    if (existingTasksList) {
      throw new Error("Tasks list with this name already exists")
    }

    await createTasksList({ name, description, ownerId, slug })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: { message: e.message } }, { status: 500 })
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }

  return NextResponse.json({ result: true })
}
