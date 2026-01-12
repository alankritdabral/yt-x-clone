import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
  {
    thumbnail: {
      type: String,
      required: true,
      unique: true,
    },

    owner: {
      type: Schema.Typers.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },

    duration: {
      type: Timestamp,
    },

    views: {
      type: number,
      default: 0,
    },
    
    isPublished: {
        type: Boolean,
        default: true,
    }
},
  { timestamps: true }
);

export const Video = mongoose.model("Video", videoSchema);
