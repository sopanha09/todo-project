const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Column = require('../models/columnModel');

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

  if (user) {
    await Column.insertMany([
      { title: 'To Do', color: '#FFC300', order: 0, user_id: user._id },
      { title: 'In Progress', color: '#C70039', order: 1, user_id: user._id },
      { title: 'Done', color: '#4f46e5', order: 2, user_id: user._id },
    ]);
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
  // res.status(201).json({ message: 'User registered successfully' });
});

// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  const user = await User.findOne({ email });

  // compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30d' }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc Current a user
// @route GET /api/users/login
// @access private
const currentUser = asyncHandler(async (req, res) => {
  //   res.status(200).json({ message: 'Current user data' });
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
