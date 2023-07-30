const { Router } = require('express');

const ctrl = require('../../controllers/pet/pet');

const {
  authenticate,
  validateBody,
  validateQuery,
  validateId,
  upload,
} = require('../../middlewares');

const { schemas } = require('../../models/pet');

const router = Router();

router.get('/', authenticate, validateQuery(schemas.getParams), ctrl.get);

router.post(
  '/',
  authenticate,
  //uploadCloud(schemas.photoConfig),
  upload.single('photoUrl'),
  validateBody(schemas.addParams),
  ctrl.add
);

router.delete('/:petId', authenticate, validateId('petId'), ctrl.removeById);

module.exports = router;
