import { ClipboardList, Settings } from "lucide-react"

import routes from "@/web/routes"

export const navigationItems = [
  {
    title: "Tasks List",
    href: routes.home,
    icon: ClipboardList
  },
  {
    title: "Settings",
    href: routes.settings,
    icon: Settings
  }
]
