"use client"

import { signOut } from "next-auth/react"

import { auth } from "@/auth"
import { Button } from "@/web/components/ui/button"

export default async function Home() {
  const session = await auth()

  return (
    <div>
      <Button onClick={() => signOut()}>Se déconnecter</Button>
    </div>
  )
}
