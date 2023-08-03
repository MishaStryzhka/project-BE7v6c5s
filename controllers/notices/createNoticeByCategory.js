const { Notice } = require('../../models');
const { HttpError } = require('../../helpers');

const createNoticeByCategory = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { category } = req.params;

  const categories = ['sell', 'lost-found', 'for-free'];

  if (!categories.includes(category)) {
    return next(
      HttpError(400, 'Category has to be one of: sell, lost-found, for-free')
    );
  }

  if (!req.file) {
    return next(HttpError(400, 'Image is required'));
  }

  const notice = await Notice.create({
    ...req.body,
    owner,
    category,
  });

  if (!notice) {
    next(HttpError(404, 'Not found'));
  }
  res.status(201).json(notice);
};

module.exports = createNoticeByCategory;
