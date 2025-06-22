const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: 200,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    column_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Column ID is required'],
      ref: 'Column',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
