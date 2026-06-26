const express = require('express');
const reportController = require('../controllers/reportController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, reportController.createReport);
router.get('/', authMiddleware, reportController.getReports);

module.exports = router;
