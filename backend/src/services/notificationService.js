const notificationRepository = require('../repositories/notificationRepository');

const createNotification = async ({ userId, title, message, type = 'GENERAL' }) => {
  return notificationRepository.createNotification({ userId, title, message, type });
};

const getNotifications = async (userId) => {
  return notificationRepository.findNotificationsByUser(userId);
};

module.exports = {
  createNotification,
  getNotifications,
};
