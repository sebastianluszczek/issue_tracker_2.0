const {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require('../controllers/issue.controllers.js');

const router = require('express').Router();

// Create a new Issue
router.post('/', create);

// Retrieve all Issues
router.get('/', getAll);

// Retrieve a single Issue with id
router.get('/:id', getOne);

// Update a single Issue with id
router.put('/:id', updateOne);

// Delete single Issue with id
router.delete('/:id', deleteOne);

module.exports = router;
