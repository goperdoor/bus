import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Home = () => {
  const [destination, setDestination] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [buses, setBuses] = useState([]);
  const [allBuses, setAllBuses] = useState([]); // For destination tables
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDestinations();
    fetchAllBuses(); // Fetch all buses for tables
    window.scrollTo(0, 0);
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/destinations`);
      setDestinations(response.data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  const fetchAllBuses = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/buses`);
      // Filter only active buses
      const activeBuses = response.data.filter(bus => bus.active);
      setAllBuses(activeBuses);
    } catch (error) {
      console.error('Error fetching all buses:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!destination.trim()) return;

    setLoading(true);
    setSearched(true);
    setMessage('');

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/buses/search?destination=${destination}`);
      setBuses(response.data.buses || []);
      setMessage(response.data.message || '');
    } catch (error) {
      console.error('Error searching buses:', error);
      setMessage('Error searching for buses. Please try again.');
      setBuses([]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    return moment(time, 'HH:mm').format('h:mm A');
  };

  const getMinutesText = (minutes) => {
    if (minutes < 0) return 'Tomorrow';
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours}ಗಂಟೆ ${remainingMinutes}ನಿಮಿಷ`;
  };

  // Group buses by destination and remove duplicates
  const getGroupedBuses = () => {
    const grouped = {};
    
    allBuses.forEach(bus => {
      if (!grouped[bus.destination]) {
        grouped[bus.destination] = [];
      }
      
      // Check if bus name already exists for this destination
      const existingBus = grouped[bus.destination].find(b => b.busName === bus.busName);
      if (!existingBus) {
        grouped[bus.destination].push({
          busName: bus.busName,
          busNumber: bus.busNumber,
          arrivalTime: bus.arrivalTimeToPerdoor,
          departureTime: bus.leavingTimeFromPerdoor,
          availability: bus.availability
        });
      }
    });

    // Sort buses within each destination by bus name
    Object.keys(grouped).forEach(dest => {
      grouped[dest].sort((a, b) => a.busName.localeCompare(b.busName));
    });

    return grouped;
  };

  const groupedBuses = getGroupedBuses();

  return (
    <div className="home-container">
      <div className="header2" id='header2'>
        <h1>ಪೆರ್ಡೂರು ಬಸ್ ಸಮಯ</h1>
        <p>ನಿಮ್ಮ ಬಸ್ ಸಮಯವನ್ನು ಸುಲಭವಾಗಿ ಹುಡುಕಿ</p>
      </div>

      <div className="search-section" id='search-section'>
        <form onSubmit={handleSearch} className="search-form">
          <div className="input-group">
            <label htmlFor="destination">ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?</label>
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            >
              <option value="" disabled>ಆಯ್ಕೆಮಾಡಿ</option>
              {destinations.map((dest, index) => (
                <option key={index} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...' : 'ಬಸ್ ಹುಡುಕಿ'}
          </button>
        </form>
      </div>

      {searched && (
        <div className="results-section">
          <div className="results-header">
            <h2>"{destination}" ಫಲಿತಾಂಶಗಳು</h2>
          </div>

          {message && buses.length === 0 && (
            <div className="no-results">
              <p>{message}</p>
            </div>
          )}

          {buses.length > 0 && (
            <div className="bus-results">
              {buses.map((bus) => (
                <div key={bus._id} className="bus-card">
                  <div className="bus-header">
                    <div className="bus-name">{bus.busName}</div>
                    <div className="bus-number">{bus.busNumber}</div>
                  </div>

                  <div className="bus-details">
                    <div className="detail-item">
                      <div className="detail-label">ಪೆರ್ಡೂರಿಗೆ ಆಗಮಿಸುವ ಸಮಯ</div>
                      <div className="detail-value">{formatTime(bus.arrivalTimeToPerdoor)}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">ಪೆರ್ಡೂರಿನಿಂದ ಹೊರಡುವ ಸಮಯ</div>
                      <div className="detail-value">{formatTime(bus.leavingTimeFromPerdoor)}</div>
                    </div>
                  </div>

                  <div className="next-departure">
                    <div className="next-departure-time">
                      <div className="minutes-left">
                        {getMinutesText(bus.minutesUntilDeparture)} ನಂತರ ಪೆರ್ಡೂರಿನಿಂದ ಹೊರಡುತ್ತದೆ
                      </div>
                    </div>
                  </div>

                  <div className="availability-badge-container">
                    <span className={`availability-badge availability-${bus.availability}`}>
                      {bus.availability === 'daily' ? 'ಪ್ರತಿದಿನ' : 'ಕೆವಲ ವಾರದ ದಿನಗಳಲ್ಲಿ'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bus Tables by Destination */}
      <div className="destination-tables-section" style={{ marginTop: '40px', padding: '20px 0' }}>
        <div className="tables-header" style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          borderBottom: '2px solid #ddd',
          paddingBottom: '20px'
        }}>
          <h2 style={{ 
            color: '#2c3e50', 
            fontSize: '28px', 
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            ಎಲ್ಲಾ ಗಮ್ಯಸ್ಥಾನಗಳಿಗೆ ಬಸ್ ವಿವರಗಳು
          </h2>
          <p style={{ color: '#6c757d', fontSize: '16px' }}>
            All Bus Details by Destinations
          </p>
        </div>

        {Object.keys(groupedBuses).length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            margin: '20px'
          }}>
            <p style={{ fontSize: '18px', color: '#6c757d' }}>
              ಯಾವುದೇ ಬಸ್ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ | No bus information available
            </p>
          </div>
        ) : (
          <div className="destination-tables" style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '30px',
            padding: '0 20px'
          }}>
            {Object.entries(groupedBuses).map(([dest, busList]) => (
              <div key={dest} className="destination-table-container" style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                border: '1px solid #e9ecef'
              }}>
                {/* Table Header */}
                <div style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ 
                    margin: '0',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}>
                    🚌 {dest}
                  </h3>
                  <p style={{ 
                    margin: '5px 0 0 0',
                    fontSize: '14px',
                    opacity: '0.9'
                  }}>
                    {busList.length} buses available
                  </p>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    fontSize: '14px'
                  }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th style={{ 
                          padding: '15px 12px',
                          textAlign: 'left',
                          fontWeight: '600',
                          color: '#495057',
                          borderBottom: '2px solid #dee2e6'
                        }}>
                          Bus Name
                        </th>
                        <th style={{ 
                          padding: '15px 12px',
                          textAlign: 'left',
                          fontWeight: '600',
                          color: '#495057',
                          borderBottom: '2px solid #dee2e6'
                        }}>
                          Bus Number
                        </th>
                        <th style={{ 
                          padding: '15px 12px',
                          textAlign: 'center',
                          fontWeight: '600',
                          color: '#495057',
                          borderBottom: '2px solid #dee2e6'
                        }}>
                          Arrival
                        </th>
                        <th style={{ 
                          padding: '15px 12px',
                          textAlign: 'center',
                          fontWeight: '600',
                          color: '#495057',
                          borderBottom: '2px solid #dee2e6'
                        }}>
                          Departure
                        </th>
                        <th style={{ 
                          padding: '15px 12px',
                          textAlign: 'center',
                          fontWeight: '600',
                          color: '#495057',
                          borderBottom: '2px solid #dee2e6'
                        }}>
                          Schedule
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {busList.map((bus, index) => (
                        <tr key={`${bus.busName}-${bus.busNumber}`} style={{
                          backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.closest('tr').style.backgroundColor = '#e3f2fd'}
                        onMouseLeave={(e) => e.target.closest('tr').style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f8f9fa'}
                        >
                          <td style={{ 
                            padding: '15px 12px',
                            fontWeight: '500',
                            color: '#2c3e50'
                          }}>
                            {bus.busName}
                          </td>
                          <td style={{ 
                            padding: '15px 12px',
                            color: '#6c757d',
                            fontWeight: '500'
                          }}>
                            {bus.busNumber}
                          </td>
                          <td style={{ 
                            padding: '15px 12px',
                            textAlign: 'center',
                            color: '#28a745',
                            fontWeight: '600'
                          }}>
                            {formatTime(bus.arrivalTime)}
                          </td>
                          <td style={{ 
                            padding: '15px 12px',
                            textAlign: 'center',
                            color: '#dc3545',
                            fontWeight: '600'
                          }}>
                            {formatTime(bus.departureTime)}
                          </td>
                          <td style={{ 
                            padding: '15px 12px',
                            textAlign: 'center'
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <Link to="/admin" className="admin-link">
        Admin Panel
      </Link> */}
    </div>
  );
};

export default Home;
