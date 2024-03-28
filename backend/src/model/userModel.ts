import { Document, HydratedDocument, Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  referralCode: string;
  referredBy: string | null;
  points: number;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  referralCode: { type: String, unique: true },
  referredBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  points: { type: Number, default: 0 },
});

export const UserModel = model<IUser>("users", userSchema);

export const buildUser = (user: IUser): HydratedDocument<IUser> => {
  return new UserModel(user);
};
