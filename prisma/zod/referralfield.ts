import * as z from "zod"
import { ReferralField } from "../../node_modules/@prisma/client"
import { CompleteReferralEntry, RelatedReferralEntryModel } from "./index"

export const ReferralFieldModel = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string().nullable(),
  type: z.string(),
  allowFile: z.boolean(),
})

export interface CompleteReferralField extends ReferralField {
  ReferralEntry: CompleteReferralEntry[]
}

/**
 * RelatedReferralFieldModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedReferralFieldModel: z.ZodSchema<CompleteReferralField> = z.lazy(() => ReferralFieldModel.extend({
  ReferralEntry: RelatedReferralEntryModel.array(),
}))
