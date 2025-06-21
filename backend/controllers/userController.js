const asyncHandler = require('express-async-handler');

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  res.status(201).json({ message: 'User registered successfully' });
});

// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User logged in successfully' });
});

// @desc Current a user
// @route GET /api/users/login
// @access public
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Current user data' });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
