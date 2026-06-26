const Report = require('../models/Report');

const createReport = async (payload, userId) => {
  const report = await Report.create({
    ...payload,
    userId,
  });
  return report;
};

const getReports = async (query, userId, userRole) => {
  const filter = {};
  if (userRole === 'EMPLOYEE') {
    filter.userId = userId;
  }
  if (query.userId && userRole !== 'EMPLOYEE') {
    filter.userId = query.userId;
  }
  const reports = await Report.find(filter)
    .populate('userId', 'name email role department')
    .sort({ createdAt: -1 });
  return reports;
};

module.exports = {
  createReport,
  getReports,
};
