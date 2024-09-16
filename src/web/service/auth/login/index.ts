import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { login } from "@/actions/login"
import { LoginType } from "@/types/formTypes"

export const useLogin = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LoginType) => await login(values),
    onSuccess: () => toast.success("Successfull", { description: "Login successfull" })
  })

  return { mutate, isPending }
}
