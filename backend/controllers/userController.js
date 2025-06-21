const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`Hashed Password: ${hashedPassword}`);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log('User created:', user);
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
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
