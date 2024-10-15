import * as z from "zod"
import { Snapshot } from "../../node_modules/@prisma/client"
import { CompleteDepartment, RelatedDepartmentModel, CompletePosition, RelatedPositionModel, CompleteUser, RelatedUserModel, CompleteEntry, RelatedEntryModel } from "./index"

export const SnapshotModel = z.object({
  id: z.string(),
  userId: z.string(),
  isComplete: z.boolean(),
  departmentId: z.string(),
  positionId: z.string(),
})

export interface CompleteSnapshot extends Snapshot {
  department: CompleteDepartment
  position: CompletePosition
  user: CompleteUser
  entries: CompleteEntry[]
}

/**
 * RelatedSnapshotModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSnapshotModel: z.ZodSchema<CompleteSnapshot> = z.lazy(() => SnapshotModel.extend({
  department: RelatedDepartmentModel,
  position: RelatedPositionModel,
  user: RelatedUserModel,
  entries: RelatedEntryModel.array(),
}))
