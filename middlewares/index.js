const authenticate = require("./authenticate");
const validateBody = require("./validateBody");
const validateQuery = require("./validateQuery");
const validateId = require("./validateId");
const uploadCloud = require("./uploadCloud")

module.exports = {
    validateBody,
    authenticate,
    validateQuery,
    validateId,
    uploadCloud,
}