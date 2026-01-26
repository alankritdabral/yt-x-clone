import mongoose from "mongoose";
import { Comment } from "../models/comments.models.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { Video } from "../models/video.models.js";

export const getVideoId = async (videoObjectId) => {
  if (!videoObjectId) {
    throw new ApiError(400, "videoId is required");
  }

  if (!mongoose.isValidObjectId(videoObjectId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const videoId = new mongoose.Types.ObjectId(videoObjectId);

  return { videoId };
};

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoObjectId } = req.params;
  const { videoId } = await getVideoId(videoObjectId);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const comments = await Video.aggregate([
    {
      $match: {
        _id: videoId,
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "video",
        as: "comments",
        pipeline: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    fullname: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          { $addFields: { owner: { $first: "$owner" } } },
        ],
      },
    },
    {
      $project: {
        comments: 1,
      },
    },
  ]);

  const videoComments = comments[0]?.comments || [];

  return res
    .status(200)
    .json(new ApiResponse(200, videoComments, "Comments fetched successfully"));
});

//below is wrong change it 
const addComment = asyncHandler(async (req, res) => {
  const { videoObjectId } = req.params;
  const { videoId } = await getVideoId(videoObjectId);

  const { content } = req.body;

  if (!content?.trim()) {
    throw new ApiError(400, "Comment content is required");
  }

  const comment = await Comment.create({
    content: content.trim(),
    video: videoId,
    owner: req.user._id,
  });

  const populatedComment = await Comment.aggregate([
    { $match: { _id: comment._id } },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [{ $project: { fullname: 1, username: 1, avatar: 1 } }],
      },
    },
    { $addFields: { owner: { $first: "$owner" } } },
  ]);

  return res
    .status(201)
    .json(
      new ApiResponse(201, populatedComment[0], "Comment added successfully")
    );
});

const updateComment = asyncHandler(async (req, res) => {
  const videoObjectId = req.params.videoObjectId;
  await getVideoId(videoObjectId);

  const userId = req.user._id;
  const { content } = req.body;

  if (!content?.trim()) {
    throw new ApiError(400, "Comment content is required");
  }

  const comment = await Comment.findOneAndUpdate(
    {
      _id: req.params.commentId,
      owner: userId,
    },
    {
      content: content.trim(),
    },
    {
      new: true,
    }
  );

  if (!comment) {
    throw new ApiError(404, "Comment not found or you're not the owner");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
    const videoObjectId = req.params.videoObjectId;
    await getVideoId(videoObjectId);
  
    const userId = req.user._id;

    const comment = await Comment.findOneAndDelete({
      _id: req.params.commentId,
      owner: userId,
    });

    if (!comment) {
      throw new ApiError(404, "Comment not found or you're not the owner");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Comment deleted successfully"));

});

export { getVideoComments, addComment, updateComment, deleteComment };
