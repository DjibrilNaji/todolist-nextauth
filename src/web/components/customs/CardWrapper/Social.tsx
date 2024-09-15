"use client"

import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

import SignInButton from "@/web/components/customs/CardWrapper/SignInButton"

export default function Social() {
  return (
    <div className="flex flex-col items-center w-full gap-2">
      <SignInButton
        provider="google"
        text="Se connecter avec Google"
        icon={<FcGoogle className="h-5 w-5" />}
      />
      <SignInButton
        provider="github"
        text="Se connecter avec Github"
        icon={<FaGithub className="h-5 w-5" />}
      />
    </div>
  )
}
