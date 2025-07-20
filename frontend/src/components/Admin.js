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
  
  // Sorting states
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

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

  // Sorting function
  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  // Get sorted buses
  const getSortedBuses = () => {
    if (!sortField) return buses;

    return [...buses].sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case 'busName':
          aValue = a.busName.toLowerCase();
          bValue = b.busName.toLowerCase();
          break;
        case 'destination':
          aValue = a.destination.toLowerCase();
          bValue = b.destination.toLowerCase();
          break;
        case 'arrivalTime':
          aValue = moment(a.arrivalTimeToPerdoor, 'HH:mm');
          bValue = moment(b.arrivalTimeToPerdoor, 'HH:mm');
          break;
        case 'departureTime':
          aValue = moment(a.leavingTimeFromPerdoor, 'HH:mm');
          bValue = moment(b.leavingTimeFromPerdoor, 'HH:mm');
          break;
        default:
          return 0;
      }

      if (sortField === 'arrivalTime' || sortField === 'departureTime') {
        // For time comparison
        if (aValue.isBefore(bValue)) return sortDirection === 'asc' ? -1 : 1;
        if (aValue.isAfter(bValue)) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      } else {
        // For string comparison
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      }
    });
  };

  // Get sort arrow icon
  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
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
        // Update bus
        await axios.put(`${process.env.REACT_APP_API_URL}/api/admin/buses/${editingBus._id}`, formData);
        setMessage('Bus updated successfully');
      } else {
        // Add new bus
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

  const sortedBuses = getSortedBuses();

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage bus information</p>
      </div>

      <div className="admin-actions">
        <button onClick={handleAddNew} className="btn btn-primary">Add New Bus</button>
        <Link to="/" className="btn btn-secondary">Back to Home</Link>
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
                <th 
                  onClick={() => handleSort('busName')} 
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  title="Click to sort by Bus Name"
                >
                  Bus Name {getSortIcon('busName')}
                </th>
                <th>Bus Number</th>
                <th 
                  onClick={() => handleSort('destination')} 
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  title="Click to sort by Destination"
                >
                  Destination {getSortIcon('destination')}
                </th>
                <th 
                  onClick={() => handleSort('arrivalTime')} 
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  title="Click to sort by Arrival Time"
                >
                  Arrival Time {getSortIcon('arrivalTime')}
                </th>
                <th 
                  onClick={() => handleSort('departureTime')} 
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  title="Click to sort by Departure Time"
                >
                  Departure Time {getSortIcon('departureTime')}
                </th>
                <th>Availability</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedBuses.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>
                    No buses found. Add some buses to get started.
                  </td>
                </tr>
              ) : (
                sortedBuses.map((bus) => (
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
                        <button onClick={() => handleEdit(bus)} className="btn btn-sm btn-primary">Edit</button>
                        <button onClick={() => handleDelete(bus._id)} className="btn btn-sm btn-danger">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Sort info display */}
      {sortField && (
        <div style={{ 
          marginTop: '10px', 
          padding: '8px 12px', 
          background: '#f8f9fa', 
          border: '1px solid #dee2e6', 
          borderRadius: '4px',
          fontSize: '14px',
          color: '#6c757d'
        }}>
          Sorted by: <strong>{sortField === 'busName' ? 'Bus Name' : 
                              sortField === 'destination' ? 'Destination' : 
                              sortField === 'arrivalTime' ? 'Arrival Time' : 
                              'Departure Time'}</strong> 
          ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
          <button 
            onClick={() => {setSortField(''); setSortDirection('asc');}} 
            style={{ marginLeft: '10px', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Clear Sort
          </button>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingBus ? 'Edit Bus' : 'Add New Bus'}</h2>
              <button onClick={handleCloseModal} className="close-btn">×</button>
            </div>

            <form onSubmit={handleSubmit}>
              {['busName', 'busNumber', 'destination'].map((field) => (
                <div className="form-group" key={field}>
                  <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')} *</label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                  />
                  {errors[field] && <div className="error-message">{errors[field]}</div>}
                </div>
              ))}

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
                  />
                  Active
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-success" disabled={loading}>
                  {loading ? 'Saving...' : editingBus ? 'Update Bus' : 'Add Bus'}
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
