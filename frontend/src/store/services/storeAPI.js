import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const storeAPI = axios.create({
  baseURL: `${API_URL}/api/store`
});

// Add auth token to requests if available
storeAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('storeToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const storeService = {
  // Public API
  getCategories: () => storeAPI.get('/categories'),
  getStore: (id) => storeAPI.get(`/store/${id}`),

  // Store Admin API
  login: (credentials) => storeAPI.post('/admin/login', credentials),
  getAdminStore: () => storeAPI.get('/admin/store'),
  updateStore: (storeData) => {
    const formData = new FormData();
    Object.keys(storeData).forEach(key => {
      if (key === 'storeImage' && storeData[key]) {
        formData.append('storeImage', storeData[key]);
      } else {
        formData.append(key, storeData[key]);
      }
    });
    return storeAPI.put('/admin/store', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  addProduct: (productData) => {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'productImage' && productData[key]) {
        formData.append('productImage', productData[key]);
      } else if (key === 'features') {
        formData.append(key, Array.isArray(productData[key]) ? productData[key].join(',') : productData[key]);
      } else {
        formData.append(key, productData[key]);
      }
    });
    return storeAPI.post('/admin/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  updateProduct: (productId, productData) => {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'productImage' && productData[key]) {
        formData.append('productImage', productData[key]);
      } else if (key === 'features') {
        formData.append(key, Array.isArray(productData[key]) ? productData[key].join(',') : productData[key]);
      } else {
        formData.append(key, productData[key]);
      }
    });
    return storeAPI.put(`/admin/products/${productId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  deleteProduct: (productId) => storeAPI.delete(`/admin/products/${productId}`),

  // Carousel Management API
  addCarouselImage: (formData) => storeAPI.post('/admin/carousel', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getCarouselImages: () => storeAPI.get('/admin/carousel'),
  deleteCarouselImage: (imageId) => storeAPI.delete(`/admin/carousel/${imageId}`),
  toggleCarouselImage: (imageId) => storeAPI.put(`/admin/carousel/${imageId}/toggle`),

  // Super Admin API
  createStoreAdmin: (adminData, adminPassword) => storeAPI.post('/super-admin/store-admins', adminData, {
    headers: { 'Admin-Password': adminPassword }
  }),
  getAllStores: (adminPassword) => storeAPI.get('/super-admin/stores', {
    headers: { 'Admin-Password': adminPassword }
  }),
  toggleStoreStatus: (storeId, adminPassword) => storeAPI.put(`/super-admin/stores/${storeId}/toggle`, {}, {
    headers: { 'Admin-Password': adminPassword }
  })
};

export default storeService;
