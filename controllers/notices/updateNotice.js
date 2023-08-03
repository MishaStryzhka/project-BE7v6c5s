const { Notice } = require('../../models');
const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const updateNotice = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { noticeId } = req.params;
  let result = null;

  const user = await User.findById(userId);
  if (!user) {
    next(HttpError(404, 'Not found'));
  }
  console.log('user.favorite', user.favorite);
  console.log('noticeId', noticeId);
  console.log(
    'user.favorite.includes(noticeId)',
    user.favorite.includes(noticeId)
  );

  if (user.favorite.includes(noticeId)) {
    result = await User.findByIdAndUpdate(
      userId,
      {
        favorite: user.favorite.filter(
          (value) => value.toString() !== noticeId
        ),
      },
      {
        new: true,
      }
    );
    console.log('result', result);

    res.sendStatus(204);
    return;
  }

  if (!user) {
    next(HttpError(404, 'Not found'));
  }
  if (user.favorite.includes(noticeId)) {
    next(
      HttpError(
        409,
        `Notice with id=${noticeId} is already in user's favorite list`
      )
    );
  }

  const notice = await Notice.findById(noticeId);

  if (!notice) {
    next(HttpError(404, 'Not found'));
  }

  result = await User.findByIdAndUpdate(
    userId,
    { $push: { favorite: noticeId } },
    { new: true }
  ).populate('favorite');

  if (!result) {
    next(HttpError(404, 'Not found'));
  }
  res.json({
    message: 'Favorite notice has been added',
    id: noticeId,
  });
};

module.exports = updateNotice;
