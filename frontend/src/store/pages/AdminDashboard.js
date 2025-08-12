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

  const [storeForm, setStoreForm] = useState({
    name: '',
    description: '',
    location: '',
    phone: '',
    category: 'Other',
    storeImage: null
  });

  const [productForm, setProductForm] = useState({
    name: '',
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
        category: response.data.category || 'Other',
        storeImage: null
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
    try {
      const response = await storeService.updateStore(storeForm);
      setStore(response.data);
      setEditingStore(false);
      setStoreForm({ ...storeForm, storeImage: null });
      alert('Store information updated successfully!');
    } catch (error) {
      alert('Failed to update store information');
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
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
        features: '',
        price: '',
        isActive: true,
        productImage: null
      });
      
      alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
    } catch (error) {
      alert('Failed to save product');
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
    try {
      await storeService.addCarouselImage(carouselForm);
      setCarouselForm({ caption: '', carouselImage: null });
      fetchCarouselImages();
      alert('Carousel image added successfully!');
    } catch (error) {
      alert('Failed to add carousel image');
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

                <button type="submit" className="save-button">
                  <Save size={18} />
                  Save Store Information
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

                  <button type="submit" className="save-button">
                    <Save size={18} />
                    {editingProduct ? 'Update Product' : 'Add Product'}
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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCarouselForm({...carouselForm, carouselImage: e.target.files[0]})}
                    required
                  />
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
                
                <button type="submit" className="submit-button">
                  <Plus size={18} />
                  Add to Carousel
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
