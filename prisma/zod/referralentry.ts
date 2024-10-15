import * as z from "zod"
import { ReferralEntry } from "../../node_modules/@prisma/client"
import { CompleteReferralField, RelatedReferralFieldModel, CompleteReferral, RelatedReferralModel } from "./index"

export const ReferralEntryModel = z.object({
  id: z.number().int(),
  content: z.string(),
  updatedAt: z.date(),
  fieldId: z.number().int(),
  referralId: z.string().nullable(),
  isFile: z.boolean(),
})

export interface CompleteReferralEntry extends ReferralEntry {
  field: CompleteReferralField
  Referral: CompleteReferral | null
}

/**
 * RelatedReferralEntryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedReferralEntryModel: z.ZodSchema<CompleteReferralEntry> = z.lazy(() => ReferralEntryModel.extend({
  field: RelatedReferralFieldModel,
  Referral: RelatedReferralModel.nullable(),
}))
