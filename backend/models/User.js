const mongoose = require('mongoose');

const pushSubscriptionSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true
  },
  keys: {
    p256dh: {
      type: String,
      required: true
    },
    auth: {
      type: String,
      required: true
    }
  }
});

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true // This will be a generated UUID for anonymous users
  },
  notificationsEnabled: {
    type: Boolean,
    default: false
  },
  pushSubscription: pushSubscriptionSchema,
  lastSeen: {
    type: Date,
    default: Date.now
  },
  preferences: {
    storeUpdates: {
      type: Boolean,
      default: true
    },
    newProducts: {
      type: Boolean,
      default: true
    },
    storeOpenings: {
      type: Boolean,
      default: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Update lastSeen on any update
userSchema.pre('save', function() {
  if (!this.isNew) {
    this.lastSeen = new Date();
  }
});

module.exports = mongoose.model('User', userSchema);
