"use client"

import BurgerMenu from "@/web/components/customs/Layout/BurgerMenu"
import SideBar from "@/web/components/customs/Layout/SideBar"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <BurgerMenu />
        {children}
      </div>
    </div>
  )
}
