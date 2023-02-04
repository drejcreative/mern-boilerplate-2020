const mongoose = require('mongoose');

const TakhmeenFormSchema = new mongoose.Schema({
  formNo: {
    type: String,
    trim: true,
    required: true,
  },
  Markaz: {
    type: String,
    required: true,
  },
  HofId: {
    type: String,
    required: true,
  },
  HofName: {
    type: String,
    required: true,
  },
  HofAddress: {
    type: String,
    required: true,
  },
  HofPhone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('1444forms', TakhmeenFormSchema);