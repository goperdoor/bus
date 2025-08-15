// Store utility functions

/**
 * Generate a product inquiry message for WhatsApp or other messaging
 * @param {Object} product - The product object
 * @param {Object} store - The store object
 * @returns {string} - Formatted inquiry message
 */
export const getProductInquiryMessage = (product, store) => {
  if (!product || !store) {
    return `Hi ${store?.name || 'Store'}! I'm interested in your products. Could you help me with more details?`;
  }

  const baseMessage = `Hi ${store.name}! I'm interested in your product: *${product.name}*`;
  
  // Add price if available
  const priceInfo = product.price ? ` (₹${product.price})` : '';
  
  // Add features if available
  let featuresInfo = '';
  if (product.features && product.features.length > 0) {
    const topFeatures = product.features.slice(0, 3); // Show max 3 features
    featuresInfo = `\n\nFeatures I'm interested in:\n${topFeatures.map(f => `• ${f}`).join('\n')}`;
  }

  // Add subcategory if available
  const subcategoryInfo = product.subcategory ? `\nCategory: ${product.subcategory}` : '';

  const inquiryText = '\n\nCould you please provide more details about this product and let me know about availability and ordering process?';

  return `${baseMessage}${priceInfo}${subcategoryInfo}${featuresInfo}${inquiryText}`;
};

/**
 * Format store operating hours for display
 * @param {Object} operatingHours - The operating hours object
 * @returns {string} - Formatted hours string
 */
export const formatOperatingHours = (operatingHours) => {
  if (!operatingHours) return 'Hours not available';

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const formattedHours = days.map((day, index) => {
    const dayData = operatingHours[day];
    if (!dayData || !dayData.isOpen) {
      return `${dayNames[index]}: Closed`;
    }
    return `${dayNames[index]}: ${dayData.openTime || '00:00'} - ${dayData.closeTime || '00:00'}`;
  });

  return formattedHours.join('\n');
};

/**
 * Check if store is currently open
 * @param {Object} operatingHours - The operating hours object
 * @returns {boolean} - Whether store is open
 */
export const isStoreOpen = (operatingHours) => {
  if (!operatingHours) return false;

  const now = new Date();
  const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
  const currentDay = istTime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTime = istTime.getHours() * 60 + istTime.getMinutes();

  const todayHours = operatingHours[currentDay];
  
  if (!todayHours || !todayHours.isOpen) {
    return false;
  }

  const openTime = timeToMinutes(todayHours.openTime);
  const closeTime = timeToMinutes(todayHours.closeTime);

  if (openTime === null || closeTime === null) {
    return false;
  }

  return currentTime >= openTime && currentTime <= closeTime;
};

/**
 * Convert time string to minutes
 * @param {string} timeStr - Time string in HH:MM format
 * @returns {number|null} - Time in minutes or null if invalid
 */
const timeToMinutes = (timeStr) => {
  if (!timeStr || timeStr === '') return null;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Generate store contact message
 * @param {Object} store - The store object
 * @param {string} customMessage - Optional custom message
 * @returns {string} - Formatted contact message
 */
export const getStoreContactMessage = (store, customMessage) => {
  const baseMessage = customMessage || `Hi ${store.name}! I found your store on GoPerdoor and I'm interested in your products/services.`;
  
  const locationInfo = store.location ? `\n\nI saw you're located at: ${store.location}` : '';
  const categoryInfo = store.category ? `\nStore category: ${store.category}` : '';
  
  const closingText = '\n\nCould you please help me with more information? Thank you!';
  
  return `${baseMessage}${locationInfo}${categoryInfo}${closingText}`;
};

/**
 * Create WhatsApp link with message
 * @param {string} phoneNumber - Phone number (with or without country code)
 * @param {string} message - Message to send
 * @returns {string} - WhatsApp URL
 */
export const createWhatsAppLink = (phoneNumber, message) => {
  // Clean phone number and add country code if not present
  let cleanPhone = phoneNumber.replace(/[^\d]/g, '');
  if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone; // Add India country code
  }
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

/**
 * Create SMS link with message
 * @param {string} phoneNumber - Phone number
 * @param {string} message - Message to send
 * @returns {string} - SMS URL
 */
export const createSMSLink = (phoneNumber, message) => {
  const encodedMessage = encodeURIComponent(message);
  return `sms:${phoneNumber}?body=${encodedMessage}`;
};
