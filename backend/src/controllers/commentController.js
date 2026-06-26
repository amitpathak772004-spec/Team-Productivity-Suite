const commentService = require('../services/commentService');

const addComment = async (req, res, next) => {
  try {
    const comment = await commentService.addComment(req.params.taskId, req.user._id, req.body.comment);
    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await commentService.getComments(req.params.taskId);
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addComment,
  getComments,
};
