import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import { getUserByEmail } from "@/data/user"
import { LoginSchema } from "@/schemas"

export default {
  providers: [
    Google,
    GitHub,
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials)

        if (validateFields.success) {
          const { email } = validateFields.data

          const user = await getUserByEmail(email)

          if (!user || !user.password) return null

          return user
        }

        return null
      }
    })
  ]
} satisfies NextAuthConfig
