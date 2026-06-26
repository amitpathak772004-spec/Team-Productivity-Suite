const Report = require('../models/Report');

const createReport = async (payload) => {
  return Report.create(payload);
};

const findReports = async (filter) => {
  return Report.find(filter)
    .populate('userId', 'name email role department')
    .sort({ createdAt: -1 });
};

module.exports = {
  createReport,
  findReports,
};
