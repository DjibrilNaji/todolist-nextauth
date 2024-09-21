import { MoveLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/web/components/ui/button"

interface BackButtonProps {
  className?: string
}

export function BackButton({ className }: BackButtonProps) {
  const router = useRouter()

  return (
    <Button
      variant="link"
      size="fit"
      className={cn("flex gap-2", className)}
      onClick={() => {
        router.back()
      }}
    >
      <MoveLeft className="h-5 w-5" />
      Back
    </Button>
  )
}
