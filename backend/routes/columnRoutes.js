const express = require('express');
const {
  getColumns,
  getColumn,
  createColumn,
  updateColumn,
  deleteColumn,
} = require('../controllers/columnController');
const validateTokenHandler = require('../middleware/validateTokenHandler');
const router = express.Router();

router.use(validateTokenHandler);
router.route('/').get(getColumns).post(createColumn);
router.route('/:id').get(getColumn).put(updateColumn).delete(deleteColumn);

module.exports = router;
