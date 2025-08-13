// Store utility functions

export const isStoreOpen = (operatingHours) => {
  if (!operatingHours) return { isOpen: false, message: "Hours not available" };
  
  const now = new Date();
  const currentDay = now.toLocaleLowerCase().substring(0, 3);
  const currentTime = now.getHours() * 100 + now.getMinutes();
  
  const dayMapping = {
    'sun': 'sunday',
    'mon': 'monday',
    'tue': 'tuesday',
    'wed': 'wednesday',
    'thu': 'thursday',
    'fri': 'friday',
    'sat': 'saturday'
  };
  
  const todayHours = operatingHours[dayMapping[currentDay]];
  
  if (!todayHours || !todayHours.isOpen) {
    return { isOpen: false, message: "Closed today" };
  }
  
  if (!todayHours.open || !todayHours.close) {
    return { isOpen: false, message: "Hours not set" };
  }
  
  const openTime = parseInt(todayHours.open.replace(':', ''));
  const closeTime = parseInt(todayHours.close.replace(':', ''));
  
  if (currentTime >= openTime && currentTime <= closeTime) {
    return { isOpen: true, message: `Open until ${todayHours.close}` };
  } else if (currentTime < openTime) {
    return { isOpen: false, message: `Opens at ${todayHours.open}` };
  } else {
    return { isOpen: false, message: "Closed" };
  }
};

export const formatOperatingHours = (operatingHours) => {
  if (!operatingHours) return [];
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  return days.map((day, index) => {
    const dayData = operatingHours[dayKeys[index]];
    return {
      day,
      isOpen: dayData?.isOpen || false,
      hours: dayData?.isOpen ? `${dayData.open} - ${dayData.close}` : 'Closed'
    };
  });
};

export const createWhatsAppLink = (phone, message) => {
  const cleanPhone = phone.replace(/\D/g, '');
  const whatsappPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
};

export const createSMSLink = (phone, message) => {
  const cleanPhone = phone.replace(/\D/g, '');
  return `sms:${cleanPhone}?body=${encodeURIComponent(message)}`;
};

export const getProductInquiryMessage = (product, store) => {
  return `Hi ${store.name}! I'm interested in "${product.name}" (₹${product.price}). Could you please provide more details about this product? Thank you!`;
};

export const getStoreInquiryMessage = (store) => {
  return `Hi ${store.name}! I'm interested in your products and services. Could you please share more information? Thank you!`;
};
