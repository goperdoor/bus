import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Home = () => {
  const [destination, setDestination] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/destinations`);
      setDestinations(response.data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
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
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>🚌 Perdoor Bus Timing</h1>
        <p>Find your bus timings easily</p>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="input-group">
            <label htmlFor="destination">Enter Destination:</label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Kochi, Thrissur, Palakkad..."
              list="destinations"
              required
            />
            <datalist id="destinations">
              {destinations.map((dest, index) => (
                <option key={index} value={dest} />
              ))}
            </datalist>
          </div>
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search Buses'}
          </button>
        </form>
      </div>

      {searched && (
        <div className="results-section">
          <div className="results-header">
            <h2>Results for "{destination}"</h2>
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
                      <div className="detail-label">Arrival to Perdoor</div>
                      <div className="detail-value">{formatTime(bus.arrivalTimeToPerdoor)}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Departure from Perdoor</div>
                      <div className="detail-value">{formatTime(bus.leavingTimeFromPerdoor)}</div>
                    </div>
                  </div>

                  <div className="next-departure">
                    <div className="next-departure-time">
                      Next Departure: {formatTime(bus.nextDeparture)}
                    </div>
                    <div className="minutes-left">
                      {getMinutesText(bus.minutesUntilDeparture)}
                    </div>
                  </div>

                  <div className="availability-badge-container">
                    <span className={`availability-badge availability-${bus.availability}`}>
                      {bus.availability === 'daily' ? 'Daily Service' : 'Weekdays Only'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Link to="/admin" className="admin-link">
        Admin Panel
      </Link>
    </div>
  );
};

export default Home;
