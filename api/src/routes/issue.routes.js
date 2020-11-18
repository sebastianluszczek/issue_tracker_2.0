const {
  create,
  getAll,
  getOne,
  deleteOne,
} = require('../controllers/issue.controllers.js');

const router = require('express').Router();

// Create a new Issue
router.post('/', create);

// Retrieve all Issues
router.get('/', getAll);

// Retrieve a single Issue with id
router.get('/:id', getOne);

// Delete single Issue with id
router.delete('/:id', deleteOne);

module.exports = router;
