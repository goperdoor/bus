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

  const styles = {
    homeContainer: {
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '0',
      margin: '0'
    },
    header2: {
      textAlign: 'center',
      padding: '20px 15px',
      backgroundColor: '#007bff',
      color: 'white',
      marginBottom: '20px',
      '@media (min-width: 768px)': {
        padding: '40px 20px'
      }
    },
    searchSection: {
      padding: '0 15px',
      marginBottom: '30px',
      '@media (min-width: 768px)': {
        padding: '0 20px'
      }
    },
    searchForm: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      maxWidth: '500px',
      margin: '0 auto'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#495057'
    },
    select: {
      width: '100%',
      padding: '12px',
      border: '2px solid #e9ecef',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: 'white',
      outline: 'none',
      transition: 'border-color 0.3s'
    },
    searchBtn: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    resultsSection: {
      padding: '0 15px',
      marginBottom: '40px',
      '@media (min-width: 768px)': {
        padding: '0 20px'
      }
    },
    busResults: {
      display: 'grid',
      gap: '15px',
      '@media (min-width: 768px)': {
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px'
      }
    },
    busCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef'
    },
    destinationTablesSection: {
      marginTop: '40px',
      padding: '20px 15px',
      '@media (min-width: 768px)': {
        padding: '20px'
      }
    },
    tablesHeader: {
      textAlign: 'center',
      marginBottom: '30px',
      borderBottom: '2px solid #ddd',
      paddingBottom: '20px'
    },
    destinationTables: {
      display: 'grid',
      gap: '20px',
      '@media (min-width: 576px)': {
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '25px'
      },
      '@media (min-width: 992px)': {
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '30px'
      }
    },
    destinationTableContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      border: '1px solid #e9ecef'
    },
    tableHeader: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '15px',
      textAlign: 'center',
      '@media (min-width: 768px)': {
        padding: '20px'
      }
    },
    tableWrapper: {
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '13px',
      '@media (min-width: 576px)': {
        fontSize: '14px'
      }
    },
    th: {
      padding: '12px 8px',
      textAlign: 'left',
      fontWeight: '600',
      color: '#495057',
      borderBottom: '2px solid #dee2e6',
      backgroundColor: '#f8f9fa',
      '@media (min-width: 576px)': {
        padding: '15px 12px'
      }
    },
    thCenter: {
      textAlign: 'center'
    },
    td: {
      padding: '12px 8px',
      '@media (min-width: 576px)': {
        padding: '15px 12px'
      }
    },
    tdCenter: {
      textAlign: 'center'
    },
    scheduleBadge: {
      padding: '4px 8px',
      borderRadius: '15px',
      fontSize: '11px',
      fontWeight: '600',
      '@media (min-width: 576px)': {
        padding: '6px 12px',
        fontSize: '12px',
        borderRadius: '20px'
      }
    }
  };

  return (
    <div style={styles.homeContainer} className="home-container">
      <div style={styles.header2} className="header2" id='header2'>
        <h1 style={{ margin: '0 0 10px 0', fontSize: 'clamp(24px, 5vw, 32px)' }}>
          ಪೆರ್ಡೂರು ಬಸ್ ಸಮಯ
        </h1>
        <p style={{ margin: '0', fontSize: 'clamp(14px, 3vw, 16px)' }}>
          ನಿಮ್ಮ ಬಸ್ ಸಮಯವನ್ನು ಸುಲಭವಾಗಿ ಹುಡುಕಿ
        </p>
      </div>

      <div style={styles.searchSection} className="search-section" id='search-section'>
        <form onSubmit={handleSearch} style={styles.searchForm} className="search-form">
          <div style={styles.inputGroup} className="input-group">
            <label htmlFor="destination" style={styles.label}>
              ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?
            </label>
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              style={styles.select}
            >
              <option value="" disabled>ಆಯ್ಕೆಮಾಡಿ</option>
              {destinations.map((dest, index) => (
                <option key={index} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>
          <button 
            type="submit" 
            style={{
              ...styles.searchBtn,
              backgroundColor: loading ? '#6c757d' : '#007bff',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            disabled={loading}
          >
            {loading ? 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...' : 'ಬಸ್ ಹುಡುಕಿ'}
          </button>
        </form>
      </div>

      {searched && (
        <div style={styles.resultsSection} className="results-section">
          <div className="results-header">
            <h2 style={{ 
              textAlign: 'center', 
              marginBottom: '20px',
              fontSize: 'clamp(20px, 4vw, 24px)',
              color: '#2c3e50'
            }}>
              "{destination}" ಫಲಿತಾಂಶಗಳು
            </h2>
          </div>

          {message && buses.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '30px 20px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <p style={{ fontSize: '16px', color: '#6c757d' }}>{message}</p>
            </div>
          )}

          {buses.length > 0 && (
            <div style={styles.busResults} className="bus-results">
              {buses.map((bus) => (
                <div key={bus._id} style={styles.busCard} className="bus-card">
                  <div className="bus-header" style={{ marginBottom: '15px' }}>
                    <div style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold', 
                      color: '#2c3e50',
                      marginBottom: '5px'
                    }}>
                      {bus.busName}
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#6c757d',
                      fontWeight: '500'
                    }}>
                      {bus.busNumber}
                    </div>
                  </div>

                  <div className="bus-details" style={{ marginBottom: '15px' }}>
                    <div style={{ 
                      display: 'grid', 
                      gap: '10px',
                      gridTemplateColumns: '1fr',
                      '@media (min-width: 576px)': {
                        gridTemplateColumns: '1fr 1fr'
                      }
                    }}>
                      <div className="detail-item">
                        <div style={{ 
                          fontSize: '12px', 
                          color: '#6c757d', 
                          marginBottom: '5px' 
                        }}>
                          ಪೆರ್ಡೂರಿಗೆ ಆಗಮಿಸುವ ಸಮಯ
                        </div>
                        <div style={{ 
                          fontSize: '16px', 
                          fontWeight: '600', 
                          color: '#28a745' 
                        }}>
                          {formatTime(bus.arrivalTimeToPerdoor)}
                        </div>
                      </div>
                      <div className="detail-item">
                        <div style={{ 
                          fontSize: '12px', 
                          color: '#6c757d', 
                          marginBottom: '5px' 
                        }}>
                          ಪೆರ್ಡೂರಿನಿಂದ ಹೊರಡುವ ಸಮಯ
                        </div>
                        <div style={{ 
                          fontSize: '16px', 
                          fontWeight: '600', 
                          color: '#dc3545' 
                        }}>
                          {formatTime(bus.leavingTimeFromPerdoor)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="next-departure" style={{ 
                    backgroundColor: '#f8f9fa', 
                    padding: '15px', 
                    borderRadius: '8px',
                    marginBottom: '15px'
                  }}>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#495057', 
                      textAlign: 'center',
                      fontWeight: '500'
                    }}>
                      {getMinutesText(bus.minutesUntilDeparture)} ನಂತರ ಪೆರ್ಡೂರಿನಿಂದ ಹೊರಡುತ್ತದೆ
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <span style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: bus.availability === 'daily' ? '#e3f2fd' : '#fff3e0',
                      color: bus.availability === 'daily' ? '#1976d2' : '#f57c00'
                    }}>
                      {bus.availability === 'daily' ? 'ಪ್ರತಿದಿನ' : 'ಕೆವಲ ವಾರದ ದಿನಗಳಲ್ಲಿ'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bus Tables by Destination - Mobile Responsive */}
      <div style={styles.destinationTablesSection} className="destination-tables-section">
        <div style={styles.tablesHeader} className="tables-header">
          <h2 style={{ 
            color: '#2c3e50', 
            fontSize: 'clamp(22px, 5vw, 28px)', 
            fontWeight: 'bold',
            marginBottom: '10px',
            margin: '0 0 10px 0'
          }}>
            ಎಲ್ಲಾ ಗಮ್ಯಸ್ಥಾನಗಳಿಗೆ ಬಸ್ ವಿವರಗಳು
          </h2>
          <p style={{ 
            color: '#6c757d', 
            fontSize: 'clamp(14px, 3vw, 16px)',
            margin: '0'
          }}>
            All Bus Details by Destinations
          </p>
        </div>

        {Object.keys(groupedBuses).length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            margin: '0 auto',
            maxWidth: '500px'
          }}>
            <p style={{ 
              fontSize: 'clamp(16px, 4vw, 18px)', 
              color: '#6c757d',
              margin: '0'
            }}>
              ಯಾವುದೇ ಬಸ್ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ | No bus information available
            </p>
          </div>
        ) : (
          <div style={styles.destinationTables} className="destination-tables">
            {Object.entries(groupedBuses).map(([dest, busList]) => (
              <div key={dest} style={styles.destinationTableContainer}>
                {/* Table Header */}
                <div style={styles.tableHeader}>
                  <h3 style={{ 
                    margin: '0',
                    fontSize: 'clamp(16px, 4vw, 20px)',
                    fontWeight: 'bold'
                  }}>
                    🚌 {dest}
                  </h3>
                  <p style={{ 
                    margin: '5px 0 0 0',
                    fontSize: 'clamp(12px, 3vw, 14px)',
                    opacity: '0.9'
                  }}>
                    {busList.length} buses available
                  </p>
                </div>

                {/* Table */}
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th style={{
                          ...styles.th,
                          minWidth: '120px'
                        }}>
                          Bus Name
                        </th>
                        <th style={{
                          ...styles.th,
                          minWidth: '100px'
                        }}>
                          Bus Number
                        </th>
                        <th style={{
                          ...styles.th,
                          ...styles.thCenter,
                          minWidth: '80px'
                        }}>
                          Schedule
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {busList.map((bus, index) => (
                        <tr key={`${bus.busName}-${bus.busNumber}`} style={{
                          backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa'
                        }}>
                          <td style={{ 
                            ...styles.td,
                            fontWeight: '500',
                            color: '#2c3e50'
                          }}>
                            {bus.busName}
                          </td>
                          <td style={{ 
                            ...styles.td,
                            color: '#6c757d',
                            fontWeight: '500'
                          }}>
                            {bus.busNumber}
                          </td>
                          <td style={{ 
                            ...styles.td,
                            ...styles.tdCenter
                          }}>
                            <span style={{
                              ...styles.scheduleBadge,
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
