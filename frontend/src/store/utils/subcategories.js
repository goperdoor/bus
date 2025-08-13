// Subcategories for different store types
export const SUBCATEGORIES = {
  'Clothes': [
    'Mens Wear',
    'Womens Wear', 
    'Kids Wear',
    'T-Shirts',
    'Jeans', 
    'Shirts',
    'Dresses',
    'Sarees',
    'Kurtas',
    'Suits',
    'Casual Wear',
    'Formal Wear',
    'Traditional Wear',
    'Accessories'
  ],
  'Bakery': [
    'Bread & Buns',
    'Cakes',
    'Pastries',
    'Cookies',
    'Muffins',
    'Donuts',
    'Croissants',
    'Pies',
    'Birthday Cakes',
    'Custom Cakes',
    'Fresh Bread',
    'Sweet Items',
    'Snacks'
  ],
  'Medical Store': [
    'Prescription Drugs',
    'Over-the-Counter',
    'Ayurvedic Medicine',
    'Health Supplements',
    'Baby Care',
    'Personal Care',
    'First Aid',
    'Medical Equipment',
    'Vitamins',
    'Pain Relief',
    'Cold & Flu',
    'Digestive Health',
    'Skin Care'
  ],
  'Grocery': [
    'Fruits & Vegetables',
    'Rice & Grains',
    'Dal & Pulses',
    'Spices',
    'Oil & Ghee',
    'Milk & Dairy',
    'Snacks & Biscuits',
    'Tea & Coffee',
    'Cleaning Supplies',
    'Personal Care',
    'Baby Products',
    'Frozen Foods',
    'Beverages'
  ],
  'Electronics': [
    'Mobile Phones',
    'Laptops & Computers',
    'TV & Audio',
    'Home Appliances',
    'Kitchen Appliances',
    'Gaming',
    'Cameras',
    'Accessories',
    'Cables & Chargers',
    'Smart Home',
    'Wearables',
    'Power Banks',
    'Speakers'
  ],
  'Other': [
    'Books & Stationery',
    'Toys & Games',
    'Sports & Fitness',
    'Home & Garden',
    'Automotive',
    'Beauty & Cosmetics',
    'Jewelry',
    'Bags & Luggage',
    'Footwear',
    'Gift Items',
    'Art & Crafts',
    'Pet Supplies',
    'Services'
  ]
};

// Get subcategories for a specific store category
export const getSubcategoriesForCategory = (category) => {
  return SUBCATEGORIES[category] || SUBCATEGORIES['Other'];
};

// Get all unique subcategories
export const getAllSubcategories = () => {
  const allSubcategories = [];
  Object.values(SUBCATEGORIES).forEach(subcats => {
    subcats.forEach(subcat => {
      if (!allSubcategories.includes(subcat)) {
        allSubcategories.push(subcat);
      }
    });
  });
  return allSubcategories.sort();
};
