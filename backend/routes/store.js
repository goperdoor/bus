const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Store = require('../models/Store');
const StoreAdmin = require('../models/StoreAdmin');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { deleteImagesFromCloudinary } = require('../utils/cloudinaryUtils');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'goperdoor-store',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
  }
});

const upload = multer({ storage: storage });

// Middleware to verify store admin JWT
const verifyStoreAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.STORE_JWT_SECRET || 'store_secret_key');
    const storeAdmin = await StoreAdmin.findById(decoded.id);
    
    if (!storeAdmin || !storeAdmin.isActive) {
      return res.status(401).json({ message: 'Invalid token or admin deactivated.' });
    }

    req.storeAdmin = storeAdmin;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// Middleware to verify super admin (reuse existing admin auth)
const verifySuperAdmin = async (req, res, next) => {
  // For now, we'll use a simple check - you can integrate with your existing admin auth
  const adminPassword = req.header('Admin-Password');
  
  if (adminPassword !== 'admin123') { // Replace with your existing admin auth
    return res.status(401).json({ message: 'Super admin access required.' });
  }
  
  next();
};

// PUBLIC ROUTES

// Get all active stores grouped by category
router.get('/categories', async (req, res) => {
  try {
    const stores = await Store.find({ isActive: true }).sort({ category: 1, name: 1 });
    
    const categorizedStores = stores.reduce((acc, store) => {
      if (!acc[store.category]) {
        acc[store.category] = [];
      }
      acc[store.category].push({
        _id: store._id,
        name: store.name,
        description: store.description,
        location: store.location,
        phone: store.phone,
        imageUrl: store.imageUrl,
        category: store.category,
        operatingHours: store.operatingHours,
        socialLinks: store.socialLinks
      });
      return acc;
    }, {});

    res.json(categorizedStores);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get specific store with active products
router.get('/store/:id', async (req, res) => {
  try {
    const store = await Store.findOne({ _id: req.params.id, isActive: true });
    
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Filter only active products for public view
    const storeData = {
      _id: store._id,
      name: store.name,
      description: store.description,
      location: store.location,
      phone: store.phone,
      whatsappNumber: store.whatsappNumber,
      imageUrl: store.imageUrl,
      category: store.category,
      operatingHours: store.operatingHours,
      socialLinks: store.socialLinks,
      carouselImages: store.carouselImages ? store.carouselImages.filter(img => img.isActive) : [],
      products: store.products.filter(product => product.isActive)
    };

    res.json(storeData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// STORE ADMIN ROUTES

// Store admin login
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const storeAdmin = await StoreAdmin.findOne({ username, isActive: true });
    
    if (!storeAdmin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await storeAdmin.comparePassword(password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: storeAdmin._id },
      process.env.STORE_JWT_SECRET || 'store_secret_key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      admin: {
        id: storeAdmin._id,
        username: storeAdmin.username,
        storeId: storeAdmin.storeId
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get store admin's store
router.get('/admin/store', verifyStoreAdmin, async (req, res) => {
  try {
    const store = await Store.findOne({ adminId: req.storeAdmin._id });
    
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update store info
router.put('/admin/store', verifyStoreAdmin, upload.single('storeImage'), async (req, res) => {
  try {
    const { 
      name, 
      description, 
      location, 
      phone, 
      whatsappNumber,
      category, 
      socialLinks,
      operatingHours 
    } = req.body;
    
    const updateData = {
      name,
      description,
      location,
      phone,
      whatsappNumber: whatsappNumber || '',
      category
    };

    // Handle social links
    if (socialLinks) {
      if (typeof socialLinks === 'string') {
        updateData.socialLinks = JSON.parse(socialLinks);
      } else {
        updateData.socialLinks = socialLinks;
      }
    }

    // Handle operating hours
    if (operatingHours) {
      if (typeof operatingHours === 'string') {
        updateData.operatingHours = JSON.parse(operatingHours);
      } else {
        updateData.operatingHours = operatingHours;
      }
    }

    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const store = await Store.findOneAndUpdate(
      { adminId: req.storeAdmin._id },
      updateData,
      { new: true, upsert: true }
    );

    // Update storeId in StoreAdmin if it was just created
    if (!req.storeAdmin.storeId) {
      await StoreAdmin.findByIdAndUpdate(req.storeAdmin._id, { storeId: store._id });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add product
router.post('/admin/products', verifyStoreAdmin, upload.single('productImage'), async (req, res) => {
  try {
    const { name, subcategory, features, price, isActive } = req.body;
    
    const product = {
      name,
      subcategory: subcategory || '',
      features: Array.isArray(features) ? features : features.split(',').map(f => f.trim()),
      price: parseFloat(price),
      isActive: isActive === 'true',
      imageUrl: req.file ? req.file.path : ''
    };

    const store = await Store.findOneAndUpdate(
      { adminId: req.storeAdmin._id },
      { $push: { products: product } },
      { new: true }
    );

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.json(store.products[store.products.length - 1]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product
router.put('/admin/products/:productId', verifyStoreAdmin, upload.single('productImage'), async (req, res) => {
  try {
    const { name, features, price, isActive, subcategory } = req.body;
    
    const updateData = {
      'products.$.name': name,
      'products.$.features': Array.isArray(features) ? features : features.split(',').map(f => f.trim()),
      'products.$.price': parseFloat(price),
      'products.$.isActive': isActive === 'true',
      'products.$.subcategory': subcategory || ''
    };

    if (req.file) {
      updateData['products.$.imageUrl'] = req.file.path;
    }

    const store = await Store.findOneAndUpdate(
      { 
        adminId: req.storeAdmin._id,
        'products._id': req.params.productId
      },
      { $set: updateData },
      { new: true }
    );

    if (!store) {
      return res.status(404).json({ message: 'Store or product not found' });
    }

    const updatedProduct = store.products.find(p => p._id.toString() === req.params.productId);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete product
router.delete('/admin/products/:productId', verifyStoreAdmin, async (req, res) => {
  try {
    const store = await Store.findOneAndUpdate(
      { adminId: req.storeAdmin._id },
      { $pull: { products: { _id: req.params.productId } } },
      { new: true }
    );

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// CAROUSEL MANAGEMENT

// Add carousel image
router.post('/admin/carousel', verifyStoreAdmin, upload.single('carouselImage'), async (req, res) => {
  try {
    const { caption } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const carouselImage = {
      url: req.file.path,
      caption: caption || '',
      isActive: true
    };

    const store = await Store.findOneAndUpdate(
      { adminId: req.storeAdmin._id },
      { $push: { carouselImages: carouselImage } },
      { new: true, upsert: true }
    );

    res.json(carouselImage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get carousel images
router.get('/admin/carousel', verifyStoreAdmin, async (req, res) => {
  try {
    const store = await Store.findOne({ adminId: req.storeAdmin._id });
    if (!store) {
      return res.json([]);
    }
    res.json(store.carouselImages || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete carousel image
router.delete('/admin/carousel/:imageId', verifyStoreAdmin, async (req, res) => {
  try {
    const store = await Store.findOneAndUpdate(
      { adminId: req.storeAdmin._id },
      { $pull: { carouselImages: { _id: req.params.imageId } } },
      { new: true }
    );

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.json({ message: 'Carousel image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle carousel image status
router.put('/admin/carousel/:imageId/toggle', verifyStoreAdmin, async (req, res) => {
  try {
    const store = await Store.findOne({ adminId: req.storeAdmin._id });
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const carouselImage = store.carouselImages.id(req.params.imageId);
    if (!carouselImage) {
      return res.status(404).json({ message: 'Carousel image not found' });
    }

    carouselImage.isActive = !carouselImage.isActive;
    await store.save();

    res.json(carouselImage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// SUPER ADMIN ROUTES

// Create store admin
router.post('/super-admin/store-admins', verifySuperAdmin, async (req, res) => {
  try {
    console.log('Creating store admin with data:', req.body);
    const { username, password } = req.body;

    const existingAdmin = await StoreAdmin.findOne({ username });
    if (existingAdmin) {
      console.log('Username already exists:', username);
      return res.status(400).json({ message: 'Username already exists' });
    }

    console.log('Creating new store admin...');
    const storeAdmin = new StoreAdmin({
      username,
      password,
      createdBy: new mongoose.Types.ObjectId() // Create a dummy ObjectId for super admin
    });

    await storeAdmin.save();
    console.log('Store admin created successfully:', storeAdmin._id);

    res.json({
      id: storeAdmin._id,
      username: storeAdmin.username,
      isActive: storeAdmin.isActive
    });
  } catch (error) {
    console.error('Error creating store admin:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all stores (super admin)
router.get('/super-admin/stores', verifySuperAdmin, async (req, res) => {
  try {
    const stores = await Store.find().populate('adminId', 'username');
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle store active status
router.put('/super-admin/stores/:id/toggle', verifySuperAdmin, async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    store.isActive = !store.isActive;
    await store.save();

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE route - Delete store (Super Admin only)
router.delete('/stores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { superAdminPassword } = req.body;

    // Verify super admin password
    if (superAdminPassword !== 'admin123') {
      return res.status(401).json({ message: 'Invalid super admin credentials' });
    }

    // Find the store
    const store = await Store.findById(id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Collect all image URLs to delete from Cloudinary
    const imagesToDelete = [];
    
    // Add store main image
    if (store.imageUrl) {
      imagesToDelete.push(store.imageUrl);
    }
    
    // Add carousel images
    if (store.carouselImages && store.carouselImages.length > 0) {
      store.carouselImages.forEach(carousel => {
        if (carousel.url) {
          imagesToDelete.push(carousel.url);
        }
      });
    }
    
    // Add product images
    if (store.products && store.products.length > 0) {
      store.products.forEach(product => {
        if (product.imageUrl) {
          imagesToDelete.push(product.imageUrl);
        }
      });
    }

    console.log(`Deleting store "${store.name}" with ${imagesToDelete.length} images`);

    // Delete images from Cloudinary
    if (imagesToDelete.length > 0) {
      const deletionResults = await deleteImagesFromCloudinary(imagesToDelete);
      console.log('Cloudinary deletion results:', deletionResults);
    }

    // Delete the store admin if exists
    if (store.adminId) {
      await StoreAdmin.findByIdAndDelete(store.adminId);
      console.log('Store admin deleted');
    }

    // Delete the store
    await Store.findByIdAndDelete(id);

    res.json({ 
      message: 'Store deleted successfully',
      deletedImages: imagesToDelete.length,
      storeName: store.name
    });

  } catch (error) {
    console.error('Error deleting store:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete ALL stores (DANGER ZONE - Super Admin only)
router.delete('/super-admin/stores/all', async (req, res) => {
  try {
    const { superAdminPassword } = req.body;
    
    // Verify super admin password
    if (superAdminPassword !== process.env.SUPER_ADMIN_PASSWORD && superAdminPassword !== 'admin123') {
      return res.status(401).json({ message: 'Invalid super admin password' });
    }

    // Get all stores
    const stores = await Store.find({});
    
    if (stores.length === 0) {
      return res.json({ 
        message: 'No stores to delete',
        deletedStoresCount: 0,
        deletedImages: 0
      });
    }

    let totalDeletedImages = 0;
    const storeNames = [];

    // Delete images and count them for each store
    for (const store of stores) {
      const imagesToDelete = [];
      
      // Add store image
      if (store.imageUrl) {
        imagesToDelete.push(store.imageUrl);
      }
      
      // Add carousel images
      if (store.carouselImages && store.carouselImages.length > 0) {
        store.carouselImages.forEach(carousel => {
          if (carousel.url) {
            imagesToDelete.push(carousel.url);
          }
        });
      }
      
      // Add product images
      if (store.products && store.products.length > 0) {
        store.products.forEach(product => {
          if (product.imageUrl) {
            imagesToDelete.push(product.imageUrl);
          }
        });
      }

      console.log(`Deleting store "${store.name}" with ${imagesToDelete.length} images`);
      storeNames.push(store.name);

      // Delete images from Cloudinary
      if (imagesToDelete.length > 0) {
        const deletedCount = await deleteImagesFromCloudinary(imagesToDelete);
        totalDeletedImages += deletedCount;
      }
    }

    // Delete all store admin accounts first
    const storeAdminIds = stores.map(store => store.adminId);
    await StoreAdmin.deleteMany({ _id: { $in: storeAdminIds } });
    
    // Delete all stores
    await Store.deleteMany({});

    console.log(`Successfully deleted ${stores.length} stores and ${totalDeletedImages} images`);

    res.json({ 
      message: `Successfully deleted all stores: ${storeNames.join(', ')}`,
      deletedStoresCount: stores.length,
      deletedImages: totalDeletedImages,
      deletedStores: storeNames
    });

  } catch (error) {
    console.error('Error deleting all stores:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
