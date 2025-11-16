import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Store, 
  LogIn, 
  ShoppingBag, 
  Search, 
  X, 
  SlidersHorizontal, 
  Star, 
  Filter,
  MapPin
} from 'lucide-react';
import storeService from '../services/storeAPI';
import StoreStatus from '../components/StoreStatus';
import SocialLinks from '../components/SocialLinks';
import '../styles/StoreHome.css';
import FluidCustomAd from '../../ads/FluidCustomAd';

const StoreHome = () => {
  const [categories, setCategories] = useState({});
  const [allStores, setAllStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('all'); // 'all', 'featured', 'recent'

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter and sort stores based on search criteria
  useEffect(() => {
    let filtered = [...allStores];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(store =>
        store.name.toLowerCase().includes(searchLower) ||
        store.description.toLowerCase().includes(searchLower) ||
        store.location.toLowerCase().includes(searchLower) ||
        store.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(store => store.category === selectedCategory);
    }

    // Apply view mode filter
    if (viewMode === 'featured') {
      // Mark some stores as featured (you can add a featured field to your store model)
      filtered = filtered.filter((store, index) => index % 3 === 0); // Simple logic for demo
    } else if (viewMode === 'recent') {
      // Sort by creation date and take recent ones
      filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      filtered = filtered.slice(0, 6); // Show last 6 stores
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

    setFilteredStores(filtered);
  }, [allStores, searchTerm, selectedCategory, sortBy, viewMode]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('name');
    setViewMode('all');
  };

  const hasActiveFilters = searchTerm || selectedCategory || sortBy !== 'name' || viewMode !== 'all';

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await storeService.getCategories();
      setCategories(response.data);
      
      // Flatten all stores into a single array
      const allStoresArray = [];
      Object.keys(response.data).forEach(categoryName => {
        response.data[categoryName].forEach(store => {
          allStoresArray.push({ ...store, category: categoryName });
        });
      });
      
      setAllStores(allStoresArray);
      setFilteredStores(allStoresArray);
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
          <h2 style={{
            color: '#485eff',
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '10px',
            marginTop: '20px'
          }}>Loading Goperdoor Store...</h2>
          <p style={{
            color: '#666',
            fontSize: '1rem',
            marginTop: '10px'
          }}>Fetching all stores data from database</p>
          <div style={{
            marginTop: '20px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            <div className="loading-dot" style={{
              width: '10px',
              height: '10px',
              background: '#485eff',
              borderRadius: '50%',
              animation: 'bounce 1.4s infinite ease-in-out both',
              animationDelay: '-0.32s'
            }}></div>
            <div className="loading-dot" style={{
              width: '10px',
              height: '10px',
              background: '#a955ff',
              borderRadius: '50%',
              animation: 'bounce 1.4s infinite ease-in-out both',
              animationDelay: '-0.16s'
            }}></div>
            <div className="loading-dot" style={{
              width: '10px',
              height: '10px',
              background: '#ff6b9d',
              borderRadius: '50%',
              animation: 'bounce 1.4s infinite ease-in-out both'
            }}></div>
          </div>
          <style>{`
            @keyframes bounce {
              0%, 80%, 100% { 
                transform: scale(0);
                opacity: 0.5;
              } 
              40% { 
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>
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

  const renderStoreCard = (store) => (
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
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.querySelector('.store-image-placeholder').style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className="store-image-placeholder"
          style={{ display: store.imageUrl ? 'none' : 'flex' }}
        >
          <Store size={40} />
        </div>
        {viewMode === 'featured' && (
          <div className="featured-badge">
            <Star size={16} />
            Featured
          </div>
        )}
      </div>
      <div className="store-info">
        <h3 className="store-name" style={{fontSize: '1rem'}}>{store.name}</h3>
        <p className="store-category">{store.category}</p>
        <p className="store-description">{store.description}</p>
        <StoreStatus store={store} showDetails={false} />
        <p className="store-location">
          <MapPin size={16} />
          {store.location}
        </p>
        <p className="store-phone">📞 {store.phone}</p>
        <SocialLinks socialLinks={store.socialLinks} storeName={store.name} />
      </div>
    </Link>
  );

  return (
    <div className="store-home">
      {/* Professional Header - Row 1: Title and Admin Button */}
      <div className="store-header-container">
        <div className="store-header-row-1">
          <div className="store-title-section">
            <Store size={36} className="store-icon" />
            <h1 className="store-main-title">Goperdoor Store</h1>
          </div>
          <Link to="/store/admin/login" className="admin-login-button">
            <LogIn size={20} />
            Store Admin Login
          </Link>
        </div>

        {/* Row 2: Search and Filter */}
        <div className="store-header-row-2">
          <div className="search-bar-wrapper">
            <Search className="search-icon-main" size={20} />
            <input
              type="text"
              placeholder="Search stores by name, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-main"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="clear-search-button"
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`filter-toggle-button ${showFilters ? 'active' : ''}`}
          >
            <SlidersHorizontal size={18} />
            Filters
            {hasActiveFilters && <span className="active-filter-dot"></span>}
          </button>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="advanced-filters-panel">
            <div className="filter-controls">
              <div className="filter-control-group">
                <label>Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-dropdown"
                >
                  <option value="">All Categories</option>
                  {categoryNames.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="filter-control-group">
                <label>Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-dropdown"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="newest">Newest First</option>
                  <option value="location">Location</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button onClick={clearFilters} className="clear-filters-button">
                  <X size={16} />
                  Clear All
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results Count */}
        {categoryNames.length > 0 && (
          <div className="results-info">
            <Store size={16} />
            <span>
              {filteredStores.length} of {allStores.length} stores
              {hasActiveFilters && ' (filtered)'}
            </span>
          </div>
        )}
      </div>

      {/* Stores Display */}
      {categoryNames.length === 0 ? (
        <div className="no-stores">
          <ShoppingBag size={64} />
          <h3>No stores available yet</h3>
          <p>Check back later for amazing local businesses!</p>
        </div>
      ) : filteredStores.length === 0 ? (
        <div className="no-stores">
          <ShoppingBag size={64} />
          <h3>No stores found</h3>
          <p>No stores match your current search criteria. Try adjusting your filters!</p>
        </div>
      ) : viewMode === 'all' || hasActiveFilters ? (
        /* Filtered/Search Results View */
        <div className="filtered-stores-container">
          <div className="stores-grid">
            {filteredStores.map(renderStoreCard)}
          </div>
          <FluidCustomAd />
        </div>
      ) : (
        /* Category-based View (default) */
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
                          onError={(e) => {
                            console.log('Image failed to load:', store.imageUrl);
                            e.target.style.display = 'none';
                            e.target.parentElement.querySelector('.store-image-placeholder').style.display = 'flex';
                          }}
                          onLoad={() => {
                            console.log('Image loaded successfully:', store.imageUrl);
                          }}
                        />
                      ) : null}
                      <div 
                        className="store-image-placeholder"
                        style={{ display: store.imageUrl ? 'none' : 'flex' }}
                      >
                        <Store size={40} />
                      </div>
                    </div>
                    <div className="store-info">
                      <h3 className="store-name">{store.name}</h3>
                      <p className="store-description">{store.description}</p>
                      <StoreStatus store={store} showDetails={false} />
                      <p className="store-location">📍 {store.location}</p>
                      <p className="store-phone">📞 {store.phone}</p>
                      <SocialLinks socialLinks={store.socialLinks} storeName={store.name} />
                    </div>
                  </Link>
                ))}
              </div>
              <FluidCustomAd />  
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreHome;