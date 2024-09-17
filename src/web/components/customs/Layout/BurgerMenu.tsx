"use client"

import { ClipboardList, Menu } from "lucide-react"

import { navigationItems } from "@/data/navigation"
import { Button } from "@/web/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet"
import NavLink from "./NavLink"

export default function BurgerMenu() {
  return (
    <div className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <ClipboardList className="h-6 w-6" />
            {navigationItems.map((item, index) => (
              <NavLink
                key={index}
                item={item}
                icon={<item.icon className="h-5 w-5" />}
                className="mx-[-0.65rem]"
              />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
