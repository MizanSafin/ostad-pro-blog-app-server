import express from "express"
import verifyToken from "../middlewares/verifyToken.js"
import {
  createComment,
  deleteComment,
  getAllComments,
  getComments,
  likeComment,
  updateComment,
} from "../controllers/commentController.js"

const router = express.Router()

router.post("/create-comment", verifyToken, createComment)
router.get("/get-comments/:postId", getComments)
router.get("/like-comment/:commentId", verifyToken, likeComment)
router.post("/update-comment/:commentId", verifyToken, updateComment)
router.delete("/delete-comment/:commentId", verifyToken, deleteComment)
router.get("/get-all-comments", verifyToken, getAllComments)

export default router
