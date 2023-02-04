const mongoose = require('mongoose');

const HofDetailsSchema = new mongoose.Schema({
  
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
  }
});

module.exports = mongoose.model('hofs', HofDetailsSchema);