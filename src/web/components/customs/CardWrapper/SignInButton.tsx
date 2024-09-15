import { signIn } from "next-auth/react"
import React from "react"

import { Button } from "@/web/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/web/routes"

interface SignInButtonProps {
  provider: string
  text: string
  icon: React.ReactNode
}

export default function SignInButton({ provider, text, icon }: SignInButtonProps) {
  return (
    <Button
      size="lg"
      className="w-full gap-2"
      variant="outline"
      onClick={() => signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT })}
    >
      {icon}
      {text}
    </Button>
  )
}
