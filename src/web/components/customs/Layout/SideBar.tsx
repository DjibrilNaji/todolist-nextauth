import { User } from "lucide-react"
import { signOut } from "next-auth/react"

import { navigationItems } from "@/data/navigation"
import { Button } from "@/web/components/ui/button"
import useAppContext from "@/web/hooks/useAppContext"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import NavLink from "./NavLink"

export default function SideBar() {
  const { userImage, userName } = useAppContext()

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 sticky top-0">
          <div className="flex items-center gap-2 font-semibold overflow-hidden">
            <Avatar className="h-6 w-6">
              <AvatarImage src={userImage || ""} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <p className="truncate" title={userName || ""}>
              {userName}
            </p>
          </div>
        </div>

        <div className="flex-1">
          <nav className="px-2 text-sm font-medium lg:px-4">
            {navigationItems.map((item, index) => (
              <NavLink key={index} item={item} icon={<item.icon className="h-5 w-5" />} />
            ))}
          </nav>
        </div>
        <Button onClick={() => signOut()} className="m-4">
          Se déconnecter
        </Button>
      </div>
    </div>
  )
}
