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
      enum: ['#FF5733', '#33C1FF', '#75FF33', '#FFC300', '#C70039'],
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
