const Joi = require("joi");

const noticeSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().min(1).messages({
    "number.min": "Price must be more than 0",
  }),
  birthday: Joi.date().max("now").required().messages({
    "any.required": "Set birthday for notice",
  }),
  place: Joi.string().required().messages({
    "any.required": "Set place for notice",
  }),
   breed: Joi.string().required().messages({
    "any.required": "Set breed for notice",
   }),
   sex: Joi.string().required().messages({
    "any.required": "Set sex for notice",
   }),
  comments: Joi.string(),
  imageURL: Joi.string(),
  imagePublicId: Joi.string(),
});

module.exports = noticeSchema;
