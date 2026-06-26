const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    report: {
      type: String,
      trim: true,
      required: [true, 'Report content is required'],
    },
    completedTasks: {
      type: [String],
      default: [],
    },
    challenges: {
      type: String,
      trim: true,
      default: '',
    },
    nextDayPlan: {
      type: String,
      trim: true,
      default: '',
    },
    hoursWorked: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Report', reportSchema);
