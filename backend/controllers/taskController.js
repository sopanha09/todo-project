const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

// @desc Get all tasks
// @route GET /api/tasks
// @access public
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

// @desc Create New tasks
// @route POST /api/tasks
// @access public
const createTask = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { title, priority, column } = req.body;
  if (!title || !priority || !column) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  res.status(201).json({ message: 'Create task' });
});

// @desc Get all tasks
// @route GET /api/tasks/:id
// @access public
const getTask = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get task for ${req.params.id}` });
});

// @desc Update task
// @route PUT /api/tasks/:id
// @access public
const updateTask = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update task for ${req.params.id}` });
});

// @desc Delete task
// @route DELETE /api/tasks/:id
// @access public
const deleteTask = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete task for ${req.params.id}` });
});

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
