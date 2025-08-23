import axios from 'axios';

// For development: Use local backend server
// Change this IP to your computer's actual IP address if different
const BASE_URL = 'http://192.168.250.148:5000/api';

// For production (uncomment when deploying):
// const BASE_URL = 'https://bus-backend-production-44ce.up.railway.app/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Bus related API calls
export const busAPI = {
  // Get all destinations
  getDestinations: async () => {
    try {
      const response = await api.get('/destinations');
      return response.data;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      throw error;
    }
  },

  // Search buses by destination
  searchBuses: async (destination) => {
    try {
      const response = await api.get(`/buses/search?destination=${encodeURIComponent(destination)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching buses:', error);
      throw error;
    }
  },

  // Get all buses for displaying tables
  getAllBuses: async () => {
    try {
      const response = await api.get('/admin/buses');
      // Filter only active buses
      const activeBuses = response.data.filter(bus => bus.active);
      return activeBuses;
    } catch (error) {
      console.error('Error fetching all buses:', error);
      throw error;
    }
  },
};

// Store related API calls
export const storeAPI = {
  // Get all stores
  getStores: async () => {
    try {
      const response = await api.get('/stores');
      return response.data;
    } catch (error) {
      console.error('Error fetching stores:', error);
      throw error;
    }
  },

  // Get store by ID
  getStoreById: async (storeId) => {
    try {
      const response = await api.get(`/stores/${storeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching store:', error);
      throw error;
    }
  },
};

// Notifications API
export const notificationAPI = {
  // Send notification
  sendNotification: async (notificationData) => {
    try {
      const response = await api.post('/notifications/send', notificationData);
      return response.data;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  },
};

export default api;
