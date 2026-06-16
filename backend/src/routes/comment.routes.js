import { Router } from "express";
import {
  addComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "../controllers/comment.controller.js";
import { verifyJWT, verifyJWTSoft } from "../middlewares/auth.middleware.js";

const router = Router();

/* ---------- Public ---------- */
router.get("/:videoId", verifyJWTSoft, getVideoComments);

/* ---------- Protected ---------- */
router.post("/:videoId", verifyJWT, addComment);
router.delete("/c/:commentId", verifyJWT, deleteComment);
router.patch("/c/:commentId", verifyJWT, updateComment);

export default router;
