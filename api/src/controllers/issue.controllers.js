const {
  createIssue,
  getOnIssue,
  getAllIssue,
  updateIssue,
  deleteOnIssue,
} = require('../services/issue.services');

const { ErrorHandler } = require('../utils/error.utils');
const {
  createIssueValidator,
  updateIssueValidator,
} = require('../utils/validation.utils');

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
    const { error } = createIssueValidator(req.body.data);
    if (error) {
      throw new ErrorHandler(
        400,
        error.details.map(err => err.message)
      );
    }

    const response = await createIssue({ ...req.body.data });
    res.status(201).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

// PUT issue
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const issue = await getOnIssue(id);
    if (!issue) {
      throw new ErrorHandler(404, [`Issue ${id} not found`]);
    }
    // Validate request
    const { error } = updateIssueValidator(req.body.data);
    if (error) {
      throw new ErrorHandler(
        400,
        error.details.map(err => err.message)
      );
    }

    const state = req.body.data.state;
    const originState = issue.state;

    if (originState === 'closed') {
      throw new ErrorHandler(400, [`Closed issue could not be modified`]);
    } else if (originState === 'pending') {
      if (state && state === 'open') {
        throw new ErrorHandler(400, [
          `Pending issue could not be returned to "open" state`,
        ]);
      }
    }

    const response = await updateIssue(id, req.body.data);
    res.status(200).json({
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
    if (!issue) throw new ErrorHandler(404, [`Issue ${id} not found`]);

    const response = await deleteOnIssue(id);
    if (response !== 1) {
      throw new ErrorHandler(400, [`Cannot delete Issue ${id}`]);
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
