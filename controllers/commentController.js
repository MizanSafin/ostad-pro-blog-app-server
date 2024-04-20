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
 *@Desc  get Comment
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

/**
 *@Desc  get comment
 *@route http://localhost:3232/api/v1/comment/like-comment/:commentId
 *@method put
 *@access public
 */

export const likeComment = async (req, res) => {
  try {
    let comment = await CommentModel.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found .",
      });
    }
    const userIndex = comment.likes.indexOf(req.user.id);

    if (userIndex === -1) {
      comment.numbersOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numbersOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json({
      success: true,
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
