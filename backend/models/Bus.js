const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busName: {
    type: String,
    required: true,
    trim: true
  },
  busNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  arrivalTimeToPerdoor: {
    type: String,
    required: true
  },
  leavingTimeFromPerdoor: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    enum: ['daily', 'weekdays'],
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bus', busSchema);