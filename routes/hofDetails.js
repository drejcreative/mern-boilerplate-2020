const express = require("express");
const router = express.Router();

const { getById } = require("../controllers/hofDetails");

router.route("/:hofid").get(getById);

module.exports = router;
