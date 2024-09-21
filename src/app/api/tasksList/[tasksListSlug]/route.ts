import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { updateTasksListBySlug } from "@/data/tasks"
import { stringValidator } from "@/validators"

export async function PATCH(
  req: NextRequest,
  { params: { tasksListSlug } }: { params: { tasksListSlug: string } }
) {
  const body = (await req.json()) as {
    name: string
    description: string
  }
  const data = z.object({
    name: stringValidator,
    description: stringValidator
  })
  const { name, description } = body
  const isValidParams = data.safeParse({ name, description })

  if (!isValidParams.success) {
    const { errors } = isValidParams.error

    return NextResponse.json({ error: "Invalid Argument", errors }, { status: 422 })
  }

  try {
    await updateTasksListBySlug(tasksListSlug, { name, description })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: { message: e.message } }, { status: 500 })
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }

  return Response.json({ result: true })
}
