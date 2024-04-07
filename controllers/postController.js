import PostModel from "../models/PostModel.js";

export const createPost = async (req, res) => {
  console.log(req.user.isAdmin);
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "User not allowed  to create post .",
      });
    }
    if (!req.body.title || !req.body.content) {
      return res.status(500).json({
        success: false,
        message: "All fields are required .",
      });
    }
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const post = new PostModel({ ...req.body, slug, userId: req.user.id });
    await post.save();
    return res.status(201).json({
      success: true,
      message: "Post is created successfully ",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
