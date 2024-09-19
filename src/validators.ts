import z from "zod"

export const idValidator = z.string().uuid()

export const stringValidator = z.string()

export const emailValidator = z.string().email()

export const booleanValidator = z.boolean()
