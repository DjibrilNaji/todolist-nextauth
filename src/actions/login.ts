"use server"

import { AuthError } from "next-auth"
import { z } from "zod"

import { signIn } from "@/auth"
import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/web/routes"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Invalid fields !" }
  }

  const { email, password } = validateFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials !" }

        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error
  }
}
