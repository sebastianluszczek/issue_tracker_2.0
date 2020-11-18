const Joi = require('joi');

const issueValidator = data => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(200).required(),
    state: Joi.string().valid('open', 'pending', 'closed'),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = {
  issueValidator,
};
