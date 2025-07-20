import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Admin = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [formData, setFormData] = useState({
    busName: '',
    busNumber: '',
    destination: '',
    arrivalTimeToPerdoor: '',
    leavingTimeFromPerdoor: '',
    availability: 'daily',
    active: true
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  
  // Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/buses`);
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
      setMessage('Error fetching buses');
    } finally {
      setLoading(false);
    }
  };

  // Get filtered buses
  const getFilteredBuses = () => {
    let filteredBuses = buses;
    
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filteredBuses = buses.filter(bus => {
        switch (searchFilter) {
          case 'busName':
            return bus.busName.toLowerCase().includes(searchLower);
          case 'destination':
            return bus.destination.toLowerCase().includes(searchLower);
          case 'all':
          default:
            return bus.busName.toLowerCase().includes(searchLower) || 
                   bus.destination.toLowerCase().includes(searchLower);
        }
      });
    }

    return filteredBuses;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchFilterChange = (e) => {
    setSearchFilter(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchFilter('all');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.busName.trim()) newErrors.busName = 'Bus name is required';
    if (!formData.busNumber.trim()) newErrors.busNumber = 'Bus number is required';
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.arrivalTimeToPerdoor) newErrors.arrivalTimeToPerdoor = 'Arrival time is required';
    if (!formData.leavingTimeFromPerdoor) newErrors.leavingTimeFromPerdoor = 'Leaving time is required';

    if (formData.arrivalTimeToPerdoor && !moment(formData.arrivalTimeToPerdoor, 'HH:mm', true).isValid()) {
      newErrors.arrivalTimeToPerdoor = 'Invalid time format';
    }
    if (formData.leavingTimeFromPerdoor && !moment(formData.leavingTimeFromPerdoor, 'HH:mm', true).isValid()) {
      newErrors.leavingTimeFromPerdoor = 'Invalid time format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      if (editingBus) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/admin/buses/${editingBus._id}`, formData);
        setMessage('Bus updated successfully');
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/buses`, formData);
        setMessage('Bus added successfully');
      }

      fetchBuses();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving bus:', error);
      setMessage(error.response?.data?.error || 'Error saving bus');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bus) => {
    setEditingBus(bus);
    setFormData({
      busName: bus.busName,
      busNumber: bus.busNumber,
      destination: bus.destination,
      arrivalTimeToPerdoor: bus.arrivalTimeToPerdoor,
      leavingTimeFromPerdoor: bus.leavingTimeFromPerdoor,
      availability: bus.availability,
      active: bus.active
    });
    setShowModal(true);
  };

  const handleDelete = async (busId) => {
    if (!window.confirm('Are you sure you want to delete this bus?')) return;

    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/buses/${busId}`);
      setMessage('Bus deleted successfully');
      fetchBuses();
    } catch (error) {
      console.error('Error deleting bus:', error);
      setMessage('Error deleting bus');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingBus(null);
    setFormData({
      busName: '',
      busNumber: '',
      destination: '',
      arrivalTimeToPerdoor: '',
      leavingTimeFromPerdoor: '',
      availability: 'daily',
      active: true
    });
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBus(null);
    setFormData({
      busName: '',
      busNumber: '',
      destination: '',
      arrivalTimeToPerdoor: '',
      leavingTimeFromPerdoor: '',
      availability: 'daily',
      active: true
    });
    setErrors({});
  };

  const formatTime = (time) => {
    return moment(time, 'HH:mm').format('h:mm A');
  };

  const filteredBuses = getFilteredBuses();

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa', 
      padding: '10px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            margin: '0 0 10px 0', 
            color: '#2c3e50',
            fontSize: 'clamp(24px, 5vw, 32px)'
          }}>
            🚌 Admin Panel
          </h1>
          <p style={{ 
            margin: '0', 
            color: '#6c757d',
            fontSize: 'clamp(14px, 3vw, 16px)'
          }}>
            Manage bus information
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '15px', 
          justifyContent: 'center',
          marginBottom: '25px' 
        }}>
          <button 
            onClick={handleAddNew} 
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(40,167,69,0.3)',
              transition: 'all 0.2s',
              minWidth: '140px'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            ➕ Add New Bus
          </button>
          <Link 
            to="/" 
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(108,117,125,0.3)',
              transition: 'all 0.2s',
              minWidth: '140px',
              textAlign: 'center'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            🏠 Back to Home
          </Link>
        </div>

        {/* Search Section */}
        <div style={{ 
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
            alignItems: 'end'
          }}>
            <div>
              <label style={{ 
                display: 'block',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#495057',
                fontSize: '14px'
              }}>
                🔍 Search Buses
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Enter bus name or destination..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#495057',
                fontSize: '14px'
              }}>
                🎯 Filter by
              </label>
              <select
                value={searchFilter}
                onChange={handleSearchFilterChange}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                  boxSizing: 'border-box'
                }}
              >
                <option value="all">All Fields</option>
                <option value="busName">Bus Name</option>
                <option value="destination">Destination</option>
              </select>
            </div>

            {(searchTerm || searchFilter !== 'all') && (
              <button
                onClick={handleClearSearch}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  alignSelf: 'end'
                }}
              >
                🗑️ Clear
              </button>
            )}
          </div>

          {searchTerm && (
            <div style={{ 
              marginTop: '15px',
              padding: '12px 16px',
              backgroundColor: '#e3f2fd',
              border: '1px solid #bbdefb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1976d2'
            }}>
              📊 Found <strong>{filteredBuses.length}</strong> bus{filteredBuses.length !== 1 ? 'es' : ''} 
              {searchFilter !== 'all' && ` in ${searchFilter === 'busName' ? 'Bus Names' : 'Destinations'}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </div>
          )}
        </div>

        {/* Message Alert */}
        {message && (
          <div style={{
            padding: '15px 20px',
            backgroundColor: message.includes('Error') ? '#f8d7da' : '#d4edda',
            color: message.includes('Error') ? '#721c24' : '#155724',
            borderRadius: '8px',
            marginBottom: '25px',
            textAlign: 'center',
            fontWeight: '500',
            border: `1px solid ${message.includes('Error') ? '#f5c6cb' : '#c3e6cb'}`
          }}>
            {message.includes('Error') ? '⚠️' : '✅'} {message}
          </div>
        )}

        {/* Bus Cards/Table */}
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔄</div>
            <p style={{ fontSize: '18px', color: '#6c757d' }}>Loading buses...</p>
          </div>
        ) : filteredBuses.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>
              {searchTerm ? '🔍' : '🚌'}
            </div>
            <p style={{ fontSize: '18px', color: '#6c757d', margin: 0 }}>
              {searchTerm ? 
                `No buses found matching "${searchTerm}". Try adjusting your search terms.` : 
                'No buses found. Add some buses to get started.'
              }
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div style={{ display: window.innerWidth > 768 ? 'block' : 'none' }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#495057' }}>Bus Name</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#495057' }}>Bus Number</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#495057' }}>Destination</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#495057' }}>Arrival</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#495057' }}>Departure</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#495057' }}>Schedule</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#495057' }}>Status</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#495057' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBuses.map((bus, index) => (
                      <tr key={bus._id} style={{ 
                        borderBottom: '1px solid #e9ecef',
                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa'
                      }}>
                        <td style={{ padding: '16px', fontWeight: '500' }}>{bus.busName}</td>
                        <td style={{ padding: '16px', color: '#6c757d' }}>{bus.busNumber}</td>
                        <td style={{ padding: '16px', color: '#6c757d' }}>{bus.destination}</td>
                        <td style={{ padding: '16px', color: '#6c757d' }}>{formatTime(bus.arrivalTimeToPerdoor)}</td>
                        <td style={{ padding: '16px', color: '#6c757d' }}>{formatTime(bus.leavingTimeFromPerdoor)}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: bus.availability === 'daily' ? '#e3f2fd' : '#fff3e0',
                            color: bus.availability === 'daily' ? '#1976d2' : '#f57c00'
                          }}>
                            {bus.availability === 'daily' ? 'Daily' : 'Weekdays'}
                          </span>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: bus.active ? '#e8f5e8' : '#ffebee',
                            color: bus.active ? '#2e7d32' : '#c62828'
                          }}>
                            {bus.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              onClick={() => handleEdit(bus)} 
                              style={{
                                padding: '6px 12px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                fontWeight: '500'
                              }}
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(bus._id)} 
                              style={{
                                padding: '6px 12px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                fontWeight: '500'
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div style={{ 
              display: window.innerWidth <= 768 ? 'grid' : 'none',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {filteredBuses.map((bus) => (
                <div key={bus._id} style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ 
                      margin: '0 0 5px 0', 
                      color: '#2c3e50',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}>
                      🚌 {bus.busName}
                    </h3>
                    <p style={{ 
                      margin: '0', 
                      color: '#6c757d',
                      fontSize: '14px'
                    }}>
                      {bus.busNumber}
                    </p>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{ fontSize: '16px', marginRight: '8px' }}>📍</span>
                      <span style={{ fontWeight: '500', color: '#495057' }}>
                        {bus.destination}
                      </span>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <div>
                        <span style={{ fontSize: '14px', color: '#6c757d' }}>Arrival:</span>
                        <br />
                        <span style={{ fontWeight: '500' }}>
                          {formatTime(bus.arrivalTimeToPerdoor)}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontSize: '14px', color: '#6c757d' }}>Departure:</span>
                        <br />
                        <span style={{ fontWeight: '500' }}>
                          {formatTime(bus.leavingTimeFromPerdoor)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: bus.availability === 'daily' ? '#e3f2fd' : '#fff3e0',
                      color: bus.availability === 'daily' ? '#1976d2' : '#f57c00'
                    }}>
                      {bus.availability === 'daily' ? 'Daily' : 'Weekdays'}
                    </span>
                    
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: bus.active ? '#e8f5e8' : '#ffebee',
                      color: bus.active ? '#2e7d32' : '#c62828'
                    }}>
                      {bus.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    gap: '10px',
                    justifyContent: 'stretch'
                  }}>
                    <button 
                      onClick={() => handleEdit(bus)} 
                      style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(bus._id)} 
                      style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modal */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              {/* Modal Header */}
              <div style={{
                padding: '20px 24px',
                borderBottom: '1px solid #e9ecef',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px 12px 0 0'
              }}>
                <h2 style={{ 
                  margin: 0, 
                  color: '#2c3e50',
                  fontSize: '20px',
                  fontWeight: '600'
                }}>
                  {editingBus ? '✏️ Edit Bus' : '➕ Add New Bus'}
                </h2>
                <button 
                  onClick={handleCloseModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#6c757d',
                    padding: '0',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#e9ecef'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  ×
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
                <div style={{ display: 'grid', gap: '20px' }}>
                  {/* Bus Name */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#495057',
                      fontSize: '14px'
                    }}>
                      🚌 Bus Name *
                    </label>
                    <input
                      type="text"
                      name="busName"
                      value={formData.busName}
                      onChange={handleInputChange}
                      placeholder="Enter bus name"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: errors.busName ? '2px solid #dc3545' : '2px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '16px',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => !errors.busName && (e.target.style.borderColor = '#007bff')}
                      onBlur={(e) => !errors.busName && (e.target.style.borderColor = '#e9ecef')}
                    />
                    {errors.busName && (
                      <div style={{
                        color: '#dc3545',
                        fontSize: '12px',
                        marginTop: '5px',
                        fontWeight: '500'
                      }}>
                        ⚠️ {errors.busName}
                      </div>
                    )}
                  </div>

                  {/* Bus Number */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#495057',
                      fontSize: '14px'
                    }}>
                      🔢 Bus Number *
                    </label>
                    <input
                      type="text"
                      name="busNumber"
                      value={formData.busNumber}
                      onChange={handleInputChange}
                      placeholder="Enter bus number"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: errors.busNumber ? '2px solid #dc3545' : '2px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '16px',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => !errors.busNumber && (e.target.style.borderColor = '#007bff')}
                      onBlur={(e) => !errors.busNumber && (e.target.style.borderColor = '#e9ecef')}
                    />
                    {errors.busNumber && (
                      <div style={{
                        color: '#dc3545',
                        fontSize: '12px',
                        marginTop: '5px',
                        fontWeight: '500'
                      }}>
                        ⚠️ {errors.busNumber}
                      </div>
                    )}
                  </div>

                  {/* Destination */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#495057',
                      fontSize: '14px'
                    }}>
                      📍 Destination *
                    </label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder="Enter destination"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: errors.destination ? '2px solid #dc3545' : '2px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '16px',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => !errors.destination && (e.target.style.borderColor = '#007bff')}
                      onBlur={(e) => !errors.destination && (e.target.style.borderColor = '#e9ecef')}
                    />
                    {errors.destination && (
                      <div style={{
                        color: '#dc3545',
                        fontSize: '12px',
                        marginTop: '5px',
                        fontWeight: '500'
                      }}>
                        ⚠️ {errors.destination}
                      </div>
                    )}
                  </div>

                  {/* Time Fields */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '15px' 
                  }}>
                    {/* Arrival Time */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#495057',
                        fontSize: '14px'
                      }}>
                        ⏰ Arrival Time *
                      </label>
                      <input
                        type="time"
                        name="arrivalTimeToPerdoor"
                        value={formData.arrivalTimeToPerdoor}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: errors.arrivalTimeToPerdoor ? '2px solid #dc3545' : '2px solid #e9ecef',
                          borderRadius: '8px',
                          fontSize: '16px',
                          transition: 'border-color 0.2s',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => !errors.arrivalTimeToPerdoor && (e.target.style.borderColor = '#007bff')}
                        onBlur={(e) => !errors.arrivalTimeToPerdoor && (e.target.style.borderColor = '#e9ecef')}
                      />
                      {errors.arrivalTimeToPerdoor && (
                        <div style={{
                          color: '#dc3545',
                          fontSize: '12px',
                          marginTop: '5px',
                          fontWeight: '500'
                        }}>
                          ⚠️ {errors.arrivalTimeToPerdoor}
                        </div>
                      )}
                    </div>

                    {/* Departure Time */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#495057',
                        fontSize: '14px'
                      }}>
                        🚀 Departure Time *
                      </label>
                      <input
                        type="time"
                        name="leavingTimeFromPerdoor"
                        value={formData.leavingTimeFromPerdoor}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: errors.leavingTimeFromPerdoor ? '2px solid #dc3545' : '2px solid #e9ecef',
                          borderRadius: '8px',
                          fontSize: '16px',
                          transition: 'border-color 0.2s',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => !errors.leavingTimeFromPerdoor && (e.target.style.borderColor = '#007bff')}
                        onBlur={(e) => !errors.leavingTimeFromPerdoor && (e.target.style.borderColor = '#e9ecef')}
                      />
                      {errors.leavingTimeFromPerdoor && (
                        <div style={{
                          color: '#dc3545',
                          fontSize: '12px',
                          marginTop: '5px',
                          fontWeight: '500'
                        }}>
                          ⚠️ {errors.leavingTimeFromPerdoor}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#495057',
                      fontSize: '14px'
                    }}>
                      📅 Availability
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '16px',
                        backgroundColor: 'white',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekdays">Weekdays Only</option>
                    </select>
                  </div>

                  {/* Active Status */}
                  <div>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#495057'
                    }}>
                      <input
                        type="checkbox"
                        name="active"
                        checked={formData.active}
                        onChange={handleInputChange}
                        style={{
                          marginRight: '12px',
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer'
                        }}
                      />
                      ✅ Active
                    </label>
                  </div>
                </div>

                {/* Modal Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '12px',
                  marginTop: '30px',
                  paddingTop: '20px',
                  borderTop: '1px solid #e9ecef'
                }}>
                  <button 
                    type="button" 
                    onClick={handleCloseModal}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: loading ? '#6c757d' : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      minWidth: '120px'
                    }}
                    onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#218838')}
                    onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#28a745')}
                  >
                    {loading ? '⏳ Saving...' : editingBus ? '💾 Update Bus' : '➕ Add Bus'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
