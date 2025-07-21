import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

function HomePage() {

  const [selectedDate, setSelectedDate] = useState('');
  const [destination, setDestination] = useState('');
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true); // NEW

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    setLoadingDestinations(true); // NEW
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/destinations`);
      setDestinations(response.data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoadingDestinations(false); // NEW
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/buses?destination=${destination}&date=${selectedDate}`
      );
      setBusData(response.data);
    } catch (error) {
      console.error('Error fetching bus data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Search Bus</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="destination">Destination</label>

          {/* NEW: Loading message while destinations are fetched */}
          {loadingDestinations && (
            <p style={{ color: '#555', marginBottom: '8px' }}>
              Loading the database, please wait...
            </p>
          )}

          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            disabled={loadingDestinations} // Disable until data is ready
          >
            <option value="">Select a destination</option>
            {destinations.map((dest, index) => (
              <option key={index} value={dest}>
                {dest}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading || loadingDestinations}>
          {loading ? 'Loading...' : 'Search Bus'}
        </button>
      </form>

      {busData.length > 0 && (
        <div className="results">
          <h3>Bus Data</h3>
          <ul>
            {busData.map((bus, index) => (
              <li key={index}>
                <strong>Time:</strong> {bus.time} | <strong>Bus No:</strong> {bus.busNo}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}




export default HomePage;
