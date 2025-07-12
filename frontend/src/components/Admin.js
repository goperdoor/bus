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

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/buses');
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
      setMessage('Error fetching buses');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
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
    
    // Validate time format
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
        await axios.put(`/api/admin/buses/${editingBus._id}`, formData);
        setMessage('Bus updated successfully');
      } else {
        await axios.post('/api/admin/buses', formData);
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
      await axios.delete(`/api/admin/buses/${busId}`);
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

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage bus information</p>
      </div>

      <div className="admin-actions">
        <button onClick={handleAddNew} className="btn btn-primary">
          Add New Bus
        </button>
        <Link to="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>

      {message && (
        <div className="alert" style={{ 
          background: message.includes('Error') ? '#f8d7da' : '#d4edda',
          color: message.includes('Error') ? '#721c24' : '#155724',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      <div className="bus-table">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading...</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Bus Name</th>
                <th>Bus Number</th>
                <th>Destination</th>
                <th>Arrival Time</th>
                <th>Departure Time</th>
                <th>Availability</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>
                    No buses found. Add some buses to get started.
                  </td>
                </tr>
              ) : (
                buses.map((bus) => (
                  <tr key={bus._id}>
                    <td>{bus.busName}</td>
                    <td>{bus.busNumber}</td>
                    <td>{bus.destination}</td>
                    <td>{formatTime(bus.arrivalTimeToPerdoor)}</td>
                    <td>{formatTime(bus.leavingTimeFromPerdoor)}</td>
                    <td>
                      <span className={`availability-badge availability-${bus.availability}`}>
                        {bus.availability === 'daily' ? 'Daily' : 'Weekdays'}
                      </span>
                    </td>
                    <td>
                      <span className={bus.active ? 'status-active' : 'status-inactive'}>
                        {bus.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleEdit(bus)}
                          className="btn btn-sm btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(bus._id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingBus ? 'Edit Bus' : 'Add New Bus'}
              </h2>
              <button onClick={handleCloseModal} className="close-btn">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="busName">Bus Name *</label>
                <input
                  type="text"
                  id="busName"
                  name="busName"
                  value={formData.busName}
                  onChange={handleInputChange}
                  placeholder="e.g., Kerala RTC, Private Bus"
                  required
                />
                {errors.busName && <div className="error-message">{errors.busName}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="busNumber">Bus Number *</label>
                <input
                  type="text"
                  id="busNumber"
                  name="busNumber"
                  value={formData.busNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., KL-07-1234"
                  required
                />
                {errors.busNumber && <div className="error-message">{errors.busNumber}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="destination">Destination *</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="e.g., Kochi, Thrissur, Palakkad"
                  required
                />
                {errors.destination && <div className="error-message">{errors.destination}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="arrivalTimeToPerdoor">Arrival Time to Perdoor *</label>
                <input
                  type="time"
                  id="arrivalTimeToPerdoor"
                  name="arrivalTimeToPerdoor"
                  value={formData.arrivalTimeToPerdoor}
                  onChange={handleInputChange}
                  required
                />
                {errors.arrivalTimeToPerdoor && <div className="error-message">{errors.arrivalTimeToPerdoor}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="leavingTimeFromPerdoor">Departure Time from Perdoor *</label>
                <input
                  type="time"
                  id="leavingTimeFromPerdoor"
                  name="leavingTimeFromPerdoor"
                  value={formData.leavingTimeFromPerdoor}
                  onChange={handleInputChange}
                  required
                />
                {errors.leavingTimeFromPerdoor && <div className="error-message">{errors.leavingTimeFromPerdoor}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="availability">Availability</label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  required
                >
                  <option value="daily">Daily</option>
                  <option value="weekdays">Weekdays Only</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                    style={{ marginRight: '8px' }}
                  />
                  Active
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-success" disabled={loading}>
                  {loading ? 'Saving...' : (editingBus ? 'Update Bus' : 'Add Bus')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;