const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const StoreAdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to super admin
    required: true
  }
}, {
  timestamps: true
});

// Hash password before saving
StoreAdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
StoreAdminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Use store connection if available, otherwise default connection
const connection = global.storeConnection || mongoose.connection;
module.exports = connection.model('StoreAdmin', StoreAdminSchema);
