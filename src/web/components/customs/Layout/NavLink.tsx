"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface NavLinkProps {
  item: {
    title: string
    href: string
  }
  icon: React.ReactNode
  className?: string
}

export default function NavLink({ item: { title, href }, icon, className }: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2",
        pathname === href
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {icon}
      {title}
    </Link>
  )
}
