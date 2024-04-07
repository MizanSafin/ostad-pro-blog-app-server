import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createPost } from "../controllers/postController.js";

let router = express.Router();

router.post("/create-post", verifyToken, createPost);

export default router;
