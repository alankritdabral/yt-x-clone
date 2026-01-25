import mongoose, { Schema } from "mongoose";

const likesSchema = new Schema(
  {
    comment: {
      type: User.Schema.ObjectId,
      ref: "Comment",
    },
    video: {
      type: User.Schema.ObjectId,
      ref: "Video",
    },
    likedBy: {
      type: User.Schema.ObjectId,
      ref: "User",
    },
    tweet: {
      type: User.Schema.ObjectId,
      ref: "Tweet",
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likesSchema);
