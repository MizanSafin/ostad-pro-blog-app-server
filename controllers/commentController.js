import CommentModel from "../models/CommentModel.js"

/**
 *@Desc  user logout
 *@route http://localhost:3232/api/v1/comment/create-comment
 *@method post
 *@access public
 */

export const createComment = async (req, res) => {
  try {
    const { content, postId, userId } = req.body

    if (userId !== req.user.id) {
      return res.status(500).json({
        success: false,
        message: "Unauthorized",
      })
    }

    const comment = new CommentModel({ content, userId, postId })
    await comment.save()
    res.status(201).json({
      success: true,
      message: "Comment has been added",
      comment,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

/**
 *@Desc  get Comment
 *@route http://localhost:3232/api/v1/comment/get-comments/:postId
 *@method get
 *@access public
 */

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params
    let comments = await CommentModel.find({ postId }).sort({ createdAt: -1 })
    return res.status(200).json({
      success: true,
      message: "Successfully get post comments",
      comments,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

/**
 *@Desc  like comment
 *@route http://localhost:3232/api/v1/comment/like-comment/:commentId
 *@method get
 *@access public
 */

export const likeComment = async (req, res) => {
  try {
    let comment = await CommentModel.findById(req.params.commentId)
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found .",
      })
    }
    const userIndex = comment.likes.indexOf(req.user.id)

    if (userIndex === -1) {
      comment.numbersOfLikes += 1
      comment.likes.push(req.user.id)
    } else {
      comment.numbersOfLikes -= 1
      comment.likes.splice(userIndex, 1)
    }
    await comment.save()
    res.status(200).json({
      success: true,
      comment,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

/**
 *@Desc  update comment
 *@route http://localhost:3232/api/v1/comment/update-comment/:commentId
 *@method post
 *@access admin
 */

export const updateComment = async (req, res) => {
  try {
    let comment = await CommentModel.findById(req.params.commentId)

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "comment not found .",
      })
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(404).json({
        success: false,
        message: "Not allowed to comment .",
      })
    }
    const update = { $set: { content: req.body.content } }
    console.log(update)
    const updatedComment = await CommentModel.findByIdAndUpdate(
      req.params.commentId,
      update,
      { new: true }
    )
    // console.log(updatedComment)
    res.status(200).json({
      success: true,
      updatedComment,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

/**
 *@Desc  delete comment
 *@route http://localhost:3232/api/v1/comment/delete-comment/:commentId
 *@method delete
 *@access admin
 */

export const deleteComment = async (req, res) => {
  try {
    let comment = await CommentModel.findById(req.params.commentId)
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(500).json({
        success: false,
        message: "Not allowed to delete .",
      })
    }

    await CommentModel.findByIdAndDelete(req.params.commentId)
    res.status(200).json({
      success: true,
      message: "Comment deleted uccessfully.",
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

/**
 *@Desc  get all Comments
 *@route http://localhost:3232/api/v1/comment/get-all-comments
 *@method get
 *@access admin
 */

export const getAllComments = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(500).json({ success: false, message: "Unauthorized ." })
  }
  try {
    let startIndex = parseInt(req.query.startIndex || 0)
    let limit = parseInt(req.query.limit || 3)
    let sortDirection = req.query.sort === "asc" ? 1 : -1

    let comments = await CommentModel.find()
      .sort({
        createdAt: sortDirection,
      })
      .skip(startIndex)
      .limit(limit)

    let totalComments = await CommentModel.countDocuments()

    let now = new Date()

    let oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    )

    let lastMonthComments = await CommentModel.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    })

    res.status(200).json({
      success: true,
      comments,
      totalComments,
      lastMonthComments,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}
