import mongoose from "mongoose";
import { Comment } from "../models/comments.models.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/Asynchandler.js";
import { Video } from "../models/video.models.js";

/* ===========================
   Utils
=========================== */

const getValidVideoId = async (videoObjectId) => {
  if (!videoObjectId) {
    throw new ApiError(400, "videoId is required");
  }

  if (!mongoose.isValidObjectId(videoObjectId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const videoId = new mongoose.Types.ObjectId(videoObjectId);

  const videoExists = await Video.exists({ _id: videoId });
  if (!videoExists) {
    throw new ApiError(404, "Video not found");
  }

  return videoId;
};

/* ===========================
   Get Video Comments
=========================== */

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoObjectId } = req.params;
  const videoId = await getValidVideoId(videoObjectId);

  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const skip = (page - 1) * limit;

  const result = await Comment.aggregate([
    {
      $match: {
        video: videoId,
      },
    },
    {
      $facet: {
        comments: [
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
        totalCount: [{ $count: "count" }],
      },
    },
  ]);

  const comments = result[0]?.comments || [];
  const total = result[0]?.totalCount[0]?.count || 0;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        comments,
        total,
        page,
        limit,
      },
      "Comments fetched successfully"
    )
  );
});

/* ===========================
   Add Comment
=========================== */

const addComment = asyncHandler(async (req, res) => {
  const { videoObjectId } = req.params;
  const videoId = await getValidVideoId(videoObjectId);

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
  ]);

  return res
    .status(201)
    .json(
      new ApiResponse(201, populatedComment[0], "Comment added successfully")
    );
});

/* ===========================
   Update Comment
=========================== */

const updateComment = asyncHandler(async (req, res) => {
  const { videoObjectId, commentId } = req.params;
  const videoId = await getValidVideoId(videoObjectId);

  const { content } = req.body;

  if (!content?.trim()) {
    throw new ApiError(400, "Comment content is required");
  }

  const updatedComment = await Comment.findOneAndUpdate(
    {
      _id: commentId,
      owner: req.user._id,
      video: videoId,
    },
    {
      content: content.trim(),
    },
    {
      new: true,
    }
  );

  if (!updatedComment) {
    throw new ApiError(404, "Comment not found or you're not the owner");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
});

/* ===========================
   Delete Comment
=========================== */

const deleteComment = asyncHandler(async (req, res) => {
  const { videoObjectId, commentId } = req.params;
  const videoId = await getValidVideoId(videoObjectId);

  const deletedComment = await Comment.findOneAndDelete({
    _id: commentId,
    owner: req.user._id,
    video: videoId,
  });

  if (!deletedComment) {
    throw new ApiError(404, "Comment not found or you're not the owner");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
