import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  createPost,
  deletePost,
  getPost,
} from "../controllers/postController.js";

let router = express.Router();

router.post("/create-post", verifyToken, createPost);
router.get("/get-post", getPost);
router.get("/delete-post/:userId/:postId", verifyToken, deletePost);

export default router;
