import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Store, LogIn, ShoppingBag } from 'lucide-react';
import storeService from '../services/storeAPI';
import '../styles/StoreHome.css';

const StoreHome = () => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await storeService.getCategories();
      setCategories(response.data);
    } catch (error) {
      setError('Failed to load stores. Please try again later.');
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="store-home">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading stores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="store-home">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={fetchCategories} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const categoryNames = Object.keys(categories);

  return (
    <div className="store-home">
      <div className="store-header">
        <div className="store-title">
          <Store size={32} />
          <h1>Goperdoor Store</h1>
        </div>
        <p className="store-subtitle">Discover local businesses and shop from your neighborhood</p>
        
        <div className="admin-buttons">
          <Link to="/store/admin/login" className="admin-login-btn">
            <LogIn size={20} />
            Login as Store Admin
          </Link>
        </div>
      </div>

      {categoryNames.length === 0 ? (
        <div className="no-stores">
          <ShoppingBag size={64} />
          <h3>No stores available yet</h3>
          <p>Check back later for amazing local businesses!</p>
        </div>
      ) : (
        <div className="categories-container">
          {categoryNames.map(categoryName => (
            <div key={categoryName} className="category-section">
              <h2 className="category-title">{categoryName}</h2>
              <div className="stores-grid">
                {categories[categoryName].map(store => (
                  <Link 
                    key={store._id} 
                    to={`/store/shop/${store._id}`}
                    className="store-card"
                  >
                    <div className="store-image-container">
                      {store.imageUrl ? (
                        <img 
                          src={store.imageUrl} 
                          alt={store.name}
                          className="store-image"
                        />
                      ) : (
                        <div className="store-image-placeholder">
                          <Store size={40} />
                        </div>
                      )}
                    </div>
                    <div className="store-info">
                      <h3 className="store-name">{store.name}</h3>
                      <p className="store-description">{store.description}</p>
                      <p className="store-location">📍 {store.location}</p>
                      <p className="store-phone">📞 {store.phone}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreHome;
