const Task = require('../models/Task');
const { ApiError } = require('../utils/apiError');

const createTask = async (payload, userId) => {
  const task = await Task.create({
    ...payload,
    assignedBy: userId,
  });
  return task;
};

const getTasks = async (query) => {
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.priority) filter.priority = query.priority;
  if (query.assignedTo) filter.assignedTo = query.assignedTo;
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
    ];
  }

  const page = parseInt(query.page, 10) || 1;
  const limit = Math.min(parseInt(query.limit, 10) || 20, 100);
  const skip = (page - 1) * limit;

  const tasks = await Task.find(filter)
    .populate('assignedTo', 'name email role')
    .populate('assignedBy', 'name email role')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const total = await Task.countDocuments(filter);

  return {
    tasks,
    meta: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId)
    .populate('assignedTo', 'name email role')
    .populate('assignedBy', 'name email role');
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }
  return task;
};

const updateTask = async (taskId, payload, userId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  Object.assign(task, payload);
  task.activityHistory.push({
    message: 'Task updated',
    userId,
  });

  await task.save();
  return task;
};

const deleteTask = async (taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }
  await task.deleteOne();
  return task;
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
