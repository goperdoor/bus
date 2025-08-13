import React, { useState, useEffect } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { getSubcategoriesForCategory } from '../utils/subcategories';
import '../styles/ProductSearch.css';

const ProductSearch = ({ 
  products, 
  onFilteredProducts, 
  storeCategory,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const subcategories = getSubcategoriesForCategory(storeCategory);

  // Filter and search products
  useEffect(() => {
    let filtered = [...products];

    // Text search (name, features)
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.features?.some(feature => 
          feature.toLowerCase().includes(searchLower)
        ) ||
        product.subcategory?.toLowerCase().includes(searchLower)
      );
    }

    // Price range filter
    if (priceRange.min !== '') {
      filtered = filtered.filter(product => 
        product.price >= parseFloat(priceRange.min)
      );
    }
    if (priceRange.max !== '') {
      filtered = filtered.filter(product => 
        product.price <= parseFloat(priceRange.max)
      );
    }

    // Subcategory filter
    if (selectedSubcategory) {
      filtered = filtered.filter(product => 
        product.subcategory === selectedSubcategory
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    onFilteredProducts(filtered);
  }, [searchTerm, priceRange, selectedSubcategory, sortBy, products, onFilteredProducts]);

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange({ min: '', max: '' });
    setSelectedSubcategory('');
    setSortBy('name');
  };

  const hasActiveFilters = searchTerm || priceRange.min || priceRange.max || selectedSubcategory || sortBy !== 'name';

  return (
    <div className={`product-search ${className}`}>
      <div className="search-main">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search products by name, features, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="clear-search"
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
          {hasActiveFilters && <span className="filter-badge">●</span>}
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-row">
            <div className="filter-group">
              <label>Sort by</label>
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

            <div className="filter-group">
              <label>Category</label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {subcategories.map(subcat => (
                  <option key={subcat} value={subcat}>{subcat}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range</label>
              <div className="price-range">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                  className="price-input"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                  className="price-input"
                />
              </div>
            </div>

            {hasActiveFilters && (
              <div className="filter-group">
                <button onClick={clearFilters} className="clear-filters">
                  <X size={16} />
                  Clear All
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
