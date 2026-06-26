const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Task = require('../models/Task');

const getAdminDashboard = async () => {
  const totalEmployees = await User.countDocuments({ role: 'EMPLOYEE' });
  const presentRecords = await Attendance.find({ date: new Date().toISOString().split('T')[0], status: 'PRESENT' });
  const presentEmployees = new Set(presentRecords.map((item) => item.userId.toString())).size;
  const absentEmployees = totalEmployees - presentEmployees;
  const totalTasks = await Task.countDocuments();
  const completedTasks = await Task.countDocuments({ status: 'COMPLETED' });
  const productivityOverview = totalEmployees ? (completedTasks / totalTasks) * 100 : 0;

  return {
    totalEmployees,
    presentEmployees,
    absentEmployees,
    productivityOverview: productivityOverview.toFixed(2),
    taskAnalytics: {
      totalTasks,
      completedTasks,
      pendingTasks: totalTasks - completedTasks,
    },
  };
};

const getTeamLeadDashboard = async (userId) => {
  const assignedTasks = await Task.find({ assignedBy: userId });
  const pendingTasks = assignedTasks.filter((task) => task.status !== 'COMPLETED').length;
  const completedTasks = assignedTasks.filter((task) => task.status === 'COMPLETED').length;
  const teamMembers = new Set(assignedTasks.map((task) => task.assignedTo?.toString())).size;
  return {
    assignedTasks: assignedTasks.length,
    pendingTasks,
    completedTasks,
    teamMembers,
  };
};

const getEmployeeDashboard = async (userId) => {
  const attendance = await Attendance.findOne({ userId, date: new Date().toISOString().split('T')[0] });
  const tasks = await Task.find({ assignedTo: userId });
  const completedTasks = tasks.filter((task) => task.status === 'COMPLETED').length;
  const activeTasks = tasks.filter((task) => task.status !== 'COMPLETED').length;
  const productivityScore = tasks.length ? ((completedTasks / tasks.length) * 0.7 + (attendance ? 1 * 0.3 : 0)).toFixed(2) : 0;

  return {
    todayAttendance: attendance || null,
    activeTasks,
    completedTasks,
    productivityScore,
  };
};

module.exports = {
  getAdminDashboard,
  getTeamLeadDashboard,
  getEmployeeDashboard,
};
