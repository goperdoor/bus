import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Home = () => {
  const [destination, setDestination] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [buses, setBuses] = useState([]);
  const [allBuses, setAllBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDestinations();
    fetchAllBuses();
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/buses`);
      setAllBuses(response.data || []);
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

  // Group buses by destination and remove duplicates by bus name
  const groupBusesByDestination = () => {
    const grouped = {};
    
    allBuses.forEach(bus => {
      // Assuming bus has destinations array or destination field
      const busDestinations = bus.destinations || [bus.destination];
      
      busDestinations.forEach(dest => {
        if (!grouped[dest]) {
          grouped[dest] = [];
        }
        
        // Check if bus name already exists for this destination
        const existingBus = grouped[dest].find(existingBus => existingBus.busName === bus.busName);
        if (!existingBus) {
          grouped[dest].push({
            busName: bus.busName,
            busNumber: bus.busNumber
          });
        }
      });
    });
    
    return grouped;
  };

  const busGroups = groupBusesByDestination();

  return (
    <div className="home-container">
      <div className="header2" id='header2'>
        <h1> ಪೆರ್ಡೂರು ಬಸ್ ಸಮಯ</h1>
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
              <option value="" disabled> ಆಯ್ಕೆಮಾಡಿ</option>
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
            <h2> "{destination}" ಫಲಿತಾಂಶಗಳು</h2>
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

      {/* Destination Tables Section */}
      <div className="destination-tables-section">
        <h2>ಗಮ್ಯಸ್ಥಾನಗಳ ಪ್ರಕಾರ ಬಸ್‌ಗಳು</h2>
        
        {Object.keys(busGroups).length > 0 ? (
          <div className="tables-container">
            {Object.entries(busGroups).map(([destinationName, destinationBuses]) => (
              <div key={destinationName} className="destination-table-wrapper">
                <h3 className="destination-table-title">{destinationName}</h3>
                <table className="destination-table">
                  <thead>
                    <tr>
                      <th>ಬಸ್ ಸಂಖ್ಯೆ</th>
                      <th>ಬಸ್ ಹೆಸರು</th>
                    </tr>
                  </thead>
                  <tbody>
                    {destinationBuses.map((bus, index) => (
                      <tr key={`${destinationName}-${bus.busName}-${index}`}>
                        <td>{bus.busNumber}</td>
                        <td>{bus.busName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-buses-message">
            <p>ಬಸ್ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...</p>
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
