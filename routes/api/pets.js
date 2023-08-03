const { Router } = require('express');

const ctrl = require('../../controllers/pet/pet');

const {
  authenticate,
  validateBody,
  validateId,
  upload,
} = require('../../middlewares');

const { schemas } = require('../../models/pet');

const router = Router();

router.get('/', authenticate, validateBody(schemas.getParams), ctrl.get);

router.post(
  '/',
  authenticate,
  upload.single('photoUrl'),
  validateBody(schemas.addParams),
  ctrl.add
);

router.delete('/:petId', authenticate, validateId('petId'), ctrl.removeById);

module.exports = router;
