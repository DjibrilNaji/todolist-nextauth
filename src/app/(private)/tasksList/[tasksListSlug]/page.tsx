"use client"

import { Button } from "@/web/components/ui/button"
import { MoveLeft } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function TasksList() {
  const pathname = usePathname()
  const router = useRouter()
  const [, , tasksListSlug] = pathname.split("/")

  return (
    <div className="p-4">
      <Button
        variant="link"
        size="fit"
        className="flex gap-2 mb-5"
        onClick={() => {
          router.back()
        }}
      >
        <MoveLeft className="h-5 w-5" />
        Back
      </Button>
      List {tasksListSlug}
    </div>
  )
}
