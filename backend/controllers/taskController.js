// @desc Get all tasks
// @route GET /api/tasks
// @access public
const getTasks = (req, res) => {
  res.status(200).json({ message: 'Get all tasks' });
};

// @desc Create New tasks
// @route POST /api/tasks
// @access public
const createTask = (req, res) => {
  res.status(201).json({ message: 'Create task' });
};

// @desc Get all tasks
// @route GET /api/tasks/:id
// @access public
const getTask = (req, res) => {
  res.status(200).json({ message: `Get task for ${req.params.id}` });
};

// @desc Update task
// @route PUT /api/tasks/:id
// @access public
const updateTask = (req, res) => {
  res.status(200).json({ message: `Update task for ${req.params.id}` });
};

// @desc Delete task
// @route DELETE /api/tasks/:id
// @access public
const deleteTask = (req, res) => {
  res.status(200).json({ message: `Delete task for ${req.params.id}` });
};

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
