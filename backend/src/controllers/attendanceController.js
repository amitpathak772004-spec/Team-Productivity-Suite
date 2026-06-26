const attendanceService = require('../services/attendanceService');

const checkIn = async (req, res, next) => {
  try {
    const record = await attendanceService.checkIn(req.user._id);
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

const checkOut = async (req, res, next) => {
  try {
    const record = await attendanceService.checkOut(req.user._id);
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

const breakIn = async (req, res, next) => {
  try {
    const record = await attendanceService.breakIn(req.user._id);
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

const breakOut = async (req, res, next) => {
  try {
    const record = await attendanceService.breakOut(req.user._id);
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

const getMonthly = async (req, res, next) => {
  try {
    const month = parseInt(req.query.month, 10) || new Date().getMonth() + 1;
    const year = parseInt(req.query.year, 10) || new Date().getFullYear();
    const attendance = await attendanceService.getMonthlyAttendance(req.user._id, month, year);
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkIn,
  checkOut,
  breakIn,
  breakOut,
  getMonthly,
};
