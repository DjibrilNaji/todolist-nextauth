import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { TasksListSchema } from "@/schemas"
import { TaskListType } from "@/types/formTypes"
import { TaskList } from "@/types/task"
import CustomFormField from "@/web/components/customs/Auth/CustomFormField"
import FormError from "@/web/components/customs/Auth/FormError"
import { Button } from "@/web/components/ui/button"
import { Form } from "@/web/components/ui/form"
import { useUpdateTasksListBySlug } from "@/web/service/tasks"

interface TasksListFormProps {
  tasksList: TaskList | undefined
}

export default function TasksListForm({ tasksList }: TasksListFormProps) {
  const [error, setError] = useState("")
  const pathname = usePathname()
  const [, , tasksListSlug] = pathname.split("/")
  const form = useForm<z.infer<typeof TasksListSchema>>({
    resolver: zodResolver(TasksListSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  })
  const { mutate, isPending } = useUpdateTasksListBySlug()
  const handleSubmit = ({ name, description }: TaskListType) => {
    setError("")
    mutate(
      { tasksListSlug, name, description },
      {
        onError: (err) => {
          setError(err.message)
        }
      }
    )
  }

  useEffect(() => {
    if (!tasksList) {
      return
    }

    form.setValue("name", tasksList.name)

    if (tasksList.description) {
      form.setValue("description", tasksList.description)
    }
  }, [tasksList, form])

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Update Tasks List</h1>
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
            Update
          </Button>
        </form>
      </Form>
    </div>
  )
}
