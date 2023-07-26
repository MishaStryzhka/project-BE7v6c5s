const authenticate = require('./authenticate');
const validateBody = require('./validateBody');
const uploadUserAvatar = require('./uploadUserAvatar');

module.exports = {
  validateBody,
  authenticate,
  uploadUserAvatar,
};
