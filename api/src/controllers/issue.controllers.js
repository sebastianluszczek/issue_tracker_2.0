// Issues model import
const db = require('../models');
const Issue = db.issues;

const { ErrorHandler } = require('../utils/error.utils');
const { issueValidator } = require('../utils/validation.utils');

// GET all issues
exports.getAll = async (req, res, next) => {
  try {
    const issues = await Issue.findAll();
    res.json({ data: issues });
  } catch (error) {
    next(error);
  }
};

// GET single issue
exports.getOne = async (req, res, next) => {
  try {
    const issue = await Issue.findByPk(req.params.id);
    if (!issue) {
      throw new ErrorHandler(404, `Issue ${req.params.id} not found`);
    }
    res.json({ data: issue });
  } catch (error) {
    next(error);
  }
};

// POST issue
exports.create = async (req, res, next) => {
  try {
    // Validate request
    const { error } = issueValidator(req.body.data);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }

    const response = await Issue.create({
      title: req.body.data.title,
      description: req.body.data.description,
    });
    res.status(201).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE issue
exports.deleteOne = async (req, res, next) => {
  try {
    const issue = await Issue.findByPk(req.params.id);
    if (!issue) throw new ErrorHandler(404, `User: ${req.params.id} not found`);

    const response = await Issue.destroy({ where: { id: req.params.id } });
    if (response !== 1) {
      throw new ErrorHandler(400, `Cannot delete User ${req.params.id}`);
    }
    res.json({ data: issue });
  } catch (error) {
    next(error);
  }
};
