import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    mobile: { type: String, trim: true, default: null },
    password: { type: String, required: true, trim: true },
    photo: { type: String, default: null },
    gender: { type: String, enum: ["male", "female"] },
    status: { type: Boolean, default: true },
    trash: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
