const Task = require('../models/Task');

const createTask = async (payload) => {
  return Task.create(payload);
};

const findTasks = async (filter, options = {}) => {
  const query = Task.find(filter)
    .populate('assignedTo', 'name email role')
    .populate('assignedBy', 'name email role')
    .sort({ createdAt: -1 });

  if (options.skip) query.skip(options.skip);
  if (options.limit) query.limit(options.limit);

  const tasks = await query;
  const total = await Task.countDocuments(filter);
  return { tasks, total };
};

const findTaskById = async (id) => {
  return Task.findById(id)
    .populate('assignedTo', 'name email role')
    .populate('assignedBy', 'name email role');
};

const updateTask = async (task) => {
  return task.save();
};

const deleteTask = async (task) => {
  return task.deleteOne();
};

module.exports = {
  createTask,
  findTasks,
  findTaskById,
  updateTask,
  deleteTask,
};
