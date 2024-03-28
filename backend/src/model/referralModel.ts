import { HydratedDocument, Schema, model } from "mongoose";

interface IReferralCode {
  code: string;
  userId: string;
  expiresAt: string;
}

const referralCodeSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  expiresAt: { type: String, required: true },
});

export const ReferralCodeModel = model<IReferralCode>(
  "referral",
  referralCodeSchema,
);

export const buildIReferralCode = (
  referralCode: IReferralCode,
): HydratedDocument<IReferralCode> => {
  return new ReferralCodeModel(referralCode);
};
