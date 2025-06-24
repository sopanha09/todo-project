const asyncHandler = require('express-async-handler');
const Column = require('../models/columnModel');

// @desc Get all columns
// @route GET /api/columns
// @access private
const getColumns = asyncHandler(async (req, res) => {
  const columns = await Column.find({ user_id: req.user.id });
  res.status(200).json(columns);
});

// @desc Get a column
// @route GET /api/columns/:id
// @access private
const getColumn = asyncHandler(async (req, res) => {
  const column = await Column.findById(req.params.id);

  if (!column) {
    res.status(404);
    throw new Error('Column not found');
  }
  res.status(200).json(column);
});

// @desc Create a column
// @route GET /api/columns
// @access private
const createColumn = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { title, color } = req.body;
  if (!title) {
    res.status(400);
    throw new Error('Please add a title for the column');
  }

  const lastColumn = await Column.findOne({ user_id: req.user.id }).sort(
    '-order'
  );
  const nextOrder = lastColumn ? lastColumn.order + 1 : 0;

  const column = await Column.create({
    title,
    color,
    order: nextOrder,
    user_id: req.user.id,
  });

  res.status(201).json(column);
});

// @desc Update a column
// @route PUT /api/columns/:id
// @access private
const updateColumn = asyncHandler(async (req, res) => {
  const column = await Column.findById(req.params.id);
  if (!column) {
    res.status(404);
    throw new Error('Column not found');
  }
  if (column.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User not authorized to update this column');
  }

  const updatedColumn = await Column.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedColumn);
});

// @desc Delete a column
// @route DELETE /api/columns/:id
// @access private
const deleteColumn = asyncHandler(async (req, res) => {
  const column = await Column.findById(req.params.id);
  if (!column) {
    res.status(404);
    throw new Error('Column not found');
  }

  if (column.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User not authorized to delete this column');
  }
  const deletedColumn = await Column.deleteOne({ _id: req.params.id });
  res.status(200).json(deletedColumn);
});

module.exports = {
  getColumns,
  getColumn,
  createColumn,
  updateColumn,
  deleteColumn,
};
