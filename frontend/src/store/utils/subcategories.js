// Subcategory mappings for different store types

const SUBCATEGORIES = {
  'Clothes': [
    'Mens Wear',
    'Womens Wear',
    'T-Shirts',
    'Shirts',
    'Jeans',
    'Dresses',
    'Ethnic Wear',
    'Formal Wear',
    'Casual Wear',
    'Winter Wear',
    'Accessories',
    'Footwear',
    'Undergarments',
    'Sports Wear',
    'Kids Wear'
  ],
  'Bakery': [
    'Cakes',
    'Pastries',
    'Bread',
    'Cookies',
    'Donuts',
    'Cupcakes',
    'Muffins',
    'Pies',
    'Croissants',
    'Bagels',
    'Sweets',
    'Beverages',
    'Custom Cakes',
    'Birthday Cakes',
    'Wedding Cakes'
  ],
  'Medical Store': [
    'Prescription Medicines',
    'Over-the-Counter',
    'Ayurvedic Medicines',
    'Homeopathic',
    'Health Supplements',
    'Vitamins',
    'First Aid',
    'Personal Care',
    'Baby Care',
    'Diabetic Care',
    'Orthopedic',
    'Dental Care',
    'Eye Care',
    'Skin Care',
    'Hair Care'
  ],
  'Grocery': [
    'Fruits & Vegetables',
    'Dairy Products',
    'Meat & Poultry',
    'Seafood',
    'Grains & Pulses',
    'Spices',
    'Oil & Ghee',
    'Snacks',
    'Beverages',
    'Frozen Foods',
    'Canned Goods',
    'Household Items',
    'Personal Care',
    'Baby Products',
    'Pet Supplies'
  ],
  'Electronics': [
    'Mobile Phones',
    'Laptops',
    'Tablets',
    'Desktop Computers',
    'Gaming',
    'Audio & Headphones',
    'Cameras',
    'Smart Watches',
    'TV & Home Theater',
    'Kitchen Appliances',
    'Air Conditioners',
    'Refrigerators',
    'Washing Machines',
    'Smart Home Devices',
    'Accessories'
  ],
  'Other': [
    'General Items',
    'Services',
    'Tools & Hardware',
    'Books & Stationery',
    'Toys & Games',
    'Sports Equipment',
    'Automotive',
    'Home & Garden',
    'Beauty & Cosmetics',
    'Jewelry',
    'Gifts',
    'Art & Crafts',
    'Musical Instruments',
    'Travel Accessories',
    'Pet Products'
  ]
};

/**
 * Get subcategories for a specific store category
 * @param {string} category - The store category
 * @returns {string[]} - Array of subcategory options
 */
export const getSubcategoriesForCategory = (category) => {
  if (!category) return SUBCATEGORIES['Other'] || [];
  
  // Normalize category name (handle case variations)
  const normalizedCategory = Object.keys(SUBCATEGORIES).find(
    key => key.toLowerCase() === category.toLowerCase()
  );
  
  return SUBCATEGORIES[normalizedCategory] || SUBCATEGORIES['Other'] || [];
};

/**
 * Get all available subcategories across all store types
 * @returns {Object} - Object with category as key and subcategories as value
 */
export const getAllSubcategories = () => {
  return SUBCATEGORIES;
};

/**
 * Check if a subcategory exists for a given category
 * @param {string} category - The store category
 * @param {string} subcategory - The subcategory to check
 * @returns {boolean} - Whether the subcategory exists
 */
export const isValidSubcategory = (category, subcategory) => {
  const subcategories = getSubcategoriesForCategory(category);
  return subcategories.includes(subcategory);
};

export default SUBCATEGORIES;
