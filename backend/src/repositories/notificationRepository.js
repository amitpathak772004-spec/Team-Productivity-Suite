const Notification = require('../models/Notification');

const createNotification = async (payload) => {
  return Notification.create(payload);
};

const findNotificationsByUser = async (userId) => {
  return Notification.find({ userId }).sort({ createdAt: -1 });
};

module.exports = {
  createNotification,
  findNotificationsByUser,
};
