import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

const verifyUser = expressAsyncHandler(async (req, res, next) => {
  let token = req.cookies.accessToken;

  if (!token) {
    return res.status(404).send(`Unauthorized`);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(404).send(`Unauthorized`);
    }
    let user = await UserModel.findOne({ email: decoded._id });
    req.user = user;
    req.userId = decoded["id"];
    next();
  });
});

export default verifyUser;
