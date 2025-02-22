import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

import authConfig from "@/auth.config"
import { prisma } from "@/lib/prisma"
import routes from "@/web/routes"

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: routes.auth.login,
    error: routes.auth.error
  },
  callbacks: {
    session({ token, session }) {
      if (token.sub) {
        session.user.id = token.sub
      }

      return session
    }
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  ...authConfig
})
