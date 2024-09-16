import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { register } from "@/actions/register"
import { RegisterType } from "@/types/formTypes"

export const useRegister = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: RegisterType) => await register(values),
    onSuccess: () => toast.success("Successfull", { description: "Register successfull" })
  })

  return { mutate, isPending }
}
