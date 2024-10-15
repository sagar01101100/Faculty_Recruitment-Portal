import * as z from "zod"
import { Department } from "../../node_modules/@prisma/client"
import { CompleteSnapshot, RelatedSnapshotModel } from "./index"

export const DepartmentModel = z.object({
  id: z.string(),
  name: z.string(),
})

export interface CompleteDepartment extends Department {
  Snapshot: CompleteSnapshot[]
}

/**
 * RelatedDepartmentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDepartmentModel: z.ZodSchema<CompleteDepartment> = z.lazy(() => DepartmentModel.extend({
  Snapshot: RelatedSnapshotModel.array(),
}))
