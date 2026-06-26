const express = require('express');
const taskController = require('../controllers/taskController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, authorizeRoles('ADMIN', 'HR', 'TEAM_LEAD', 'EMPLOYEE'), taskController.createTask);
router.get('/', authMiddleware, taskController.getTasks);
router.get('/:id', authMiddleware, taskController.getTaskById);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, authorizeRoles('ADMIN', 'HR'), taskController.deleteTask);

module.exports = router;
