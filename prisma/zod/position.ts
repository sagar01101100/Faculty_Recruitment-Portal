import * as z from "zod"
import { Position } from "../../node_modules/@prisma/client"
import { CompleteSnapshot, RelatedSnapshotModel } from "./index"

export const PositionModel = z.object({
  id: z.string(),
  name: z.string(),
})

export interface CompletePosition extends Position {
  Snapshot: CompleteSnapshot[]
}

/**
 * RelatedPositionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPositionModel: z.ZodSchema<CompletePosition> = z.lazy(() => PositionModel.extend({
  Snapshot: RelatedSnapshotModel.array(),
}))
