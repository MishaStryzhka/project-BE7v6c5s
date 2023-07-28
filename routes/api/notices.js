const express = require("express");

const router = express.Router();


const ctrl = require("../../controllers/notices");
// const ctrl = require("../../controllers/contacts");
const { validateBody, authenticate } = require("../../middlewares");
const { noticeSchema } = require("../../schemas/notices");

// router.get("/", authenticate, ctrl.getContacts);

// router.get("/:id", authenticate, ctrl.getContactById);

// router.post("/", authenticate, validateBody(addSchema), ctrl.addContact);

// router.delete("/:id", authenticate, ctrl.removeContact);

// router.put("/:id", authenticate, validateBody(addSchema), ctrl.updateContact);

// router.patch("/:id/favorite", authenticate, validateBody(updateFavoriteSchema), ctrl.updateStatusContact);

router.get('/:noticeId', authenticate, ctrl.getOneNoticeById);
router.get("/favorites", authenticate, ctrl.getFavoriteNoticesByUser)
router.delete("/:noticeId", authenticate, ctrl.deleteNoticeById);
router.delete(
    '/favorites/:noticeId',
    authenticate,
    ctrl.deleteFavoriteNoticeById
);


router.post(
    '/:category',
    authenticate,
    validateBody(noticeSchema),
    ctrl.createNoticeByCategory
);

router.post(
    '/favorites/:noticeId',
    authenticate,
    validateBody(noticeSchema),
    ctrl.updateNotice
);
module.exports = router;


