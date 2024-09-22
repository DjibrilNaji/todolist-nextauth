"use client"

import LoginForm from "@/web/components/customs/Auth/LoginForm"
import { Suspense } from "react"

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
