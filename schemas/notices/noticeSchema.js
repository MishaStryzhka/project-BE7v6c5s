const Joi = require('joi');

const noticeCreateSchema = Joi.object({
  title: Joi.string(),
  price: Joi.number().min(1).messages({
    'number.min': 'Price must be more than 0',
  }),
  name: Joi.string().required().min(2).messages({
    'any.required': 'Set name for notice',
  }),
  // category: Joi.string().required().min(2).messages({
  //   'any.required': 'Set category for notice',
  // }),
  birthday: Joi.date().max('now').required().messages({
    'any.required': 'Set birthday for notice',
  }),
  place: Joi.string().required().messages({
    'any.required': 'Set place for notice',
  }),
  breed: Joi.string().required().messages({
    'any.required': 'Set breed for notice',
  }),
  sex: Joi.string().required().messages({
    'any.required': 'Set sex for notice',
  }),
  comments: Joi.string(),
});

const noticeSchema = {
  noticeCreateSchema,
};

module.exports = noticeSchema;
