const express = require("express");
const router = express.Router();

const { getById } = require("../controllers/hofDetails");

router.route("/:itsid").get(getById);

module.exports = router;
