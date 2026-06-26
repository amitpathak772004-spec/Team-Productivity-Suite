const { body } = require('express-validator');

const taskValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  body('status').optional().isIn(['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED']),
  body('deadline').optional().isISO8601().toDate(),
  body('assignedTo').optional().isMongoId(),
  body('subtasks').optional().isArray(),
];

module.exports = {
  taskValidation,
};
