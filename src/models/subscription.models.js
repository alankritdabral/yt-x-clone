import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscribers: {
      type: User.Schema.ObjectId,
      ref: "User",
    },

    channel: {
      type: User.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestapms: true }
);

export const Subscription = new mongoose.model(
  "Subscription",
  subscriptionSchema
);
