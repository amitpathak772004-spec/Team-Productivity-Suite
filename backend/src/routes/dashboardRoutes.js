const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/admin', authMiddleware, authorizeRoles('ADMIN'), dashboardController.adminDashboard);
router.get('/teamlead', authMiddleware, authorizeRoles('TEAM_LEAD'), dashboardController.teamLeadDashboard);
router.get('/employee', authMiddleware, authorizeRoles('EMPLOYEE'), dashboardController.employeeDashboard);

module.exports = router;
