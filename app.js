import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import userRouter from "./route/user.js";
import authRouter from "./route/auth.js";
import postRouter from "./route/post.js";
import commentRouter from "./route/comments.js";

//Initialize app
const app = express();

//set middlewares :
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: `http://localhost:5173`,
    credentials: true,
  })
);

// routing  :
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);

//error handler middleware :
// app.use(errorHandler);

//export app
export { app };
