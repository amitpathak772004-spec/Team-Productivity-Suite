const Attendance = require('../models/Attendance');
const BreakLog = require('../models/BreakLog');
const { ApiError } = require('../utils/apiError');

const formatDateKey = (date) => {
  return date.toISOString().split('T')[0];
};

const calculateHours = (start, end) => {
  if (!start || !end) return 0;
  const diffMs = end.getTime() - start.getTime();
  return Math.max(0, diffMs / 1000 / 60 / 60);
};

const checkIn = async (userId) => {
  const today = formatDateKey(new Date());
  let attendance = await Attendance.findOne({ userId, date: today });
  if (attendance && attendance.checkIn) {
    throw new ApiError(400, 'Already checked in for today');
  }

  const now = new Date();
  const isLate = now.getHours() >= 9 && now.getMinutes() > 15;

  if (!attendance) {
    attendance = await Attendance.create({
      userId,
      date: today,
      checkIn: now,
      isLate,
      status: 'PRESENT',
    });
  } else {
    attendance.checkIn = now;
    attendance.isLate = isLate;
    attendance.status = 'PRESENT';
    await attendance.save();
  }

  return attendance;
};

const checkOut = async (userId) => {
  const today = formatDateKey(new Date());
  const attendance = await Attendance.findOne({ userId, date: today });
  if (!attendance || !attendance.checkIn) {
    throw new ApiError(400, 'Check-in record missing for today');
  }
  if (attendance.checkOut) {
    throw new ApiError(400, 'Already checked out for today');
  }

  const now = new Date();
  attendance.checkOut = now;
  attendance.totalHours = calculateHours(attendance.checkIn, now);
  attendance.leftEarly = now.getHours() < 17;
  await attendance.save();

  return attendance;
};

const breakIn = async (userId) => {
  const today = formatDateKey(new Date());
  const attendance = await Attendance.findOne({ userId, date: today });
  if (!attendance || !attendance.checkIn) {
    throw new ApiError(400, 'Cannot start break before check-in');
  }
  if (attendance.checkOut) {
    throw new ApiError(400, 'Cannot take break after checkout');
  }

  const breakInTime = new Date();
  const breakLog = await BreakLog.create({
    attendanceId: attendance._id,
    breakIn: breakInTime,
    breakOut: breakInTime,
    duration: 0,
  });

  return breakLog;
};

const breakOut = async (userId) => {
  const today = formatDateKey(new Date());
  const attendance = await Attendance.findOne({ userId, date: today });
  if (!attendance || !attendance.checkIn) {
    throw new ApiError(400, 'Cannot end break before check-in');
  }

  const breakLog = await BreakLog.findOne({
    attendanceId: attendance._id,
  }).sort({ createdAt: -1 });

  if (!breakLog || breakLog.breakOut > breakLog.breakIn) {
    throw new ApiError(400, 'No active break found');
  }

  const breakOutTime = new Date();
  const duration = calculateHours(breakLog.breakIn, breakOutTime);
  breakLog.breakOut = breakOutTime;
  breakLog.duration = duration;
  await breakLog.save();

  return breakLog;
};

const getMonthlyAttendance = async (userId, month, year) => {
  const from = new Date(year, month - 1, 1);
  const to = new Date(year, month, 0, 23, 59, 59);

  const records = await Attendance.find({
    userId,
    date: {
      $gte: from.toISOString().split('T')[0],
      $lte: to.toISOString().split('T')[0],
    },
  }).sort({ date: 1 });

  return records;
};

module.exports = {
  checkIn,
  checkOut,
  breakIn,
  breakOut,
  getMonthlyAttendance,
};
