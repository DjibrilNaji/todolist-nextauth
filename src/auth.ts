import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

import authConfig from "@/auth.config"
import { prisma } from "@/lib/prisma"
import routes from "@/web/routes"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: routes.auth.login(),
    error: routes.auth.error()
  },
  ...authConfig
})
