import * as z from "zod"
import { User } from "../../node_modules/@prisma/client"
import { CompletePasswordResetRequest, RelatedPasswordResetRequestModel, CompleteReferral, RelatedReferralModel, CompleteSnapshot, RelatedSnapshotModel, CompleteUploadHistory, RelatedUploadHistoryModel, CompleteVerificationRequest, RelatedVerificationRequestModel, CompleteFailedLoginAttempt, RelatedFailedLoginAttemptModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  salt: z.string(),
  verified: z.boolean(),
})

export interface CompleteUser extends User {
  PasswordResetRequest: CompletePasswordResetRequest[]
  Referral: CompleteReferral[]
  snapshot: CompleteSnapshot[]
  UploadHistory: CompleteUploadHistory[]
  VerificationRequest: CompleteVerificationRequest[]
  failedLoginAttempts: CompleteFailedLoginAttempt[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  PasswordResetRequest: RelatedPasswordResetRequestModel.array(),
  Referral: RelatedReferralModel.array(),
  snapshot: RelatedSnapshotModel.array(),
  UploadHistory: RelatedUploadHistoryModel.array(),
  VerificationRequest: RelatedVerificationRequestModel.array(),
  failedLoginAttempts: RelatedFailedLoginAttemptModel.array(),
}))
