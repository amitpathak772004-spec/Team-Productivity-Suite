const Comment = require('../models/Comment');

const createComment = async (payload) => {
  return Comment.create(payload);
};

const findCommentsByTask = async (taskId) => {
  return Comment.find({ taskId }).populate('userId', 'name email role').sort({ createdAt: 1 });
};

module.exports = {
  createComment,
  findCommentsByTask,
};
