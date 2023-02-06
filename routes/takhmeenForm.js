const express = require("express");
const router = express.Router();

const {
  get,
  add,
  update,
  remove,
  getByHOF,
  getByFormNo
} = require("../controllers/takhmeenForm");

router
  .route("/")
  .get(get)
  .post(add)
  .put(update)
  .delete(remove);

router.route("/:hofid").get(getByHOF);
router.route("/form/:formno").get(getByFormNo);

module.exports = router;
