import { Schema, model } from "mongoose";
import UserMongooseSchema from "../../schemas/userZodSchema.js";

const UserSchema = Schema(
  {
    ...UserMongooseSchema,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamp: true,
  }
);

const User = model("User", UserSchema);

export default User;
