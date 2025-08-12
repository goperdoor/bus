import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, Star, ShoppingBag } from 'lucide-react';
import storeService from '../services/storeAPI';
import Carousel from '../components/Carousel';
import '../styles/ShopPage.css';

const ShopPage = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStore();
  }, [storeId]);

  const fetchStore = async () => {
    try {
      setLoading(true);
      const response = await storeService.getStore(storeId);
      setStore(response.data);
    } catch (error) {
      setError('Failed to load store. Please try again later.');
      console.error('Error fetching store:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCallStore = () => {
    if (store && store.phone) {
      window.open(`tel:${store.phone}`, '_self');
    }
  };

  if (loading) {
    return (
      <div className="shop-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading store...</p>
        </div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="shop-page">
        <div className="error-container">
          <p className="error-message">{error || 'Store not found'}</p>
          <button onClick={() => navigate('/store')} className="back-button">
            <ArrowLeft size={20} />
            Back to Stores
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="shop-header">
        <button onClick={() => navigate('/store')} className="back-button">
          <ArrowLeft size={20} />
          Back to Stores
        </button>
        
        <div className="store-banner">
          {store.imageUrl && (
            <div className="store-banner-image">
              <img src={store.imageUrl} alt={store.name} />
            </div>
          )}
          <div className="store-main-info">
            <div className="store-details">
              <span className="store-category">{store.category}</span>
              <h1 className="store-name">{store.name}</h1>
              <p className="store-description">{store.description}</p>
              <div className="store-contact-info">
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>{store.location}</span>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <span>{store.phone}</span>
                </div>
              </div>
            </div>
            <button onClick={handleCallStore} className="call-button">
              <Phone size={20} />
              Call to Order
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="carousel-section">
        <Carousel images={store.carouselImages || []} />
      </div>

      <div className="products-section">
        <div className="section-header">
          <h2>Our Products</h2>
          {store.products.length > 0 && (
            <p className="products-count">{store.products.length} items available</p>
          )}
        </div>

        {store.products.length === 0 ? (
          <div className="no-products">
            <ShoppingBag size={64} />
            <h3>No products available</h3>
            <p>This store hasn't added any products yet. Check back later!</p>
          </div>
        ) : (
          <div className="products-grid">
            {store.products.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="product-image"
                    />
                  ) : (
                    <div className="product-image-placeholder">
                      <ShoppingBag size={32} />
                    </div>
                  )}
                </div>
                
                <div className="product-info">
                  <div className="product-header">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-price">
                      ₹{product.price}
                    </div>
                  </div>
                  
                  {product.features && product.features.length > 0 && (
                    <div className="product-features">
                      <h4>Features:</h4>
                      <ul>
                        {product.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="order-footer">
        <div className="order-info">
          <p>Call {store.name} to place your order</p>
          <button onClick={handleCallStore} className="call-button-large">
            <Phone size={24} />
            {store.phone}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
