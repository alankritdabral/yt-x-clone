import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const userId = req.user._id;

  const existingLike = await Like.findOne({
    user: userId,
    video: videoId,
  });

  if (existingLike) {
    // If like exists, remove it (unlike)
    await existingLike.remove();
    return res
      .status(200)
      .json(new ApiResponse(200, "Video unliked successfully"));
  } else {
    // If like does not exist, create it (like)
    await Like.create({
      user: userId,
      video: videoId,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "Video liked successfully"));
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid commentId");
  }

  const userId = req.user._id;

  const existingLike = await Like.findOne({
    user: userId,
    comment: commentId,
  });

  if (existingLike) {
    // If like exists, remove it (unlike)
    await existingLike.remove();
    return res
      .status(200)
      .json(new ApiResponse(200, "Comment unliked successfully"));
  } else {
    // If like does not exist, create it (like)
    await Like.create({
      user: userId,
      comment: commentId,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "Comment liked successfully"));
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweetId");
  }

  const userId = req.user._id;

  const existingLike = await Like.findOne({
    user: userId,
    tweet: tweetId,
  });

  if (existingLike) {
    await existingLike.remove();
    return res
      .status(200)
      .json(new ApiResponse(200, "Tweet unliked successfully"));
  } else {
    await Like.create({
      user: userId,
      tweet: tweetId,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "Tweet liked successfully"));
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {

    const userId = req.user._id;
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId");
    }   

    const likedVideos = await Like.find({ user: userId, video: { $ne: null } }).populate('video');

    const videos = likedVideos.map(like => like.video);

    return res.status(200).json(new ApiResponse(200, "Liked videos fetched successfully", videos));
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
