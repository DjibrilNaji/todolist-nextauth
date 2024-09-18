import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { LoginSchema } from "@/schemas"
import { LoginType } from "@/types/formTypes"
import CustomFormField from "@/web/components/customs/Auth/CustomFormField"
import FormError from "@/web/components/customs/Auth/FormError"
import FormSuccess from "@/web/components/customs/Auth/FormSuccess"
import CardWrapper from "@/web/components/customs/CardWrapper/CardWrapper"
import { Button } from "@/web/components/ui/button"
import { Form } from "@/web/components/ui/form"
import routes from "@/web/routes"
import { useLogin } from "@/web/service/auth/login"

export default function LoginForm() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : ""
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const { mutate, isPending } = useLogin()
  const handleSubmit = (values: LoginType) => {
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
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account ?"
      backButtonHref={routes.auth.register}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <CustomFormField<LoginType>
              form={form}
              name="email"
              label="Email"
              isPending={isPending}
              placeholder="john@gmail.com"
            />
            <CustomFormField<LoginType>
              form={form}
              name="password"
              label="Password"
              isPending={isPending}
              placeholder="******"
              type="password"
            />
          </div>

          <FormError message={error || urlError} />
          <FormSuccess message={success} />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
