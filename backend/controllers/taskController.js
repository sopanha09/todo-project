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
  const { title, description, dueDate, priority } = req.body;
  if (!title || !priority) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const task = await Task.create({
    title,
    description,
    dueDate: req.body.dueDate || null,
    priority,
  });
  res.status(201).json(task);
});

// @desc Get all tasks
// @route GET /api/tasks/:id
// @access public
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  res.status(200).json(task);
});

// @desc Update task
// @route PUT /api/tasks/:id
// @access public
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTask);
});

// @desc Delete task
// @route DELETE /api/tasks/:id
// @access public
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const deleteTask = await Task.findByIdAndDelete(req.params.id);
  res.status(200).json(deleteTask);
});

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
