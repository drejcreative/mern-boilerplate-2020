const express = require("express");
const router = express.Router();

const {
  get,
  add,
  getByHOF,
} = require("../controllers/receipts");

router
  .route("/")
  .get(get)
  .post(add)

router.route("/:hofid").get(getByHOF);

module.exports = router;
