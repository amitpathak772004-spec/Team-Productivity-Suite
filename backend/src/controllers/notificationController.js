const notificationService = require('../services/notificationService');

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getNotifications(req.user._id);
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    next(error);
  }
};

const createNotification = async (req, res, next) => {
  try {
    const payload = {
      userId: req.body.userId || req.user._id,
      title: req.body.title,
      message: req.body.message,
      type: req.body.type || 'GENERAL',
    };
    const notification = await notificationService.createNotification(payload);
    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  createNotification,
};
