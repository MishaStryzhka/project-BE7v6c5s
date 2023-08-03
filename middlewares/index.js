const authenticate = require('./authenticate');
const validateBody = require('./validateBody');
const validateId = require('./validateId');
const upload = require('./upload');

module.exports = {
  validateBody,
  authenticate,
  validateId,
  upload,
};
