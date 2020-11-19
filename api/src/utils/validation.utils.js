const Joi = require('joi');

const createIssueValidator = data => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(1000).required(),
    state: Joi.string().valid('open', 'pending', 'closed'),
  });

  return schema.validate(data, { abortEarly: false });
};

const updateIssueValidator = data => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50),
    description: Joi.string().min(2).max(1000),
    state: Joi.string().valid('open', 'pending', 'closed'),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = {
  createIssueValidator,
  updateIssueValidator,
};
