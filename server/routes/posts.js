import express from "express";
import {
  createPost,
  getFeedPosts,
  votePost,
  addComment,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE ISSUE */
router.post("/", verifyToken, createPost);

/* READ ALL ISSUES */
router.get("/", verifyToken, getFeedPosts);

/* VOTE (UP / DOWN) */
router.patch("/:id/vote", verifyToken, votePost);

/* ADD COMMENT */
router.post("/:id/comment", verifyToken, addComment);

export default router;
