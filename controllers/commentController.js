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

/**
 *@Desc  user logout
 *@route http://localhost:3232/api/v1/comment/get-comments/:postId
 *@method get
 *@access public
 */

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    let comments = await CommentModel.find({ postId }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Successfully get post comments",
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
