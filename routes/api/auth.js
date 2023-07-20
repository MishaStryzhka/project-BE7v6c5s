const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { registerSchema, loginSchema, subscriptionSchema } = require("../../schemas/users");

const router = express.Router();

const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(registerSchema), ctrl.register);
router.post("/login", validateBody(loginSchema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.getCurrentUser);
router.patch("/", authenticate, validateBody(subscriptionSchema), ctrl.updateSubscription);

module.exports = router;
