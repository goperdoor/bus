import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, ShoppingBag } from 'lucide-react';
import storeService from '../services/storeAPI';
import Carousel from '../components/Carousel';
import StoreStatus from '../components/StoreStatus';
import SocialLinks from '../components/SocialLinks';
import ContactActions from '../components/ContactActions';
import ImageModal from '../components/ImageModal';
import ProductSearch from '../components/ProductSearch';
import { getProductInquiryMessage } from '../utils/storeUtils';
import '../styles/ShopPage.css';
import InArticleAd from '../../ads/InArticleAd';

const ShopPage = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageModal, setImageModal] = useState({
    isOpen: false,
    imageUrl: '',
    imageName: ''
  });

  useEffect(() => {
    fetchStore();
  }, [storeId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchStore = async () => {
    try {
      setLoading(true);
      const response = await storeService.getStore(storeId);
      setStore(response.data);
      setFilteredProducts(response.data.products || []);
    } catch (error) {
      setError('Failed to load store. Please try again later.');
      console.error('Error fetching store:', error);
    } finally {
      setLoading(false);
    }
  };

  const openImageModal = (imageUrl, imageName) => {
    setImageModal({
      isOpen: true,
      imageUrl,
      imageName
    });
  };

  const closeImageModal = () => {
    setImageModal({
      isOpen: false,
      imageUrl: '',
      imageName: ''
    });
  };

  const handleFilteredProducts = useCallback((products) => {
    setFilteredProducts(products);
  }, []);

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
              <StoreStatus store={store} showDetails={true} />
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
              <SocialLinks socialLinks={store.socialLinks} storeName={store.name} />
            </div>
            <ContactActions store={store} />
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
            <div className="products-header-actions">
              <p className="products-count">
                Showing {filteredProducts.length} of {store.products.length} products
                {filteredProducts.length !== store.products.length && (
                  <span className="filtered-indicator"> (filtered)</span>
                )}
              </p>
              {filteredProducts.length !== store.products.length && (
                <button 
                  onClick={() => {
                    setShowAllProducts(!showAllProducts);
                    if (showAllProducts) {
                      // Reset to filtered view
                    } else {
                      // Show all products temporarily
                      setFilteredProducts(store.products);
                    }
                  }}
                  className="view-all-btn"
                >
                  {showAllProducts ? 'Show Filtered' : 'View All'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Product Search Component */}
        {store.products.length > 0 && (
          <ProductSearch 
            products={store.products}
            storeCategory={store.category}
            onFilteredProducts={handleFilteredProducts}
          />
        )}

        {store.products.length === 0 ? (
          <div className="no-products">
            <ShoppingBag size={64} />
            <h3>No products available</h3>
            <p>This store hasn't added any products yet. Check back later!</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products">
            <ShoppingBag size={64} />
            <h3>No products found</h3>
            <p>No products match your current search criteria. Try adjusting your filters!</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="product-image"
                      onClick={() => openImageModal(product.imageUrl, product.name)}
                      title="Click to view full image"
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
                  
                  <div className="product-actions">
                    <ContactActions 
                      store={store} 
                      product={product}
                      message={getProductInquiryMessage(product, store)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="order-footer">

              <InArticleAd />  
        <div className="order-info">
          <p>Found something you like? Get in touch with {store.name} directly!</p>
          <ContactActions 
            store={store}
            message={`Hi ${store.name}! I've been browsing your products and I'm interested in placing an order. Could you help me with the details?`}
          />
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={imageModal.isOpen}
        imageUrl={imageModal.imageUrl}
        imageName={imageModal.imageName}
        onClose={closeImageModal}
      />
    </div>
  );
};

export default ShopPage;
