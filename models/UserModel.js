import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    profilePicture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
