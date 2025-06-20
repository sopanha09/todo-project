const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
  res.json({ message: 'Get all tasks' });
});

router.route('/').post((req, res) => {
  res.json({ message: 'Create task' });
});

router.route('/:id').put((req, res) => {
  res.json({ message: `Update task for ${req.params.id}` });
});

router.route('/:id').get((req, res) => {
  res.json({ message: `Get task for ${req.params.id}` });
});

router.route('/:id').delete((req, res) => {
  res.json({ message: `Delete task for ${req.params.id}` });
});

module.exports = router;
