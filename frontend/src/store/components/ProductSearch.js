import React, { useState, useEffect } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { getSubcategoriesForCategory } from '../utils/subcategories';
import '../styles/ProductSearch.css';

const ProductSearch = ({ products, storeCategory, onFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  // Get subcategories for this store type
  const subcategories = getSubcategoriesForCategory(storeCategory);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Text search in name and features
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        (product.features && product.features.some(feature => 
          feature.toLowerCase().includes(searchLower)
        ))
      );
    }

    // Subcategory filter
    if (selectedSubcategory) {
      filtered = filtered.filter(product => 
        product.subcategory === selectedSubcategory
      );
    }

    // Price range filter
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price) || 0;
      return price >= min && price <= max;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
        case 'price-high':
          return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    onFilteredProducts(filtered);
  }, [products, searchTerm, selectedSubcategory, minPrice, maxPrice, sortBy]); // Removed onFilteredProducts from deps

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSubcategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('name');
  };

  const hasActiveFilters = searchTerm || selectedSubcategory || minPrice || maxPrice || sortBy !== 'name';

  return (
    <div className="product-search">
      <div className="search-main">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search products by name or features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="clear-search-btn"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`filters-toggle ${showFilters ? 'active' : ''}`}
        >
          <SlidersHorizontal size={18} />
          Filters
          {hasActiveFilters && <span className="filter-indicator"></span>}
        </button>
      </div>

      {/* Quick Sort Buttons */}
      <div className="quick-sort-container">
        <button
          onClick={() => setSortBy('name')}
          className={`quick-sort-btn ${sortBy === 'name' ? 'active' : ''}`}
        >
          A-Z
        </button>
        <button
          onClick={() => setSortBy('price-low')}
          className={`quick-sort-btn ${sortBy === 'price-low' ? 'active' : ''}`}
        >
          Price ↑
        </button>
        <button
          onClick={() => setSortBy('price-high')}
          className={`quick-sort-btn ${sortBy === 'price-high' ? 'active' : ''}`}
        >
          Price ↓
        </button>
        <button
          onClick={() => setSortBy('newest')}
          className={`quick-sort-btn ${sortBy === 'newest' ? 'active' : ''}`}
        >
          Newest
        </button>
      </div>

      {showFilters && (
        <div className="search-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Category:</label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {subcategories.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label>Price Range:</label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="price-input"
                />
                <span className="price-separator">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="price-input"
                />
              </div>
            </div>

            {hasActiveFilters && (
              <div className="filter-group">
                <button onClick={clearFilters} className="clear-filters-btn">
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
