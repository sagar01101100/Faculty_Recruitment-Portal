import * as z from "zod"
import { Admin } from "../../node_modules/@prisma/client"

export const AdminModel = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  salt: z.string(),
})
