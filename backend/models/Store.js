const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  subcategory: {
    type: String,
    default: '',
    trim: true
  },
  features: [{
    type: String,
    trim: true
  }],
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  whatsappNumber: {
    type: String,
    default: '',
    trim: true
  },
  operatingHours: {
    monday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
    tuesday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
    wednesday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
    thursday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
    friday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
    saturday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
    sunday: { open: String, close: String, isOpen: { type: Boolean, default: false } }
  },
  socialLinks: {
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' }
  },
  imageUrl: {
    type: String,
    default: ''
  },
  carouselImages: [{
    url: String,
    caption: String,
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  category: {
    type: String,
    required: true,
    enum: ['Clothes', 'Bakery', 'Medical Store', 'Grocery', 'Electronics', 'Other'],
    default: 'Other'
  },
  products: [ProductSchema],
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'StoreAdmin'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Use store connection if available, otherwise default connection
const connection = global.storeConnection || mongoose.connection;
module.exports = connection.model('Store', StoreSchema);
