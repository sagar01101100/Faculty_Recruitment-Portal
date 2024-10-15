import * as z from "zod"
import { TemplateEntries } from "../../node_modules/@prisma/client"
import { CompleteField, RelatedFieldModel } from "./index"

export const TemplateEntriesModel = z.object({
  id: z.number().int(),
  content: z.string(),
  updatedAt: z.date(),
  fieldId: z.number().int().nullable(),
  isFile: z.boolean(),
})

export interface CompleteTemplateEntries extends TemplateEntries {
  field: CompleteField | null
}

/**
 * RelatedTemplateEntriesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTemplateEntriesModel: z.ZodSchema<CompleteTemplateEntries> = z.lazy(() => TemplateEntriesModel.extend({
  field: RelatedFieldModel.nullable(),
}))
