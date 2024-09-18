import { MoveLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/web/components/ui/button"

export function BackButton() {
  const router = useRouter()

  return (
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
  )
}
