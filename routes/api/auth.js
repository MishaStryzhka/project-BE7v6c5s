const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const { registerSchema, loginSchema } = require('../../schemas/users');

const router = express.Router();

const ctrl = require('../../controllers/auth');

router.post('/register', validateBody(registerSchema), ctrl.register);
router.post('/login', validateBody(loginSchema), ctrl.login);
router.post('/logout', authenticate, ctrl.logout);
router.get('/current', authenticate, ctrl.getCurrentUser);
// router.post('/current/update', authenticate, ctrl.updateCurrentUser);

module.exports = router;
