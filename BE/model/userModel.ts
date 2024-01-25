import { Document, Schema, model } from "mongoose";

interface iUser {
  name: string;
  preference: Array<{}>;
  email: string;
  password: string;
  token: string;
  verified: boolean;
  started: boolean;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    name: { type: String },
    token: { type: String },
    email: { type: String, unique: true },
    preference: [{ type: {} }],
    password: { type: String },
    started: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
