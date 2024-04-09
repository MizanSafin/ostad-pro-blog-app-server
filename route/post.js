import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createPost, getPost } from "../controllers/postController.js";

let router = express.Router();

router.post("/create-post", verifyToken, createPost);
router.get("/get-post", getPost);

export default router;
