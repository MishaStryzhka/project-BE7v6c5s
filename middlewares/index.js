const authenticate = require('./authenticate');
const validateBody = require('./validateBody');
const validateQuery = require('./validateQuery');
const validateId = require('./validateId');
const uploadCloud = require('./uploadCloud');
const upload = require('./upload');

module.exports = {
  validateBody,
  authenticate,
  validateQuery,
  validateId,
  uploadCloud,
  upload,
};
