const mongoose = require("mongoose");

const ReceiptsSchema = new mongoose.Schema({
  formNo: {
    type: String,
    required: true,
  },
  HOFId: {
    type: String,
    required: true,
  },
  HOFName: {
    type: String,
    required: true,
  },
  receiptNo: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("receipts", ReceiptsSchema);
