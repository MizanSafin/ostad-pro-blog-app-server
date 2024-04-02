import asyncHandler from "express-async-handler";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { logOut } from "./authController.js";
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
  return res.status(200).json({
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
      message: "There is a user with this email or mobile number.",
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
  return res.status(201).json({
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
/*
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
*/

export const updateUser = async (req, res) => {
  if (req.userId !== req.params.userId) {
    return res.status(500).json({
      success: false,
      message: "You are not allowed to update this user",
    });
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.status(500).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  if (req.body.userName) {
    if (req.body.userName.length < 7 || req.body.userName.length > 20) {
      return res.status(500).json({
        success: false,
        message: "Username must be between 7 and 20 characters",
      });
    }
    if (req.body.userName.includes(" ")) {
      return res.status(500).json({
        success: false,
        message: "Username cannot contain spaces",
      });
    }
    if (req.body.userName !== req.body.userName.toLowerCase()) {
      return res.status(500).json({
        success: false,
        message: "Username must be lowercase",
      });
    }
    if (!req.body.userName.match(/^[a-zA-Z0-9]+$/)) {
      return res.status(500).json({
        success: false,
        message: "Username can only contain letters and numbers",
      });
    }
  }
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: rest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 *@Desc delete user
 *@route /api/v1/user/deleteUser/:id // http://localhost:3232/api/v1/user/deleteUser/:id
 *@method put/patch
 *@access public
 */

export const deleteUser = async (req, res) => {
  try {
    if (req.userId !== req.params.userId) {
      res.status(500).json({
        success: false,
        message: "You are not allowed to delete this account.",
      });
    }
    let deletedUser = await UserModel.findByIdAndDelete(req.params.userId);
    res.status(200).json({
      success: true,
      deletedUser,
      message: "User deleted successfully .!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
