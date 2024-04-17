import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    likes: { type: Array, default: [] },
    numbersOfLikes: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

const CommentModel = mongoose.model("comments", CommentSchema);

export default CommentModel;
