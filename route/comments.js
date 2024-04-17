import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/create-comment", verifyToken, createComment);

export default router;
