import PostModel from "../models/PostModel.js";

/**
 *@Desc create  post
 *@route  http://localhost:3232/api/v1/post/create-post
 *@method post
 *@access admin
 */

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
      message: error.message,
    });
  }
};

/**
 *@Desc get  post
 *@route  http://localhost:3232/api/v1/post/get-post
 *@method get
 *@access public
 */

export const getPost = async (req, res) => {
  try {
    let startIndex = parseInt(req.query.startIndex) || 0;
    let limit = parseInt(req.query.limit) || 9;
    let sortDirection = req.query.order === "asc" ? 1 : -1;
    let posts = await PostModel.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    let totalPosts = await PostModel.countDocuments();

    let now = new Date();
    let oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    let lastMonthPosts = await PostModel.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.send({
      success: true,
      totalPosts,
      lastMonthPosts,
      posts,
    });
  } catch (error) {
    res.status(500).json({});
  }
};
