const mongoose = require("mongoose");

const TakhmeenFormSchema = new mongoose.Schema({
  formNo: {
    type: String,
    trim: true,
    required: true,
  },
  markaz: {
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
  HOFAddress: {
    type: String,
    required: true,
  },
  HOFPhone: {
    type: String,
    required: true,
  },
  familyMembers: {
    type: Object,
    required: false,
  },
  takhmeenAmount: {
    type: Number,
    required: true,
  },
  zabihat: {
    type: Number,
    required: true,
  },
  iftaari: {
    type: Number,
    required: true,
  },
  niyaaz: {
    type: Number,
    required: true,
  },
  chairs: {
    type: Number,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("1444forms", TakhmeenFormSchema);
