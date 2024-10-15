import * as z from "zod"
import { UploadHistory } from "../../node_modules/@prisma/client"
import { CompleteField, RelatedFieldModel, CompleteUser, RelatedUserModel } from "./index"

export const UploadHistoryModel = z.object({
  id: z.number().int(),
  userId: z.string(),
  fieldId: z.number().int(),
  uploadAt: z.date(),
})

export interface CompleteUploadHistory extends UploadHistory {
  Field: CompleteField
  user: CompleteUser
}

/**
 * RelatedUploadHistoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUploadHistoryModel: z.ZodSchema<CompleteUploadHistory> = z.lazy(() => UploadHistoryModel.extend({
  Field: RelatedFieldModel,
  user: RelatedUserModel,
}))
