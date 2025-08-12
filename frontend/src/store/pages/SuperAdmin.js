import React, { useState, useEffect } from 'react';
import { Users, Shield, Store, Plus, Eye, EyeOff } from 'lucide-react';
import storeService from '../services/storeAPI';
import '../styles/SuperAdmin.css';

const SuperAdmin = () => {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('create-admin');
  const [stores, setStores] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAuthenticated(true);
      setMessage({ type: '', text: '' });
    } else {
      setMessage({ type: 'error', text: 'Invalid admin password' });
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await storeService.createStoreAdmin(formData, adminPassword);
      setMessage({ type: 'success', text: 'Store admin created successfully!' });
      setFormData({ username: '', password: '' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to create admin' 
      });
    }
    setLoading(false);
  };

  const loadStores = async () => {
    try {
      const response = await storeService.getAllStores(adminPassword);
      setStores(response.data);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to load stores' 
      });
    }
  };

  const toggleStoreStatus = async (storeId) => {
    try {
      await storeService.toggleStoreStatus(storeId, adminPassword);
      await loadStores(); // Reload stores
      setMessage({ type: 'success', text: 'Store status updated!' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to update store status' 
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === 'manage-stores') {
      loadStores();
    }
  }, [isAuthenticated, activeTab]);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isAuthenticated) {
    return (
      <div className="super-admin-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <Shield className="auth-icon" />
              <h2>Super Admin Access</h2>
            </div>
            
            <form onSubmit={handleAuth} className="auth-form">
              <div className="form-group">
                <label>Admin Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              {message.text && (
                <div className={`message ${message.type}`}>
                  {message.text}
                </div>
              )}
              
              <button type="submit" className="auth-button">
                Access Super Admin Panel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="super-admin-page">
      <div className="admin-header">
        <Shield className="admin-icon" />
        <h1>Super Admin Panel</h1>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'create-admin' ? 'active' : ''}`}
          onClick={() => setActiveTab('create-admin')}
        >
          <Plus size={18} />
          Create Store Admin
        </button>
        <button
          className={`tab-button ${activeTab === 'manage-stores' ? 'active' : ''}`}
          onClick={() => setActiveTab('manage-stores')}
        >
          <Store size={18} />
          Manage Stores
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {activeTab === 'create-admin' && (
        <div className="admin-content">
          <div className="content-card">
            <h2>Create New Store Admin</h2>
            <form onSubmit={handleCreateAdmin} className="admin-form">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Creating...' : 'Create Admin'}
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'manage-stores' && (
        <div className="admin-content">
          <div className="content-card">
            <h2>Manage Stores</h2>
            {stores.length === 0 ? (
              <p className="no-stores">No stores found</p>
            ) : (
              <div className="stores-grid">
                {stores.map(store => (
                  <div key={store._id} className="store-card">
                    <div className="store-info">
                      <h3>{store.name}</h3>
                      <p className="store-category">{store.category}</p>
                      <p className="store-location">{store.location}</p>
                      <span className={`store-status ${store.isActive ? 'active' : 'inactive'}`}>
                        {store.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleStoreStatus(store._id)}
                      className={`toggle-button ${store.isActive ? 'deactivate' : 'activate'}`}
                    >
                      {store.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;
