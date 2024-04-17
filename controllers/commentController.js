import CommentModel from "../models/CommentModel.js";

/**
 *@Desc  user logout
 *@route http://localhost:3232/api/v1/comment/create-comment
 *@method post
 *@access public
 */

export const createComment = async (req, res) => {
  try {
    const { content, postId, userId } = req.body;
    console.log(req.user);

    if (userId !== req.user.id) {
      return res.status(500).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const comment = new CommentModel({ content, userId, postId });
    await comment.save();
    res.status(201).json({
      success: true,
      message: "Comment has been added",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
