"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/web/components/ui/button"

export default async function Home() {
  return <Button onClick={() => signOut()}>Se déconnecter</Button>
}
