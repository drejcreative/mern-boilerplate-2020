const express = require("express");
const router = express.Router();

const {
  getTakhmeenForm,
  addTakhmeenForm,
  updateTakhmeenForm,
  deleteTakhmeenForm,
  getTakhmeenFormByHOF,
} = require("../controllers/takhmeenForm");

router
  .route("/")
  .get(getTakhmeenForm)
  .post(addTakhmeenForm)
  .delete(deleteTakhmeenForm)
  .put(updateTakhmeenForm);

router.route("/:hofid").get(getTakhmeenFormByHOF);

module.exports = router;
