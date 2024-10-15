import * as z from "zod"
import { VerificationRequest } from "../../node_modules/@prisma/client"
import { CompleteUser, RelatedUserModel } from "./index"

export const VerificationRequestModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  userId: z.string(),
  isVerified: z.boolean(),
})

export interface CompleteVerificationRequest extends VerificationRequest {
  User: CompleteUser
}

/**
 * RelatedVerificationRequestModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedVerificationRequestModel: z.ZodSchema<CompleteVerificationRequest> = z.lazy(() => VerificationRequestModel.extend({
  User: RelatedUserModel,
}))
