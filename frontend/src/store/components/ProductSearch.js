import React, { useState, useEffect } from 'react';
import { Search, X, SlidersHorizontal, TrendingUp, Hash } from 'lucide-react';
import { getSubcategoriesForCategory } from '../utils/subcategories';
import '../styles/ProductSearch.css';

const ProductSearch = ({ products, storeCategory, onFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCount, setFilteredCount] = useState(0);

  // Get subcategories for this store type
  const subcategories = getSubcategoriesForCategory(storeCategory);

  // Generate search suggestions based on product names and features
  useEffect(() => {
    if (searchTerm.length > 0) {
      const suggestions = new Set();
      products.forEach(product => {
        // Add product names that match
        if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          suggestions.add(product.name);
        }
        // Add matching features
        if (product.features) {
          product.features.forEach(feature => {
            if (feature.toLowerCase().includes(searchTerm.toLowerCase())) {
              suggestions.add(feature);
            }
          });
        }
      });
      setSearchSuggestions(Array.from(suggestions).slice(0, 5)); // Limit to 5 suggestions
      setShowSuggestions(suggestions.size > 0 && searchTerm.length > 1);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, products]);

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

    setFilteredCount(filtered.length);
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
      {/* Results Summary */}
      <div className="search-summary">
        <div className="results-count">
          <Hash size={16} />
          <span>
            {filteredCount} of {products.length} products
            {hasActiveFilters && ' (filtered)'}
          </span>
        </div>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="clear-all-btn">
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      <div className="search-main">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search products by name or features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
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
          
          {/* Search Suggestions */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="search-suggestions">
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-item"
                  onClick={() => {
                    setSearchTerm(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  <Search size={14} />
                  {suggestion}
                </button>
              ))}
            </div>
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

      {/* Enhanced Quick Sort Buttons */}
      <div className="quick-sort-container">
        <label className="sort-label">Quick Sort:</label>
        <button
          onClick={() => setSortBy('name')}
          className={`quick-sort-btn ${sortBy === 'name' ? 'active' : ''}`}
        >
          <span>A-Z</span>
        </button>
        <button
          onClick={() => setSortBy('price-low')}
          className={`quick-sort-btn ${sortBy === 'price-low' ? 'active' : ''}`}
        >
          <TrendingUp size={14} />
          <span>Price ↑</span>
        </button>
        <button
          onClick={() => setSortBy('price-high')}
          className={`quick-sort-btn ${sortBy === 'price-high' ? 'active' : ''}`}
        >
          <TrendingUp size={14} style={{ transform: 'rotate(180deg)' }} />
          <span>Price ↓</span>
        </button>
        <button
          onClick={() => setSortBy('newest')}
          className={`quick-sort-btn ${sortBy === 'newest' ? 'active' : ''}`}
        >
          <span>Latest</span>
        </button>
      </div>

      {showFilters && (
        <div className="search-filters">
          <h4 className="filters-title">Advanced Filters</h4>
          
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
              <label>Price Range (₹):</label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="price-input"
                  min="0"
                />
                <span className="price-separator">to</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="price-input"
                  min="0"
                />
              </div>
            </div>

            <div className="filter-actions">
              {hasActiveFilters && (
                <button onClick={clearFilters} className="clear-filters-btn">
                  <X size={16} />
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
