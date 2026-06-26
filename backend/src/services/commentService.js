const { ApiError } = require('../utils/apiError');
const taskService = require('./taskService');
const commentRepository = require('../repositories/commentRepository');

const addComment = async (taskId, userId, commentText) => {
  const task = await taskService.getTaskById(taskId);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  const comment = await commentRepository.createComment({
    taskId,
    userId,
    comment: commentText,
  });

  task.activityHistory.push({
    message: 'Comment added',
    userId,
  });
  await task.save();

  return comment;
};

const getComments = async (taskId) => {
  return commentRepository.findCommentsByTask(taskId);
};

module.exports = {
  addComment,
  getComments,
};
