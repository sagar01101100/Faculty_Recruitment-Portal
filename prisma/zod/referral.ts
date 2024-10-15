import * as z from "zod"
import { Referral } from "../../node_modules/@prisma/client"
import { CompleteUser, RelatedUserModel, CompleteReferralEntry, RelatedReferralEntryModel } from "./index"

export const ReferralModel = z.object({
  id: z.string(),
  userId: z.string(),
  submitted: z.boolean(),
  email: z.string().nullable(),
  address: z.string().nullable(),
})

export interface CompleteReferral extends Referral {
  user: CompleteUser
  entries: CompleteReferralEntry[]
}

/**
 * RelatedReferralModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedReferralModel: z.ZodSchema<CompleteReferral> = z.lazy(() => ReferralModel.extend({
  user: RelatedUserModel,
  entries: RelatedReferralEntryModel.array(),
}))
