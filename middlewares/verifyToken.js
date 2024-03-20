import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

const verifyToken = expressAsyncHandler(async (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ message: "Unauthorized." });
  }
  let token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    expressAsyncHandler(async (error, decode) => {
      if (error) {
        return res.status(400).json({ message: "Invalid token ." });
      }
      let user = await UserModel.find({ email: decode.email });
      req.user = user;
      next();
    })
  );
});

export default verifyToken;
