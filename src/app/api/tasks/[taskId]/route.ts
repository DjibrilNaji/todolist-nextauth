import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { deleteTask, updateTaskById } from "@/data/tasks"
import { booleanValidator } from "@/validators"

export async function PATCH(
  req: NextRequest,
  { params: { taskId } }: { params: { taskId: string } }
) {
  const body = (await req.json()) as {
    done?: boolean
  }
  const data = z.object({
    done: z.optional(booleanValidator)
  })
  const isValidParams = data.safeParse({
    done: body.done
  })

  if (!isValidParams.success) {
    const { errors } = isValidParams.error

    return NextResponse.json({ error: "Invalid Argument", errors }, { status: 422 })
  }

  try {
    await updateTaskById(taskId, body)
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: { message: e.message } }, { status: 500 })
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }

  return Response.json({ result: true })
}

export async function DELETE(
  req: NextRequest,
  { params: { taskId } }: { params: { taskId: string } }
) {
  try {
    if (!taskId) {
      return NextResponse.json({ error: "Invalid Argument" }, { status: 422 })
    }

    await deleteTask(taskId)

    return NextResponse.json({ message: "Task successfully deleted", status: 200 }, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: { message: error.message } }, { status: 500 })
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
