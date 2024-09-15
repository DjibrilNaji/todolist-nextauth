"use client"
import { Button } from "@/web/components/ui/button"
import { signOut } from "next-auth/react"

export default function Home() {
  return (
    <div>
      <Button onClick={() => signOut()}>Se déconnecter</Button>
    </div>
  )
}
