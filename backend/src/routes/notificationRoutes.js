const express = require('express');
const notificationController = require('../controllers/notificationController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, notificationController.getNotifications);
router.post('/', authMiddleware, authorizeRoles('ADMIN', 'HR', 'TEAM_LEAD'), notificationController.createNotification);

module.exports = router;
