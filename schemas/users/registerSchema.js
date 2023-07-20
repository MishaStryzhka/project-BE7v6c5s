const Joi = require("joi");

const subscriptionList = ["starter", "pro", "business"];
const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    subscription: Joi.string().valid(...subscriptionList),
});

module.exports = registerSchema;
