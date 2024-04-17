import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  createComment,
  getComments,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/create-comment", verifyToken, createComment);
router.get("/get-comments/:postId", getComments);

export default router;
