import * as z from "zod"
import { Entry } from "../../node_modules/@prisma/client"
import { CompleteField, RelatedFieldModel, CompleteSnapshot, RelatedSnapshotModel } from "./index"

export const EntryModel = z.object({
  id: z.number().int(),
  content: z.string(),
  updatedAt: z.date(),
  snapshotId: z.string(),
  fieldId: z.number().int().nullable(),
  entryId: z.number().int().nullable(),
  isFile: z.boolean(),
  required: z.boolean(),
})

export interface CompleteEntry extends Entry {
  Entry: CompleteEntry | null
  field: CompleteField | null
  snapshot: CompleteSnapshot
  entries: CompleteEntry[]
}

/**
 * RelatedEntryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEntryModel: z.ZodSchema<CompleteEntry> = z.lazy(() => EntryModel.extend({
  Entry: RelatedEntryModel.nullable(),
  field: RelatedFieldModel.nullable(),
  snapshot: RelatedSnapshotModel,
  entries: RelatedEntryModel.array(),
}))
