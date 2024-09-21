import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import {
  createTask,
  deleteTaskByTasksListSlug,
  deleteTasksList,
  getUniqueTasksListBySlug,
  updateTasksListBySlug
} from "@/data/tasks"
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

export async function POST(
  req: NextRequest,
  { params: { tasksListSlug } }: { params: { tasksListSlug: string } }
) {
  const body = (await req.json()) as {
    title: string
    description: string
  }
  const data = z.object({
    title: z.string(),
    description: z.string()
  })
  const isValidParams = data.safeParse({
    title: body.title,
    description: body.description
  })

  if (!isValidParams.success) {
    const { errors } = isValidParams.error

    return NextResponse.json({ error: "Invalid Argument", errors }, { status: 422 })
  }

  const { title, description } = body

  try {
    const taskList = await getUniqueTasksListBySlug(tasksListSlug)

    if (!taskList) {
      return NextResponse.json({ error: "Task list not found" }, { status: 404 })
    }

    await createTask(title, description, taskList.ownerId, taskList.id)
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: { message: e.message } }, { status: 500 })
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }

  return NextResponse.json({ result: true })
}

export async function DELETE(
  req: NextRequest,
  { params: { tasksListSlug } }: { params: { tasksListSlug: string } }
) {
  try {
    if (!tasksListSlug) {
      return NextResponse.json({ error: "Invalid Argument" }, { status: 422 })
    }

    const tasksList = await getUniqueTasksListBySlug(tasksListSlug)

    if (!tasksList) {
      return NextResponse.json({ error: "Tasks list not found" }, { status: 404 })
    }

    await deleteTaskByTasksListSlug(tasksList.id)
    await deleteTasksList(tasksListSlug)

    return NextResponse.json(
      { message: "Tasks list successfully deleted", status: 200 },
      { status: 200 }
    )
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: { message: error.message } }, { status: 500 })
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
