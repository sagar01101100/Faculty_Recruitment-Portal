import * as z from "zod"
import { FieldGroup } from "../../node_modules/@prisma/client"
import { CompleteField, RelatedFieldModel } from "./index"

export const FieldGroupModel = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string().nullable(),
})

export interface CompleteFieldGroup extends FieldGroup {
  fields: CompleteField[]
}

/**
 * RelatedFieldGroupModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFieldGroupModel: z.ZodSchema<CompleteFieldGroup> = z.lazy(() => FieldGroupModel.extend({
  fields: RelatedFieldModel.array(),
}))
