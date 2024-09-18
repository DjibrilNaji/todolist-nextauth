import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { RegisterSchema } from "@/schemas"
import { RegisterType } from "@/types/formTypes"
import CustomFormField from "@/web/components/customs/Auth/CustomFormField"
import FormError from "@/web/components/customs/Auth/FormError"
import FormSuccess from "@/web/components/customs/Auth/FormSuccess"
import CardWrapper from "@/web/components/customs/CardWrapper/CardWrapper"
import { Button } from "@/web/components/ui/button"
import { Form } from "@/web/components/ui/form"
import routes from "@/web/routes"
import { useRegister } from "@/web/service/auth/register"

export default function RegisterForm() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })
  const { mutate, isPending } = useRegister()
  const handleSubmit = (values: RegisterType) => {
    setError("")
    setSuccess("")
    mutate(values, {
      onError: (err) => {
        setError(err.message)
      }
    })
  }

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account ?"
      backButtonHref={routes.auth.login}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <CustomFormField<RegisterType>
              form={form}
              name="name"
              label="Name"
              isPending={isPending}
              placeholder="John Doe"
            />
            <CustomFormField<RegisterType>
              form={form}
              name="email"
              label="Email"
              isPending={isPending}
              placeholder="john@gmail.com"
            />
            <CustomFormField<RegisterType>
              form={form}
              name="password"
              label="Password"
              isPending={isPending}
              placeholder="******"
              type="password"
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
