import { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/* ===========================
   Toggle Video Like
=========================== */
const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const videoExists = await Video.exists({ _id: videoId });
  if (!videoExists) {
    throw new ApiError(404, "Video not found");
  }

  const deleted = await Like.findOneAndDelete({
    user: userId,
    video: videoId,
  });

  if (deleted) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Video unliked successfully"));
  }

  await Like.create({ user: userId, video: videoId });

  return res.status(200).json(new ApiResponse(200, "Video liked successfully"));
});

/* ===========================
   Toggle Comment Like
=========================== */
const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid commentId");
  }

  const commentExists = await Comment.exists({ _id: commentId });
  if (!commentExists) {
    throw new ApiError(404, "Comment not found");
  }

  const deleted = await Like.findOneAndDelete({
    user: userId,
    comment: commentId,
  });

  if (deleted) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Comment unliked successfully"));
  }

  await Like.create({ user: userId, comment: commentId });

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment liked successfully"));
});

/* ===========================
   Toggle Tweet Like
=========================== */
const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweetId");
  }

  const tweetExists = await Tweet.exists({ _id: tweetId });
  if (!tweetExists) {
    throw new ApiError(404, "Tweet not found");
  }

  const deleted = await Like.findOneAndDelete({
    user: userId,
    tweet: tweetId,
  });

  if (deleted) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Tweet unliked successfully"));
  }

  await Like.create({ user: userId, tweet: tweetId });

  return res.status(200).json(new ApiResponse(200, "Tweet liked successfully"));
});

/* ===========================
   Get Liked Videos
=========================== */
const getLikedVideos = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const likedVideos = await Like.aggregate([
    {
      $match: {
        user: userId,
        video: { $ne: null },
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",
      },
    },
    { $unwind: "$video" },
    {
      $replaceRoot: { newRoot: "$video" },
    },
    { $sort: { createdAt: -1 } },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, likedVideos, "Liked videos fetched successfully")
    );
});

export { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos };
