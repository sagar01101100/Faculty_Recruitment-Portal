import * as z from "zod"
import { Field } from "../../node_modules/@prisma/client"
import { CompleteFieldGroup, RelatedFieldGroupModel, CompleteEntry, RelatedEntryModel, CompleteTemplateEntries, RelatedTemplateEntriesModel, CompleteUploadHistory, RelatedUploadHistoryModel } from "./index"

export const FieldModel = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string().nullable(),
  type: z.string(),
  choices: z.string().array(),
  fieldId: z.number().int().nullable(),
  fieldGroupId: z.number().int().nullable(),
  allowFile: z.boolean(),
  templateFieldName: z.string().nullable(),
  isRequired: z.boolean(),
  maxLength: z.number().int().nullable(),
  placeholder: z.string().nullable(),
})

export interface CompleteField extends Field {
  FieldGroup: CompleteFieldGroup | null
  Field: CompleteField | null
  Entry: CompleteEntry[]
  fields: CompleteField[]
  TemplateEntries: CompleteTemplateEntries[]
  UploadHistory: CompleteUploadHistory[]
}

/**
 * RelatedFieldModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFieldModel: z.ZodSchema<CompleteField> = z.lazy(() => FieldModel.extend({
  FieldGroup: RelatedFieldGroupModel.nullable(),
  Field: RelatedFieldModel.nullable(),
  Entry: RelatedEntryModel.array(),
  fields: RelatedFieldModel.array(),
  TemplateEntries: RelatedTemplateEntriesModel.array(),
  UploadHistory: RelatedUploadHistoryModel.array(),
}))
