const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const deleteFavoriteNoticeById = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { noticeId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return next(HttpError(404, 'Not found'));
  }

  const result = await User.findByIdAndUpdate(
    userId,
    { $pull: { favorite: noticeId } },
    { new: true }
  ).populate('favorite');

  if (!result) {
    return next(HttpError(404, 'Not found'));
  }
  res.json({
    message: 'Notice has been deleted from favorites',
    id: noticeId,
  });
};

module.exports = deleteFavoriteNoticeById;
