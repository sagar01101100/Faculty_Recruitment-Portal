import * as z from "zod"
import { PasswordResetRequest } from "../../node_modules/@prisma/client"
import { CompleteUser, RelatedUserModel } from "./index"

export const PasswordResetRequestModel = z.object({
  id: z.string(),
  userId: z.string(),
  password: z.string(),
  salt: z.string(),
  createdAt: z.date(),
  isReset: z.boolean(),
})

export interface CompletePasswordResetRequest extends PasswordResetRequest {
  user: CompleteUser
}

/**
 * RelatedPasswordResetRequestModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPasswordResetRequestModel: z.ZodSchema<CompletePasswordResetRequest> = z.lazy(() => PasswordResetRequestModel.extend({
  user: RelatedUserModel,
}))
