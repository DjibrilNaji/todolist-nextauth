import { TriangleAlert } from "lucide-react"

interface ErrorProps {
  error?: string
}

export function Error({ error }: ErrorProps) {
  return (
    <div className="flex h-full justify-center items-center">
      <h1 className="font-bold text-xl justify-center flex flex-col items-center gap-4">
        <TriangleAlert /> {error || "Oops! something went wrong."}
      </h1>
    </div>
  )
}
