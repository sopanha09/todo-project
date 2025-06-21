const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

router.route('/').get(getTasks);

router.route('/').post(createTask);

router.route('/:id').put(getTask);

router.route('/:id').get(updateTask);

router.route('/:id').delete(deleteTask);

module.exports = router;
