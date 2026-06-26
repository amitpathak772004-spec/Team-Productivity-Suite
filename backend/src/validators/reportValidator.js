const { body } = require('express-validator');

const reportValidation = [
  body('report').notEmpty().withMessage('Report details are required'),
  body('completedTasks').optional().isArray(),
  body('challenges').optional().isString(),
  body('nextDayPlan').optional().isString(),
  body('hoursWorked').optional().isNumeric().withMessage('Hours worked must be a number'),
];

module.exports = {
  reportValidation,
};
