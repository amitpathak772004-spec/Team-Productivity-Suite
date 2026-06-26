const reportService = require('../services/reportService');

const createReport = async (req, res, next) => {
  try {
    const report = await reportService.createReport(req.body, req.user._id);
    res.status(201).json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};

const getReports = async (req, res, next) => {
  try {
    const reports = await reportService.getReports(req.query, req.user._id, req.user.role);
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReport,
  getReports,
};
