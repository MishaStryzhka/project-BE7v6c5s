const Joi = require("joi");

const subscriptionList = ["starter", "pro", "business"];
const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionList).required(),
});

module.exports = subscriptionSchema;