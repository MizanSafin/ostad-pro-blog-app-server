import asyncHandler from "express-async-handler";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 *@Desc  user login
 *@route /api/v1/auth/login || http://localhost:3232/api/v1/auth/login
 *@method post
 *@access public
 */

export const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  //validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: "fail", message: "All fields are required ." });
  }

  // find user by email
  let loginUser = await UserModel.findOne({ email });

  //check login validation
  if (!loginUser) {
    return res
      .status(404)
      .json({ success: false, message: "No user found with this email" });
  }

  //checkpassword
  let checkPass = bcrypt.compareSync(password, loginUser.password);

  //check login password validation
  if (!checkPass) {
    return res
      .status(404)
      .json({ success: false, message: "Password is not match" });
  }

  //create jwt token:
  let token = jwt.sign(
    { id: loginUser._id, email: loginUser.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIREIN,
    }
  );
  const { password: pass, ...rest } = loginUser._doc;
  //set token to cookie
  res.cookie("accessToken", token, {
    httpOnly: true,
  });

  //response token to user
  return res.status(200).json({ success: true, token, user: rest });
  // return res.status(200).json(rest);
});
/**
 *@Desc  user logout
 *@route /api/v1/auth/logout
 *@method post
 *@access public
 */

export const logOut = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  //response token to user
  res.status(200).json({ success: true, message: "logout successfull ." });
});
