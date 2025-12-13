import React, { useState, useEffect } from 'react';
import './ShopDetails.css';

const ShopDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('all');
  
  const bakeryRef = React.useRef(null);
  const medicalRef = React.useRef(null);
  const groceryRef = React.useRef(null);
  const restaurantRef = React.useRef(null);
  const electronicsRef = React.useRef(null);
  const clothingRef = React.useRef(null);
  const hardwareRef = React.useRef(null);
  const stationeryRef = React.useRef(null);
  const allRef = React.useRef(null);

  const handleTabClick = (tabName, ref) => {
    setActiveTab(tabName);
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Shop Data JSON
  const [shopsData] = useState([

    {
  id: 2,
  name: 'Shree Ranganath New Bengaluru Iyangar Bakery Cake Parlour',
  category: 'bakery',
  image: 'https://res.cloudinary.com/dm4u0c7ga/image/upload/v1755138726/goperdoor-store/nrjl0uf9f9iiw0s6a0ke.jpg',
  items: [
    'Bread',
    'Cakes',
    'Pastries',
    'Puffs',
    'Buns',
    'Cookies',
    'Rusk',
    'Khara Items',
    'Sweet Items',
    'Snacks',
    'Birthday Cakes'
  ],
  contact: '+91 88675 56079',
  whatsapp: '+91 88675 56079',
  location: 'Near Perdoor Bus Stop',
  googleMapLink: 'https://maps.app.goo.gl/gF28Py6VfkpXsRXo9',
  openingTime: '7:00 AM',
  closingTime: '8:30 PM'
}
,
    {
      id: 1,
      name: 'ಅನಂತಪದ್ಮನಾಭ ಹೂವಿನ ಅಂಗಡಿ',
      category: 'flower',
      image: 'https://res.cloudinary.com/dm4u0c7ga/image/upload/v1755325256/goperdoor-store/we3xcf22sg1m9lxh9mh3.jpg',
      items: ['ಕನಗಿಲೆ ಹೂ', 'ಕಾಕಡ', 'ಜೆನಿಯಾ ಹೂ', 'ತುಳಸಿ ಮಾಲೆ', 'ಪಿಂಗಾರ', 'ಬಾಳೆಹಣ್ಣು', 'ಗುಲಾಬಿ', 'ಗಂಧದ ಮಾಲೆ', 'ಬಿಳಿ ಸೆವಂತಿಗೆ', 'ಬೀಟ್ರೂಟ್ ಹೂ', 'ಮಲ್ಲಿಗೆ', 'ಸೆವಂತಿಗೆ'],
      contact: '+91 78990 56098',
      whatsapp: '+91 78990 56098',
      location: 'ಮಲ್ಪೇಟೆ, ಪೆರ್ಡೂರು',
      googleMapLink: 'https://maps.app.goo.gl/psJoGWHaVawciU627',
      openingTime: '7:00 AM',
      closingTime: '7:30 PM'
    },
    {
      id: 3,
      name: 'Perdoor Medical Store',
      category: 'medical',
      image: '/shop-images/medical-placeholder.jpg',
      items: ['Medicines', 'First Aid', 'Health Supplements', 'Medical Equipment', 'Baby Care'],
      contact: '+91 97654 32109',
      whatsapp: '+91 97654 32109',
      location: 'Perdoor Market, Main Road',
      googleMapLink: 'https://maps.google.com/?q=Perdoor+Market',
      openingTime: '8:00 AM',
      closingTime: '10:00 PM'
    },
    {
      id: 4,
      name: 'Ganesh General Stores',
      category: 'grocery',
      image: '/shop-images/grocery-placeholder.jpg',
      items: ['Groceries', 'Vegetables', 'Fruits', 'Dairy Products', 'Household Items', 'Snacks'],
      contact: '+91 96543 21098',
      whatsapp: '+91 96543 21098',
      location: 'Perdoor Village, NH 66',
      googleMapLink: 'https://maps.google.com/?q=Perdoor+Village+NH66',
      openingTime: '7:00 AM',
      closingTime: '9:00 PM'
    },
    {
      id: 5,
      name: 'Udupi Hotel',
      category: 'restaurant',
      image: '/shop-images/restaurant-placeholder.jpg',
      items: ['Breakfast', 'Lunch', 'Dinner', 'Tiffin Items', 'South Indian Food', 'Meals'],
      contact: '+91 95432 10987',
      whatsapp: null,
      location: 'Perdoor Junction, Main Road',
      googleMapLink: 'https://maps.google.com/?q=Perdoor+Junction',
      openingTime: '7:00 AM',
      closingTime: '10:00 PM'
    },
    {
      id: 6,
      name: 'Mahalasa Electronics',
      category: 'electronics',
      image: '/shop-images/electronics-placeholder.jpg',
      items: ['Mobile Phones', 'Laptops', 'TVs', 'Refrigerators', 'Washing Machines', 'Accessories'],
      contact: '+91 94321 09876',
      whatsapp: '+91 94321 09876',
      location: 'Perdoor Market Complex',
      googleMapLink: 'https://maps.google.com/?q=Perdoor+Market+Complex',
      openingTime: '9:00 AM',
      closingTime: '8:30 PM'
    },
    {
      id: 7,
      name: 'Fashion Point',
      category: 'clothing',
      image: '/shop-images/clothing-placeholder.jpg',
      items: ['Men\'s Wear', 'Women\'s Wear', 'Kids Wear', 'Footwear', 'Accessories', 'Ethnic Wear'],
      contact: '+91 93210 98765',
      whatsapp: '+91 93210 98765',
      location: 'Perdoor Main Road, Near Temple',
      googleMapLink: 'https://maps.google.com/?q=Perdoor+Temple',
      openingTime: '9:30 AM',
      closingTime: '8:00 PM'
    },
    {
      id: 8,
      name: 'Bharath Hardware',
      category: 'hardware',
      image: '/shop-images/hardware-placeholder.jpg',
      items: ['Building Materials', 'Electrical Items', 'Plumbing Supplies', 'Tools', 'Paint', 'Sanitary'],
      contact: '+91 92109 87654',
      whatsapp: null,
      location: 'Perdoor Market, Industrial Area',
      googleMapLink: 'https://maps.google.com/?q=Perdoor+Industrial+Area',
      openingTime: '8:00 AM',
      closingTime: '7:00 PM'
    },
    {
      id: 9,
      name: 'Students Corner',
      category: 'stationery',
      image: '/shop-images/stationery-placeholder.jpg',
      items: ['Books', 'Notebooks', 'Pens', 'Art Supplies', 'School Bags', 'Educational Items'],
      contact: '+91 91098 76543',
      whatsapp: '+91 91098 76543',
      location: 'Perdoor, Near School',
      googleMapLink: 'https://maps.google.com/?q=Perdoor+School',
      openingTime: '8:30 AM',
      closingTime: '8:00 PM'
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Shops', icon: '🏪', ref: allRef },
    { id: 'bakery', name: 'Bakery & Sweets', icon: '🍰', ref: bakeryRef },
    { id: 'flower', name: 'Flowers', icon: '🌸', ref: React.useRef(null) },
    { id: 'medical', name: 'Medical', icon: '💊', ref: medicalRef },
    { id: 'grocery', name: 'Grocery', icon: '🛒', ref: groceryRef },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️', ref: restaurantRef },
    { id: 'electronics', name: 'Electronics', icon: '📱', ref: electronicsRef },
    { id: 'clothing', name: 'Clothing', icon: '👕', ref: clothingRef },
    { id: 'hardware', name: 'Hardware', icon: '🔧', ref: hardwareRef },
    { id: 'stationery', name: 'Stationery', icon: '📚', ref: stationeryRef }
  ];

  const getFilteredShops = () => {
    if (activeTab === 'all') return shopsData;
    return shopsData.filter(shop => shop.category === activeTab);
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : '🏪';
  };

  const getCategoryName = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.name : category;
  };

  const ShopCard = ({ shop }) => (
    <div className="shop-card">
      <div className="shop-image-container">
        <img 
          src={shop.image} 
          alt={shop.name}
          className="shop-image"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23999"%3E' + shop.name + '%3C/text%3E%3C/svg%3E';
          }}
        />
        <div className="shop-category-badge">
          <span className="category-icon">{getCategoryIcon(shop.category)}</span>
          <span className="category-text">{getCategoryName(shop.category)}</span>
        </div>
      </div>
      
      <div className="shop-content">
        <h3 className="shop-name">{shop.name}</h3>
        
        <div className="shop-items-section">
          <h4 className="items-title">Products & Services:</h4>
          <div className="items-tags">
            {shop.items.map((item, index) => (
              <span key={index} className="item-tag">{item}</span>
            ))}
          </div>
        </div>

        <div className="shop-contact-section">
          <div className="contact-row">
            <span className="contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
            </span>
            <a href={`tel:${shop.contact}`} className="contact-link">{shop.contact}</a>
          </div>
          
          {shop.whatsapp && (
            <div className="contact-row">
              <span className="contact-icon whatsapp-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </span>
              <a 
                href={`https://wa.me/${shop.whatsapp.replace(/[\s+]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link whatsapp-link"
              >
                WhatsApp Chat
              </a>
            </div>
          )}
        </div>

        <div className="shop-location-section">
          <div className="location-row">
            <span className="location-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </span>
            <span className="location-text">{shop.location}</span>
          </div>
          <a 
            href={shop.googleMapLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="map-link"
          >
            <span className="map-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
              </svg>
            </span>
            Open in Google Maps
          </a>
        </div>

        {shop.openingTime && shop.closingTime && (
          <div className="shop-timing-section">
            <span className="timing-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
            </span>
            <span className="timing-text">
              {shop.openingTime} - {shop.closingTime}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="shop-details-page">
      <div className="page-container">
        <div className="hero-header">
          <h1 className="page-title">🏪 Perdoor Shops Directory</h1>
          <p className="page-subtitle">Discover local businesses in Perdoor</p>
          
          <div className="tabs-container" role="tablist" aria-label="Shop Categories">
            {categories.map(category => (
              <button 
                key={category.id}
                className={`tab-button ${activeTab === category.id ? 'active' : ''}`}
                role="tab"
                aria-selected={activeTab === category.id}
                aria-controls={`tab-panel-${category.id}`}
                onClick={() => handleTabClick(category.id, category.ref)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-text">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div ref={activeTab === 'all' ? allRef : categories.find(c => c.id === activeTab)?.ref} className="shops-section" role="tabpanel">
          {getFilteredShops().length > 0 ? (
            <div className="shops-grid">
              {getFilteredShops().map(shop => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          ) : (
            <div className="no-shops-message">
              <p>No shops found in this category.</p>
              <button 
                className="view-all-btn"
                onClick={() => handleTabClick('all', allRef)}
              >
                View All Shops
              </button>
            </div>
          )}
        </div>

        <div className="add-shop-section">
          <div className="add-shop-card">
            <h3 className="add-shop-title">🏪 Own a business in Perdoor?</h3>
            <p className="add-shop-description">
              List your shop here and reach more customers in the community!
            </p>
            <button 
              type="button" 
              onClick={() => window.open('https://forms.gle/5KUnkXEG5QnZfPot6', '_blank')}
              className="submit-shop-button"
            >
              📝 Add Your Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
