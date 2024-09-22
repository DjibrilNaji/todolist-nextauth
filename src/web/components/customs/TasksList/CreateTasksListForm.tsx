import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { TasksListSchema } from "@/schemas"
import { TaskListType } from "@/types/formTypes"
import CustomFormField from "@/web/components/customs/Auth/CustomFormField"
import FormError from "@/web/components/customs/Auth/FormError"
import { BackButton } from "@/web/components/customs/Utils/BackButton"
import { Button } from "@/web/components/ui/button"
import { Form } from "@/web/components/ui/form"
import { useCreateTasksList } from "@/web/service/tasks"

interface CreateTasksListFormProps {
  userId: string
}

export default function CreateTasksListForm({ userId }: CreateTasksListFormProps) {
  const [error, setError] = useState("")
  const form = useForm<z.infer<typeof TasksListSchema>>({
    resolver: zodResolver(TasksListSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  })
  const { mutate, isPending } = useCreateTasksList()
  const handleSubmit = ({ name, description }: TaskListType) => {
    setError("")
    mutate(
      { name, description, ownerId: userId },
      {
        onError: (err) => {
          setError(err.message)
        }
      }
    )
  }

  return (
    <div className="flex flex-col flex-1 ">
      <BackButton className="m-2" />
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Create Tasks List</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-[400px]">
            <div className="space-y-4">
              <CustomFormField<TaskListType>
                form={form}
                name="name"
                label="Name"
                isPending={isPending}
                placeholder="My name"
              />
              <CustomFormField<TaskListType>
                form={form}
                name="description"
                label="Description"
                isPending={isPending}
                placeholder="My description"
              />
            </div>

            <FormError message={error} />

            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
