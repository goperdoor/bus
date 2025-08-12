import React, { useState, useEffect } from 'react';
import { Users, Plus, ToggleLeft, ToggleRight, Store } from 'lucide-react';
import storeService from '../store/services/storeAPI';

const SuperAdmin = () => {
  const [activeTab, setActiveTab] = useState('create-admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [newAdmin, setNewAdmin] = useState({
    username: '',
    password: ''
  });

  const handleAuthentication = () => {
    if (adminPassword === 'admin123') { // Replace with your admin password
      setAuthenticated(true);
      if (activeTab === 'manage-stores') {
        fetchStores();
      }
    } else {
      setMessage('Invalid admin password');
    }
  };

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await storeService.getAllStores(adminPassword);
      setStores(response.data);
    } catch (error) {
      setMessage('Failed to fetch stores');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await storeService.createStoreAdmin(newAdmin, adminPassword);
      setMessage('Store admin created successfully!');
      setNewAdmin({ username: '', password: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create store admin');
    } finally {
      setLoading(false);
    }
  };

  const toggleStoreStatus = async (storeId) => {
    try {
      await storeService.toggleStoreStatus(storeId, adminPassword);
      fetchStores();
      setMessage('Store status updated successfully');
    } catch (error) {
      setMessage('Failed to update store status');
    }
  };

  if (!authenticated) {
    return (
      <div style={{ padding: '120px 20px', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ 
          background: 'white', 
          padding: '40px', 
          borderRadius: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h2>Super Admin Access</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '15px',
              margin: '20px 0',
              border: '2px solid #e1e5e9',
              borderRadius: '12px',
              fontSize: '1rem'
            }}
          />
          <button 
            onClick={handleAuthentication}
            style={{
              width: '100%',
              padding: '15px',
              background: 'linear-gradient(135deg, #485eff 0%, #a955ff 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Access Super Admin
          </button>
          {message && <p style={{ color: '#e74c3c', marginTop: '15px' }}>{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '120px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#485eff', 
          marginBottom: '30px',
          fontSize: '2.2rem'
        }}>
          Store Super Admin Panel
        </h1>

        <div style={{ 
          display: 'flex', 
          background: 'white', 
          borderRadius: '15px',
          padding: '5px',
          marginBottom: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
        }}>
          <button 
            onClick={() => setActiveTab('create-admin')}
            style={{
              flex: 1,
              padding: '15px',
              background: activeTab === 'create-admin' ? 'linear-gradient(135deg, #485eff 0%, #a955ff 100%)' : 'transparent',
              color: activeTab === 'create-admin' ? 'white' : '#666',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <Users size={18} style={{ marginRight: '8px' }} />
            Create Store Admin
          </button>
          <button 
            onClick={() => {
              setActiveTab('manage-stores');
              fetchStores();
            }}
            style={{
              flex: 1,
              padding: '15px',
              background: activeTab === 'manage-stores' ? 'linear-gradient(135deg, #485eff 0%, #a955ff 100%)' : 'transparent',
              color: activeTab === 'manage-stores' ? 'white' : '#666',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <Store size={18} style={{ marginRight: '8px' }} />
            Manage Stores
          </button>
        </div>

        {message && (
          <div style={{
            padding: '15px',
            background: message.includes('success') ? '#d4edda' : '#f8d7da',
            color: message.includes('success') ? '#155724' : '#721c24',
            borderRadius: '10px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        {activeTab === 'create-admin' && (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '25px', color: '#333' }}>Create New Store Admin</h2>
            <form onSubmit={handleCreateAdmin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Username *
                </label>
                <input
                  type="text"
                  required
                  value={newAdmin.username}
                  onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '15px 30px',
                  background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '1.1rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  margin: '0 auto'
                }}
              >
                <Plus size={20} />
                {loading ? 'Creating...' : 'Create Store Admin'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'manage-stores' && (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '25px', color: '#333' }}>Manage Stores</h2>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #485eff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 20px'
                }}></div>
                Loading stores...
              </div>
            ) : stores.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                No stores found. Store admins need to set up their stores first.
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                {stores.map(store => (
                  <div 
                    key={store._id}
                    style={{
                      background: '#f8f9fa',
                      padding: '25px',
                      borderRadius: '15px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                    }}
                  >
                    {store.imageUrl && (
                      <img 
                        src={store.imageUrl} 
                        alt={store.name}
                        style={{
                          width: '100%',
                          height: '120px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          marginBottom: '15px'
                        }}
                      />
                    )}
                    
                    <h3 style={{ color: '#333', marginBottom: '10px' }}>
                      {store.name || 'Unnamed Store'}
                    </h3>
                    
                    <p style={{ 
                      color: '#666', 
                      fontSize: '0.9rem', 
                      marginBottom: '10px' 
                    }}>
                      {store.description || 'No description'}
                    </p>
                    
                    <p style={{ fontSize: '0.85rem', marginBottom: '5px' }}>
                      <strong>Category:</strong> {store.category}
                    </p>
                    
                    <p style={{ fontSize: '0.85rem', marginBottom: '15px' }}>
                      <strong>Products:</strong> {store.products?.length || 0}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                          {store.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span style={{
                          color: store.isActive ? '#28a745' : '#dc3545'
                        }}>
                          {store.isActive ? '●' : '●'}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => toggleStoreStatus(store._id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: store.isActive ? '#dc3545' : '#28a745',
                          fontSize: '1.5rem'
                        }}
                        title={store.isActive ? 'Deactivate Store' : 'Activate Store'}
                      >
                        {store.isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SuperAdmin;
