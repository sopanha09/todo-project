const mongoose = require('mongoose');

const columnSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: 100,
    },
    color: {
      type: String,
      enum: [
        '#FFC300',
        '#C70039',
        '#4f46e5',
        '#2563eb',
        '#7c3aed',
        '#0d9488',
        '#059669',
        '#ea580c',
        '#e11d48',
        '#475569',
        '#6b7280',
      ],
      default: '#FF5733',
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Column', columnSchema);
