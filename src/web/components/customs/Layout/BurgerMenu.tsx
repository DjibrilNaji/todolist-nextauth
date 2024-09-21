"use client"

import { Menu, User } from "lucide-react"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"

import { navigationItems } from "@/data/navigation"
import NavLink from "@/web/components/customs/Layout/NavLink"
import { ModeToggle } from "@/web/components/customs/Utils/ModeToggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/web/components/ui/avatar"
import { Button } from "@/web/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet"

interface BurgerMenuProps {
  userImage: string | null | undefined
  userName: string | null | undefined
}

export default function BurgerMenu({ userImage, userName }: BurgerMenuProps) {
  const { theme } = useTheme()

  return (
    <div
      className={`flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 sticky top-0 z-50 ${theme === "dark" ? "bg-slate-950" : "bg-white"}`}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="h-full flex flex-col justify-between">
            <div className="grid gap-4 text-lg font-medium">
              <div className="flex items-center gap-4">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={userImage || ""} />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <p className="truncate" title={userName || ""}>
                  {userName}
                </p>

                <ModeToggle />
              </div>

              {navigationItems.map((item, index) => (
                <NavLink
                  key={index}
                  item={item}
                  icon={<item.icon className="h-5 w-5" />}
                  className="mx-[-0.65rem]"
                />
              ))}
            </div>

            <Button onClick={() => signOut()} className="m-4">
              Se déconnecter
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
