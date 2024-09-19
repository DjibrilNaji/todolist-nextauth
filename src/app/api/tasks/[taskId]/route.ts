import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { updateTaskById } from "@/data/tasks"
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
