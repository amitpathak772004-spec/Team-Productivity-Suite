const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/checkin', authMiddleware, attendanceController.checkIn);
router.post('/checkout', authMiddleware, attendanceController.checkOut);
router.post('/breakin', authMiddleware, attendanceController.breakIn);
router.post('/breakout', authMiddleware, attendanceController.breakOut);
router.get('/monthly', authMiddleware, attendanceController.getMonthly);

module.exports = router;
