const {
  createIssue,
  getOnIssue,
  getAllIssue,
  deleteOnIssue,
} = require('../services/issue.services');

const { ErrorHandler } = require('../utils/error.utils');
const { issueValidator } = require('../utils/validation.utils');

// GET all issues
exports.getAll = async (req, res, next) => {
  try {
    const issues = await getAllIssue();
    res.json({ data: issues });
  } catch (error) {
    next(error);
  }
};

// GET single issue
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const issue = await getOnIssue(id);
    if (!issue) {
      throw new ErrorHandler(404, [`Issue ${id} not found`]);
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
      throw new ErrorHandler(
        400,
        error.details.map(err => err.message)
      );
    }

    const newIssue = {
      ...req.body.data,
    };

    const response = await createIssue(newIssue);
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
    const id = req.params.id;
    const issue = await getOnIssue(id);
    if (!issue) throw new ErrorHandler(404, [`User: ${id} not found`]);

    const response = await deleteOnIssue(id);
    if (response !== 1) {
      throw new ErrorHandler(400, [`Cannot delete User ${id}`]);
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
