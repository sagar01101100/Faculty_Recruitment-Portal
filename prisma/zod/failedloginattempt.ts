import * as z from "zod"
import { FailedLoginAttempt } from "../../node_modules/@prisma/client"
import { CompleteUser, RelatedUserModel } from "./index"

export const FailedLoginAttemptModel = z.object({
  id: z.number().int(),
  userId: z.string(),
  timestamp: z.date(),
})

export interface CompleteFailedLoginAttempt extends FailedLoginAttempt {
  user: CompleteUser
}

/**
 * RelatedFailedLoginAttemptModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFailedLoginAttemptModel: z.ZodSchema<CompleteFailedLoginAttempt> = z.lazy(() => FailedLoginAttemptModel.extend({
  user: RelatedUserModel,
}))
