// Issues model import
const db = require('../models');
const Issue = db.issues;

exports.createIssue = async issue => {
  try {
    return await Issue.create(issue);
  } catch (error) {
    throw error;
  }
};

exports.getAllIssue = async () => {
  try {
    return await Issue.findAll();
  } catch (error) {
    throw error;
  }
};

exports.getOnIssue = async id => {
  try {
    return await Issue.findByPk(id);
  } catch (error) {
    throw error;
  }
};

exports.updateIssue = async (id, issue) => {
  try {
    const response = await Issue.update(issue, {
      returning: true,
      plain: true,
      where: { id },
    });
    return response[1].dataValues;
  } catch (error) {
    throw error;
  }
};

exports.deleteOnIssue = async id => {
  try {
    return await Issue.destroy({ where: { id } });
  } catch (error) {
    throw error;
  }
};
