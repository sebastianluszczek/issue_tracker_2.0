// Issues model import
const db = require('../models');
const Issue = db.issues;

exports.createIssue = async issue => {
  try {
    const response = await Issue.create(issue);
    return response.dataValues;
  } catch (error) {
    throw error;
  }
};

exports.getAllIssue = async () => {
  try {
    const response = await Issue.findAll();
    return response.map(res => res.dataValues);
  } catch (error) {
    throw error;
  }
};

exports.getOneIssue = async id => {
  try {
    const response = await Issue.findByPk(id);
    return response.dataValues;
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

exports.deleteOneIssue = async id => {
  try {
    return await Issue.destroy({ where: { id } });
  } catch (error) {
    throw error;
  }
};
