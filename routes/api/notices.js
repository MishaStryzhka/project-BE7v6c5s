const express = require("express");

const router = express.Router();


const ctrl = require("../../controllers/notices");

const { validateBody, authenticate, upload } = require("../../middlewares");
const { noticeSchema } = require("../../schemas/notices");

router.get("/favorites", authenticate, ctrl.getFavoriteNoticesByUser)
router.get('/:noticeId', authenticate, ctrl.getOneNoticeById);
// router.get('/getById/:noticeId', authenticate, ctrl.getOneNoticeById);

router.delete("/:noticeId", authenticate, ctrl.deleteNoticeById);

router.get('/', authenticate, ctrl.getUserNotices);

router.delete(
    '/favorites/:noticeId',
    authenticate,
    ctrl.deleteFavoriteNoticeById
);


router.post(
    '/:category',
    authenticate,
    upload.single('photoUrl'),
    validateBody(noticeSchema),
    ctrl.createNoticeByCategory
);

router.post(
    '/favorites/:noticeId',
    authenticate,
    ctrl.updateNotice
);

module.exports = router;


