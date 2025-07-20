
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  plan: { type: String, default: 'Free' },
  credits: { type: Number, default: 3 },
});

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
