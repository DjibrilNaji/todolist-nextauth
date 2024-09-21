import { z } from "zod"

import { LoginSchema, RegisterSchema, TasksListSchema } from "@/schemas"

export type LoginType = z.infer<typeof LoginSchema>

export type RegisterType = z.infer<typeof RegisterSchema>

export type TaskListType = z.infer<typeof TasksListSchema>
