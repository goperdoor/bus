const { Schema, model } = require('mongoose');

const busSchema = new Schema(
  {
    busName: {
      type: String,
      required: true,
      trim: true,
    },
    busNumber: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    arrivalTime: {
      // format HH:mm (24-hour)
      type: String,
      required: true,
      match: /^([0-1]\d|2[0-3]):([0-5]\d)$/,
    },
    departureTime: {
      type: String,
      required: true,
      match: /^([0-1]\d|2[0-3]):([0-5]\d)$/,
    },
    availability: {
      type: String,
      enum: ['daily', 'weekdays'],
      default: 'daily',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Bus', busSchema);