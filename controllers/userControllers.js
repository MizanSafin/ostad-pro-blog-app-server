import asyncHandler from "express-async-handler";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
/**
 *@Desc Get all users
 *@route /api/v1/user
 *@method get
 *@access public
 */

export const getAllUsers = asyncHandler(async (req, res) => {
  let users = await UserModel.find({});
  if (users.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No user is found ." });
  }
  res.status(200).json({
    success: true,
    message: "All users list ",
    count: users.length,
    users,
  });
});

/**
 *@Desc Get single user
 *@route /api/v1/user/:id
 *@method get
 *@access public
 */

export const getSingleUser = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let user = await UserModel.findById(id);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "No user is found ." });
  }
  res.status(200).json({
    success: true,
    user,
  });
});

/**
 *@Desc create  user
 *@route /api/v1/user
 *@method post
 *@access public
 */

export const createUser = asyncHandler(async (req, res) => {
  let { userName, email, password } = req.body;

  //Validation
  if (!userName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All user feilds are required ." });
  }

  //check email & mobile
  let alreadyUser = await UserModel.findOne({ email });

  if (alreadyUser) {
    return res.status(400).json({
      success: false,
      message: "There is a user with thiss email or mobile number.",
    });
  }

  //hash password
  let hashedPassword = bcrypt.hashSync(password, 10);

  //Create user
  let user = await UserModel.create({
    userName,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    success: true,
    message: " user has  created successfully ",
    user,
  });
});

/**
 *@Desc delete single user
 *@route /api/v1/user/:id
 *@method delte
 *@access public
 */

export const deleteSingleUser = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let user = await UserModel.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "User is deleted successfully.",
    user,
  });
});

/**
 *@Desc update user
 *@route /api/v1/user/:id
 *@method put/patch
 *@access public
 */

export const updateUser = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let { name, email, password, gender, mobile } = req.body;

  if (!name || !email || !password || !gender || !mobile) {
    return res
      .status(400)
      .json({ success: false, message: "All user feilds are required ." });
  }

  let hashedPassword = bcrypt.hashSync(password, 10);

  let user = await UserModel.findByIdAndUpdate(
    id,
    { name, email, password: hashedPassword, gender, mobile },
    { new: true }
  );
  res.status(201).json({
    success: true,
    message: " user has  updated successfully ",
    user,
  });
});
