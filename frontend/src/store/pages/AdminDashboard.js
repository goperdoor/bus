import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Store, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';
import storeService from '../services/storeAPI';
import { getSubcategoriesForCategory } from '../utils/subcategories';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('store');
  const [editingStore, setEditingStore] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productSubmitting, setProductSubmitting] = useState(false);
  const [carouselSubmitting, setCarouselSubmitting] = useState(false);
  const [storeSubmitting, setStoreSubmitting] = useState(false);

  const [storeForm, setStoreForm] = useState({
    name: '',
    description: '',
    location: '',
    phone: '',
    whatsappNumber: '',
    category: 'Other',
    storeImage: null,
    socialLinks: {
      instagram: '',
      facebook: '',
      twitter: ''
    },
    operatingHours: {
      monday: { open: '09:00', close: '18:00', isOpen: true },
      tuesday: { open: '09:00', close: '18:00', isOpen: true },
      wednesday: { open: '09:00', close: '18:00', isOpen: true },
      thursday: { open: '09:00', close: '18:00', isOpen: true },
      friday: { open: '09:00', close: '18:00', isOpen: true },
      saturday: { open: '09:00', close: '18:00', isOpen: true },
      sunday: { open: '09:00', close: '18:00', isOpen: false }
    }
  });

  const [productForm, setProductForm] = useState({
    name: '',
    subcategory: '',
    features: '',
    price: '',
    isActive: true,
    productImage: null
  });

  const [carouselImages, setCarouselImages] = useState([]);
  const [carouselForm, setCarouselForm] = useState({
    caption: '',
    carouselImage: null
  });
  const [isDragActive, setIsDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('storeToken');
    if (!token) {
      navigate('/store/admin/login');
      return;
    }

    fetchStore();
  }, [navigate]);

  const fetchStore = async () => {
    try {
      setLoading(true);
      const response = await storeService.getAdminStore();
      setStore(response.data);
      setStoreForm({
        name: response.data.name || '',
        description: response.data.description || '',
        location: response.data.location || '',
        phone: response.data.phone || '',
        whatsappNumber: response.data.whatsappNumber || '',
        category: response.data.category || 'Other',
        storeImage: null,
        socialLinks: {
          instagram: response.data.socialLinks?.instagram || '',
          facebook: response.data.socialLinks?.facebook || '',
          twitter: response.data.socialLinks?.twitter || ''
        },
        operatingHours: response.data.operatingHours || {
          monday: { open: '09:00', close: '18:00', isOpen: true },
          tuesday: { open: '09:00', close: '18:00', isOpen: true },
          wednesday: { open: '09:00', close: '18:00', isOpen: true },
          thursday: { open: '09:00', close: '18:00', isOpen: true },
          friday: { open: '09:00', close: '18:00', isOpen: true },
          saturday: { open: '09:00', close: '18:00', isOpen: true },
          sunday: { open: '09:00', close: '18:00', isOpen: false }
        }
      });
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      } else if (error.response?.status === 404) {
        // Store doesn't exist yet, that's okay
        setStore({ products: [] });
      } else {
        setError('Failed to load store data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('storeToken');
    localStorage.removeItem('storeAdmin');
    navigate('/store');
  };

  const handleStoreSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (storeSubmitting) return;
    
    setStoreSubmitting(true);
    
    try {
      const response = await storeService.updateStore(storeForm);
      setStore(response.data);
      setEditingStore(false);
      setStoreForm({ ...storeForm, storeImage: null });
      alert('Store information updated successfully!');
    } catch (error) {
      alert('Failed to update store information');
    } finally {
      setStoreSubmitting(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (productSubmitting) return;
    
    setProductSubmitting(true);
    
    try {
      if (editingProduct) {
        await storeService.updateProduct(editingProduct, productForm);
      } else {
        await storeService.addProduct(productForm);
      }
      
      fetchStore();
      setEditingProduct(null);
      setShowAddProduct(false);
      setProductForm({
        name: '',
        subcategory: '',
        features: '',
        price: '',
        isActive: true,
        productImage: null
      });
      
      alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
    } catch (error) {
      alert('Failed to save product');
    } finally {
      setProductSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await storeService.deleteProduct(productId);
        fetchStore();
        alert('Product deleted successfully!');
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

  const startEditingProduct = (product) => {
    setEditingProduct(product._id);
    setProductForm({
      name: product.name,
      subcategory: product.subcategory || '',
      features: product.features.join(', '),
      price: product.price.toString(),
      isActive: product.isActive,
      productImage: null
    });
    setShowAddProduct(true);
  };

  // Carousel Management Functions
  const fetchCarouselImages = async () => {
    try {
      const response = await storeService.getCarouselImages();
      setCarouselImages(response.data);
    } catch (error) {
      console.error('Failed to fetch carousel images:', error);
    }
  };

  const handleCarouselSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (carouselSubmitting) return;
    
    setCarouselSubmitting(true);
    
    try {
      await storeService.addCarouselImage(carouselForm);
      setCarouselForm({ caption: '', carouselImage: null });
      setPreviewUrl(null);
      // Clear file input
      const fileInput = document.getElementById('carousel-file-input');
      if (fileInput) fileInput.value = '';
      fetchCarouselImages();
      alert('Carousel image added successfully!');
    } catch (error) {
      alert('Failed to add carousel image');
    } finally {
      setCarouselSubmitting(false);
    }
  };

  const handleDeleteCarouselImage = async (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await storeService.deleteCarouselImage(imageId);
        fetchCarouselImages();
        alert('Image deleted successfully!');
      } catch (error) {
        alert('Failed to delete image');
      }
    }
  };

  const handleToggleCarouselImage = async (imageId) => {
    try {
      await storeService.toggleCarouselImage(imageId);
      fetchCarouselImages();
    } catch (error) {
      alert('Failed to toggle image status');
    }
  };

  // Drag and Drop Handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect(file);
      } else {
        alert('Please drop an image file');
      }
    }
  };

  const handleFileSelect = (file) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size should be less than 5MB');
      return;
    }

    setCarouselForm({...carouselForm, carouselImage: file});
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const clearSelectedFile = () => {
    setCarouselForm({...carouselForm, carouselImage: null});
    setPreviewUrl(null);
    // Clear file input
    const fileInput = document.querySelector('.file-input');
    if (fileInput) fileInput.value = '';
  };

  useEffect(() => {
    if (activeTab === 'carousel') {
      fetchCarouselImages();
    }
  }, [activeTab]);

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-title">
          <Store size={32} />
          <h1>Store Admin Dashboard</h1>
        </div>
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'store' ? 'active' : ''}`}
          onClick={() => setActiveTab('store')}
        >
          Store Info
        </button>
        <button 
          className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact & Hours
        </button>
        <button 
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products ({store?.products?.length || 0})
        </button>
        <button 
          className={`tab-button ${activeTab === 'carousel' ? 'active' : ''}`}
          onClick={() => setActiveTab('carousel')}
        >
          Carousel ({carouselImages?.length || 0})
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'store' && (
          <div className="store-section">
            <div className="section-header">
              <h2>Store Information</h2>
              {!editingStore ? (
                <button onClick={() => setEditingStore(true)} className="edit-button">
                  <Edit size={18} />
                  Edit Store
                </button>
              ) : (
                <button onClick={() => setEditingStore(false)} className="cancel-button">
                  <X size={18} />
                  Cancel
                </button>
              )}
            </div>

            {editingStore ? (
              <form onSubmit={handleStoreSubmit} className="store-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Store Name *</label>
                    <input
                      type="text"
                      value={storeForm.name}
                      onChange={(e) => setStoreForm({...storeForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={storeForm.category}
                      onChange={(e) => setStoreForm({...storeForm, category: e.target.value})}
                      required
                    >
                      <option value="Clothes">Clothes</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Medical Store">Medical Store</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={storeForm.description}
                    onChange={(e) => setStoreForm({...storeForm, description: e.target.value})}
                    rows="3"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Location *</label>
                    <input
                      type="text"
                      value={storeForm.location}
                      onChange={(e) => setStoreForm({...storeForm, location: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={storeForm.phone}
                      onChange={(e) => setStoreForm({...storeForm, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Store Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setStoreForm({...storeForm, storeImage: e.target.files[0]})}
                  />
                </div>

                <button 
                  type="submit" 
                  className={`save-button ${storeSubmitting ? 'submitting' : ''}`}
                  disabled={storeSubmitting}
                >
                  {storeSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Store Information
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="store-display">
                {store?.imageUrl && (
                  <img src={store.imageUrl} alt={store.name} className="store-image" />
                )}
                <div className="store-details">
                  <h3>{store?.name || 'Store name not set'}</h3>
                  <p className="category-badge">{store?.category || 'No category'}</p>
                  <p>{store?.description || 'No description provided'}</p>
                  <p><strong>Location:</strong> {store?.location || 'Not set'}</p>
                  <p><strong>Phone:</strong> {store?.phone || 'Not set'}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="contact-section">
            <div className="section-header">
              <h2>Contact Information & Operating Hours</h2>
            </div>

            <form onSubmit={handleStoreSubmit} className="store-form">
              <h3>Contact Methods</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    value={storeForm.phone}
                    onChange={(e) => setStoreForm({...storeForm, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>WhatsApp Number</label>
                  <input
                    type="tel"
                    value={storeForm.whatsappNumber}
                    onChange={(e) => setStoreForm({...storeForm, whatsappNumber: e.target.value})}
                    placeholder="Same as phone if empty"
                  />
                </div>
              </div>

              <h3>Social Media Links</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Instagram URL</label>
                  <input
                    type="url"
                    value={storeForm.socialLinks.instagram}
                    onChange={(e) => setStoreForm({
                      ...storeForm, 
                      socialLinks: { ...storeForm.socialLinks, instagram: e.target.value }
                    })}
                    placeholder="https://instagram.com/your-store"
                  />
                </div>
                <div className="form-group">
                  <label>Facebook URL</label>
                  <input
                    type="url"
                    value={storeForm.socialLinks.facebook}
                    onChange={(e) => setStoreForm({
                      ...storeForm, 
                      socialLinks: { ...storeForm.socialLinks, facebook: e.target.value }
                    })}
                    placeholder="https://facebook.com/your-store"
                  />
                </div>
                <div className="form-group">
                  <label>Twitter URL</label>
                  <input
                    type="url"
                    value={storeForm.socialLinks.twitter}
                    onChange={(e) => setStoreForm({
                      ...storeForm, 
                      socialLinks: { ...storeForm.socialLinks, twitter: e.target.value }
                    })}
                    placeholder="https://twitter.com/your-store"
                  />
                </div>
              </div>

              <h3>Operating Hours</h3>
              <div className="operating-hours">
                {Object.entries(storeForm.operatingHours).map(([day, hours]) => (
                  <div key={day} className="day-hours">
                    <div className="day-name">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={hours.isOpen}
                          onChange={(e) => setStoreForm({
                            ...storeForm,
                            operatingHours: {
                              ...storeForm.operatingHours,
                              [day]: { ...hours, isOpen: e.target.checked }
                            }
                          })}
                        />
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </label>
                    </div>
                    
                    {hours.isOpen && (
                      <div className="time-inputs">
                        <input
                          type="time"
                          value={hours.open}
                          onChange={(e) => setStoreForm({
                            ...storeForm,
                            operatingHours: {
                              ...storeForm.operatingHours,
                              [day]: { ...hours, open: e.target.value }
                            }
                          })}
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={hours.close}
                          onChange={(e) => setStoreForm({
                            ...storeForm,
                            operatingHours: {
                              ...storeForm.operatingHours,
                              [day]: { ...hours, close: e.target.value }
                            }
                          })}
                        />
                      </div>
                    )}
                    
                    {!hours.isOpen && (
                      <div className="closed-indicator">
                        <span>Closed</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button 
                type="submit" 
                className={`save-button ${storeSubmitting ? 'submitting' : ''}`}
                disabled={storeSubmitting}
              >
                {storeSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Contact & Hours
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="products-section">
            <div className="section-header">
              <h2>Products Management</h2>
              <button 
                onClick={() => setShowAddProduct(true)} 
                className="add-button"
              >
                <Plus size={18} />
                Add Product
              </button>
            </div>

            {showAddProduct && (
              <div className="product-form-modal">
                <form onSubmit={handleProductSubmit} className="product-form">
                  <div className="form-header">
                    <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                    <button 
                      type="button" 
                      onClick={() => {
                        setShowAddProduct(false);
                        setEditingProduct(null);
                        setProductForm({
                          name: '',
                          subcategory: '',
                          features: '',
                          price: '',
                          isActive: true,
                          productImage: null
                        });
                      }}
                      className="close-button"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Product Name *</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={productForm.subcategory}
                        onChange={(e) => setProductForm({...productForm, subcategory: e.target.value})}
                      >
                        <option value="">Select Category</option>
                        {getSubcategoriesForCategory(store?.category || 'Other').map(subcat => (
                          <option key={subcat} value={subcat}>{subcat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Price (₹) *</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Features (comma-separated)</label>
                    <textarea
                      value={productForm.features}
                      onChange={(e) => setProductForm({...productForm, features: e.target.value})}
                      placeholder="e.g. High quality, Durable, Eco-friendly"
                      rows="2"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Product Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProductForm({...productForm, productImage: e.target.files[0]})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={productForm.isActive}
                          onChange={(e) => setProductForm({...productForm, isActive: e.target.checked})}
                        />
                        Product is active (visible to customers)
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className={`save-button ${productSubmitting ? 'submitting' : ''}`}
                    disabled={productSubmitting}
                  >
                    {productSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        {editingProduct ? 'Updating...' : 'Adding...'}
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        {editingProduct ? 'Update Product' : 'Add Product'}
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            <div className="products-grid">
              {store?.products?.length === 0 ? (
                <div className="no-products">
                  <p>No products added yet. Click "Add Product" to get started!</p>
                </div>
              ) : (
                store?.products?.map(product => (
                  <div key={product._id} className="product-card">
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.name} className="product-image" />
                    )}
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p className="product-price">₹{product.price}</p>
                      {product.features && product.features.length > 0 && (
                        <ul className="product-features">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      )}
                      <div className="product-status">
                        {product.isActive ? (
                          <span className="status-active">
                            <Eye size={16} /> Active
                          </span>
                        ) : (
                          <span className="status-inactive">
                            <EyeOff size={16} /> Inactive
                          </span>
                        )}
                      </div>
                      <div className="product-actions">
                        <button 
                          onClick={() => startEditingProduct(product)}
                          className="edit-button-small"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product._id)}
                          className="delete-button-small"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'carousel' && (
          <div className="carousel-section">
            <div className="section-header">
              <h2>Carousel Management</h2>
            </div>
            
            <div className="carousel-form-container">
              <form onSubmit={handleCarouselSubmit} className="carousel-form">
                <div className="form-group">
                  <label>Carousel Image</label>
                  <div 
                    className={`file-upload-area ${isDragActive ? 'drag-active' : ''} ${previewUrl ? 'has-file' : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      required
                      className="file-input"
                      id="carousel-file-input"
                      style={{ display: 'none' }}
                    />
                    
                    {previewUrl ? (
                      <div className="file-preview-content">
                        <div className="preview-image">
                          <img src={previewUrl} alt="Preview" />
                        </div>
                        <div className="preview-info">
                          <p>✓ Image selected</p>
                          <small>{carouselForm.carouselImage?.name}</small>
                          <button 
                            type="button" 
                            onClick={clearSelectedFile}
                            className="clear-file-btn"
                          >
                            <X size={16} />
                            Change Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="file-upload-content">
                        <Upload size={32} />
                        <p>
                          {isDragActive 
                            ? 'Drop your image here!' 
                            : 'Drag & drop an image here'
                          }
                        </p>
                        <div className="upload-options">
                          <button 
                            type="button"
                            onClick={() => document.getElementById('carousel-file-input').click()}
                            className="browse-btn"
                          >
                            <Plus size={16} />
                            Choose from Device
                          </button>
                        </div>
                        <small>PNG, JPG, JPEG up to 5MB</small>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Caption (Optional)</label>
                  <input
                    type="text"
                    value={carouselForm.caption}
                    onChange={(e) => setCarouselForm({...carouselForm, caption: e.target.value})}
                    placeholder="Enter image caption..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  className={`submit-button ${carouselSubmitting ? 'submitting' : ''}`}
                  disabled={!carouselForm.carouselImage || carouselSubmitting}
                >
                  {carouselSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      Add to Carousel
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="carousel-images-grid">
              {carouselImages.length === 0 ? (
                <div className="no-carousel-images">
                  <p>No carousel images uploaded yet.</p>
                  <p>Add images to create a beautiful carousel for your store!</p>
                </div>
              ) : (
                carouselImages.map((image, index) => (
                  <div key={image._id} className="carousel-image-card">
                    <div className="carousel-image-container">
                      <img src={image.url} alt={image.caption || `Carousel ${index + 1}`} />
                      <div className="carousel-image-overlay">
                        <button
                          onClick={() => handleToggleCarouselImage(image._id)}
                          className={`toggle-button ${image.isActive ? 'active' : 'inactive'}`}
                        >
                          {image.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                          {image.isActive ? 'Active' : 'Inactive'}
                        </button>
                        <button
                          onClick={() => handleDeleteCarouselImage(image._id)}
                          className="delete-button"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    {image.caption && (
                      <div className="carousel-image-caption">
                        <p>{image.caption}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;