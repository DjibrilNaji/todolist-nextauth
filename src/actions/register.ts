"use server"

import { z } from "zod"

import { getUserByEmail } from "@/data/user"
import { prisma } from "@/lib/prisma"
import { RegisterSchema } from "@/schemas"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Invalid fields !" }
  }

  const { name, email, password } = validateFields.data

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email already exists !" }
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password
    }
  })

  return { success: "Email sent !" }
}
