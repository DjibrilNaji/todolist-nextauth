"use client"

import React from "react"

import BurgerMenu from "@/web/components/customs/Layout/BurgerMenu"
import SideBar from "@/web/components/customs/Layout/SideBar"
import useAppContext from "@/web/hooks/useAppContext"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { userImage, userName } = useAppContext()

  return (
    <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar userImage={userImage} userName={userName} />
      <div className="flex flex-col">
        <BurgerMenu userImage={userImage} userName={userName} />
        {children}
      </div>
    </div>
  )
}
