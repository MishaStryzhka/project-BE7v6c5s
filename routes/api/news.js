const { Router } = require("express");

const ctrl = require("../../controllers/news");

const router = Router();

router.get("/", ctrl.getNews);

module.exports = router;
