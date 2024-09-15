import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { login } from "@/actions/login"
import { LoginSchema } from "@/schemas"
import FormError from "@/web/components/customs/Auth/FormError"
import CardWrapper from "@/web/components/customs/CardWrapper/CardWrapper"
import { Button } from "@/web/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/web/components/ui/form"
import { Input } from "@/web/components/ui/input"
import routes from "@/web/routes"

export default function LoginForm() {
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

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account ?"
      backButtonHref={routes.auth.register()}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => login(values))} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={false} placeholder="john@gmail.com" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={false} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={urlError} />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
