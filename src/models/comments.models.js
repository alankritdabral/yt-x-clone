import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    video: {
      type: User.Schema.ObjectId,
      ref: "Video",
    },
    owner: {
      type: User.Schema.ObjectId,
      ref: "Owner",
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
