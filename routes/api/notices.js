const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/notices');

const { validateBody, authenticate, upload } = require('../../middlewares');
const { noticeSchema } = require('../../schemas/notices');

router.get('/category/:categoryName', ctrl.getNoticesByTitle);
router.get('/:noticeId', authenticate, ctrl.getOneNoticeById);
router.get('/favorites/favorites', authenticate, ctrl.getFavoriteNoticesByUser);
router.get('/', authenticate, ctrl.getUserNotices);

router.delete('/:noticeId', authenticate, ctrl.deleteNoticeById);

router.post(
  '/:category',
  authenticate,
  upload.single('photoUrl'),
  validateBody(noticeSchema),
  ctrl.createNoticeByCategory
);

router.post('/favorites/:noticeId', authenticate, ctrl.addFavoriteNoticeById);

router.delete(
  '/favorites/:noticeId',
  authenticate,
  ctrl.deleteFavoriteNoticeById
);

module.exports = router;
