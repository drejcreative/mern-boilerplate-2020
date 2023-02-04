const mongoose = require('mongoose');

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
  hofId: {
    type: String,
    required: true,
  },
  hofName: {
    type: String,
    required: true,
  },
  hofAddress: {
    type: String,
    required: true,
  },
  hofPhone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('1444forms', TakhmeenFormSchema);