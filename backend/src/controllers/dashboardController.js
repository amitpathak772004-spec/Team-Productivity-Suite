const dashboardService = require('../services/dashboardService');

const adminDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getAdminDashboard();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const teamLeadDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getTeamLeadDashboard(req.user._id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const employeeDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getEmployeeDashboard(req.user._id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  adminDashboard,
  teamLeadDashboard,
  employeeDashboard,
};
