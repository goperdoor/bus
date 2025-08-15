import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import FluidCustomAd from '../ads/FluidCustomAd';

const Home = () => {
  const [destination, setDestination] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [buses, setBuses] = useState([]);
    const [allBuses, setAllBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState('');

  const [visibleSections, setVisibleSections] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    fetchDestinations();
     fetchAllBuses(); // Fetch all buses for tables
     window.scrollTo(0, 0);
    setIsLoaded(true);
    const timer = setInterval(() => {
      setVisibleSections(prev => {
        if (prev.length < 6) {
          return [...prev, prev.length];
        }
        return prev;
      });
    }, 200);

    return () => clearInterval(timer);
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
    },
    destinationTableContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      border: '1px solid #e9ecef'
    },
    tableHeader: {
      backgroundImage: 'linear-gradient(135deg, #485eff 0%, #a955ff 100%)',
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
    },
   mainContainer: {
   
      minHeight: '100vh',
      padding: '20px 0px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      lineHeight: '1.6',
      color: '#2c3e50',
      position: 'relative',
      overflow: 'hidden'
    },
    floatingShapes: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1
    },
    shape: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      animation: 'float 20s infinite ease-in-out'
    },
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '24px',
      padding: '30px 25px',
     
      backdropFilter: 'blur(20px)',
    
      position: 'relative',
      zIndex: 2,
      transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
      opacity: isLoaded ? 1 : 0,
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      padding: '30px 0',
      borderBottom: '3px solid transparent',
      backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #485eff 0%, #a955ff 50%, #ff6b9d 100%)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      position: 'relative',
      overflow: 'hidden'
    },
    headerGlow: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '200px',
      height: '200px',
      background: 'radial-gradient(circle, rgba(72, 94, 255, 0.1) 0%, transparent 70%)',
      transform: 'translate(-50%, -50%)',
      animation: 'pulse 4s ease-in-out infinite',
      borderRadius: '50%'
    },
    mainTitle: {
      fontSize: 'clamp(28px, 7vw, 40px)',
      fontWeight: '800',
      margin: '0 0 15px 0',
      background: 'linear-gradient(135deg, #485eff 0%, #a955ff 50%, #ff6b9d 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      position: 'relative',
      zIndex: 1,
      letterSpacing: '-0.5px',
      textShadow: '0 4px 20px rgba(72, 94, 255, 0.3)'
    },
    subtitle: {
      fontSize: 'clamp(16px, 4.5vw, 20px)',
      color: '#6c757d',
      margin: '0',
      fontWeight: '600',
      position: 'relative',
      zIndex: 1,
      opacity: '0.9'
    },
    section: {
      marginBottom: '45px',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    sectionVisible: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    sectionTitle: {
      fontSize: 'clamp(22px, 5.5vw, 28px)',
      fontWeight: '800',
      marginBottom: '25px',
      color: '#2c3e50',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      position: 'relative'
    },
    sectionTitleIcon: {
      fontSize: '1.2em',
      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
      animation: 'bounce 2s ease-in-out infinite'
    },
    sectionContent: {
      fontSize: 'clamp(15px, 4vw, 17px)',
      lineHeight: '1.8',
      color: '#495057',
      marginBottom: '25px',
      background: 'rgba(255, 255, 255, 0.6)',
      padding: '20px',
      borderRadius: '16px',
      border: '1px solid rgba(116, 139, 255, 0.1)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
    },
    benefitsList: {
      display: 'grid',
      gap: '20px',
      marginTop: '25px'
    },
    benefitItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '15px',
      padding: '20px',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
      borderRadius: '18px',
      border: '1px solid rgba(116, 139, 255, 0.2)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    benefitItemHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.12)',
      borderColor: 'rgba(72, 94, 255, 0.3)'
    },
    benefitIcon: {
      fontSize: '24px',
      marginTop: '2px',
      flexShrink: 0,
      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
      animation: 'float 3s ease-in-out infinite'
    },
    benefitContent: {
      flex: 1
    },
    benefitTitle: {
      fontSize: 'clamp(16px, 4.5vw, 19px)',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '8px',
      lineHeight: '1.3'
    },
    benefitDescription: {
      fontSize: 'clamp(14px, 3.8vw, 16px)',
      color: '#6c757d',
      lineHeight: '1.6'
    },
    navigationList: {
      display: 'grid',
      gap: '15px',
      marginTop: '20px'
    },
    navigationItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '18px 20px',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 255, 0.9) 100%)',
      borderRadius: '14px',
      border: '1px solid rgba(116, 139, 255, 0.15)',
      fontSize: 'clamp(14px, 3.8vw, 16px)',
      color: '#495057',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
    },
    navigationItemHover: {
      transform: 'translateX(8px)',
      backgroundColor: 'rgba(72, 94, 255, 0.05)',
      borderColor: 'rgba(72, 94, 255, 0.25)'
    },
    featureGrid: {
      display: 'grid',
      gap: '20px',
      marginTop: '25px'
    },
    featureCard: {
      padding: '25px',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
      borderRadius: '20px',
      border: '1px solid rgba(116, 139, 255, 0.2)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    featureCardHover: {
      transform: 'translateY(-6px) scale(1.02)',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
      borderColor: 'rgba(72, 94, 255, 0.4)'
    },
    featureTitle: {
      fontSize: 'clamp(16px, 4.5vw, 19px)',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    featureIcon: {
      fontSize: '20px',
      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
    },
    featureDescription: {
      fontSize: 'clamp(14px, 3.8vw, 16px)',
      color: '#6c757d',
      lineHeight: '1.6'
    },
    faqSection: {
      marginTop: '40px'
    },
    faqItem: {
      marginBottom: '25px',
      padding: '25px',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 255, 0.8) 100%)',
      borderRadius: '18px',
      border: '1px solid rgba(116, 139, 255, 0.2)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      boxShadow: '0 6px 25px rgba(0, 0, 0, 0.06)'
    },
    faqItemHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 35px rgba(0, 0, 0, 0.1)',
      borderColor: 'rgba(72, 94, 255, 0.3)'
    },
    faqQuestion: {
      fontSize: 'clamp(15px, 4.2vw, 18px)',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '12px',
      lineHeight: '1.4',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    faqAnswer: {
      fontSize: 'clamp(14px, 3.8vw, 16px)',
      color: '#6c757d',
      lineHeight: '1.7'
    },
    divider: {
      height: '3px',
      background: 'linear-gradient(90deg, transparent 0%, rgba(72, 94, 255, 0.4) 25%, rgba(169, 85, 255, 0.4) 50%, rgba(255, 107, 157, 0.4) 75%, transparent 100%)',
      border: 'none',
      margin: '40px 0',
      borderRadius: '2px',
      position: 'relative'
    },
    dividerGlow: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '100px',
      height: '100px',
      background: 'radial-gradient(circle, rgba(72, 94, 255, 0.1) 0%, transparent 70%)',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      animation: 'pulse 3s ease-in-out infinite'
    }
};




  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(2deg); }
        50% { transform: translateY(-20px) rotate(0deg); }
        75% { transform: translateY(-10px) rotate(-2deg); }
      }
      
      @keyframes bounce {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
        50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
      }
      
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
    `;
    document.head.appendChild(style);
    
    return () => document.head.removeChild(style);
  }, []);

  const benefits = [
    {
      icon: '📆',
      title: 'Up-to-Date Bus Timings',
      description: 'Find accurate schedules from Perdoor to Udupi, Manipal, Kukkikatte, KG Road, Ajekar, Hebri, and other nearby places.'
    },
    {
      icon: '🚖',
      title: 'Rickshaw and Tourist Bus Info',
      description: 'Go beyond buses — explore pages dedicated to local auto rickshaw options, shared rides, and tourist buses available for nearby temple visits or group trips.'
    },
    {
      icon: '🛕',
      title: 'Explore Perdoor',
      description: 'Discover cultural spots, temples, and unique places through our detailed "Explore Perdoor" section.'
    },
    {
      icon: '📱',
      title: 'PWA Support (Install as an App)',
      description: 'GoPerdoor works like a mobile app — simply install it from your browser and access it anytime, even without visiting the website again.'
    },
    {
      icon: '🔒',
      title: 'Privacy-First',
      description: 'No login needed, no tracking. Just useful travel information, ready when you are.'
    }
  ];

  const navigationSteps = [
    { step: '1.', text: 'Homepage – See what GoPerdoor offers and access main sections.' },
    { step: '2.', text: 'Bus Timings – Select your destination to view current bus schedules.' },
    { step: '3.', text: 'Rickshaw & Tourist Bus Info – Know your options for last-mile travel and sightseeing.' },
    { step: '4.', text: 'Explore Perdoor – Learn about famous temples and places to visit.' },
    { step: '5.', text: 'Temple History – Dive into the history of local temples and cultural heritage.' },
    { step: '6.', text: 'About Us / Contact – Connect with the team or share suggestions.' }
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Fast & Lightweight',
      description: 'Optimized for quick loading even on low networks.'
    },
    {
      icon: '📱',
      title: 'Installable Web App (PWA)',
      description: 'Add GoPerdoor to your home screen and use it like a native app. Instant access with no need to open a browser.'
    },
    {
      icon: '🧑‍💻',
      title: 'Created by Local Developers',
      description: 'Made by the people of Perdoor, for the people of Perdoor.'
    },
    {
      icon: '🔁',
      title: 'Updated Regularly',
      description: 'We add new timings, routes, and services based on user feedback and local updates.'
    }
  ];

  const faqs = [
    {
      question: 'Is GoPerdoor officially connected to KSRTC or any travel agency?',
      answer: 'No, it\'s a community-built platform and not affiliated with government transport services. Information is collected from trusted local sources.'
    },
    {
      question: 'How do I install GoPerdoor as an app?',
      answer: 'Just visit goperdoor.tech on your mobile browser and tap "Add to Home Screen" to install.'
    },
    {
      question: 'Can I use GoPerdoor without internet?',
      answer: 'Yes! Once installed as a PWA, you can access most features offline.'
    },
    {
      question: 'How can I share updated travel info or timings?',
      answer: 'Go to the Contact Us section and send us a message. We regularly update data based on community inputs.'
    }
  ];

  const [hoveredBenefit, setHoveredBenefit] = useState(-1);
  const [hoveredFeature, setHoveredFeature] = useState(-1);
  const [hoveredFaq, setHoveredFaq] = useState(-1);
  const [hoveredNav, setHoveredNav] = useState(-1);



  
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
<>
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
                    <FluidCustomAd />  
          </> ))}
            </div>
          )}
        </div>
      )}
<div style={styles.destinationTablesSection} className="destination-tables-section">
        <FluidCustomAd />
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


           <div style={styles.mainContainer}>
      {/* Floating background shapes */}
      <div style={styles.floatingShapes}>
        <div style={{...styles.shape, width: '120px', height: '120px', top: '10%', left: '5%', animationDelay: '0s'}}></div>
        <div style={{...styles.shape, width: '80px', height: '80px', top: '20%', right: '10%', animationDelay: '2s'}}></div>
        <div style={{...styles.shape, width: '100px', height: '100px', top: '60%', left: '8%', animationDelay: '4s'}}></div>
        <div style={{...styles.shape, width: '60px', height: '60px', bottom: '15%', right: '15%', animationDelay: '6s'}}></div>
      </div>

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerGlow}></div>
          <h1 style={styles.mainTitle}>Welcome to GoPerdoor</h1>
          <p style={styles.subtitle}>🚌 Your Local Bus Companion!</p>
        </div>

        <div style={{...styles.section, ...(visibleSections.includes(0) ? styles.sectionVisible : {})}}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionTitleIcon}>🎯</span>
            Our Mission
          </h2>
          <div style={styles.sectionContent}>
            At GoPerdoor, our mission is to make travel from Perdoor to nearby towns simple, reliable, and easily accessible. Whether you're commuting to Udupi for work, traveling to Manipal for studies, or visiting local temples, GoPerdoor gives you all the information you need — bus schedules, tourist vehicle options, and community updates — in one place.
            <br /><br />
            We created GoPerdoor to solve a local problem: lack of organized travel info in rural and semi-urban areas. No more guessing bus times or relying on hearsay — our platform ensures you're always informed and on time.
          </div>
        </div>

        <div style={styles.divider}>
          <div style={styles.dividerGlow}></div>
        </div>

        <div style={{...styles.section, ...(visibleSections.includes(1) ? styles.sectionVisible : {})}}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionTitleIcon}>✅</span>
            Key Benefits of Using GoPerdoor
          </h2>
          <div style={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.benefitItem,
                  ...(hoveredBenefit === index ? styles.benefitItemHover : {})
                }}
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(-1)}
              >
                <div style={{...styles.benefitIcon, animationDelay: `${index * 0.5}s`}}>{benefit.icon}</div>
                <div style={styles.benefitContent}>
                  <div style={styles.benefitTitle}>{benefit.title}</div>
                  <div style={styles.benefitDescription}>{benefit.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.divider}>
          <div style={styles.dividerGlow}></div>
        </div>

        <div style={{...styles.section, ...(visibleSections.includes(2) ? styles.sectionVisible : {})}}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionTitleIcon}>🧭</span>
            How to Navigate the Site
          </h2>
          <div style={styles.navigationList}>
            {navigationSteps.map((item, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.navigationItem,
                  ...(hoveredNav === index ? styles.navigationItemHover : {})
                }}
                onMouseEnter={() => setHoveredNav(index)}
                onMouseLeave={() => setHoveredNav(-1)}
              >
                <span style={{ fontWeight: '800', color: '#485eff', fontSize: '18px' }}>{item.step}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <div style={{...styles.sectionContent, marginTop: '20px'}}>
            The top navigation bar makes everything easy to access, whether you're using a phone or computer.
          </div>
        </div>

        <div style={styles.divider}>
          <div style={styles.dividerGlow}></div>
        </div>

        <div style={{...styles.section, ...(visibleSections.includes(3) ? styles.sectionVisible : {})}}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionTitleIcon}>🌟</span>
            Unique Features
          </h2>
          <div style={styles.featureGrid}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.featureCard,
                  ...(hoveredFeature === index ? styles.featureCardHover : {})
                }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(-1)}
              >
                <div style={styles.featureTitle}>
                  <span style={styles.featureIcon}>{feature.icon}</span>
                  {feature.title}
                </div>
                <div style={styles.featureDescription}>{feature.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.divider}>
          <div style={styles.dividerGlow}></div>
        </div>

        <div style={{...styles.faqSection, ...styles.section, ...(visibleSections.includes(4) ? styles.sectionVisible : {})}}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionTitleIcon}>❓</span>
            Frequently Asked Questions (FAQ)
          </h2>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              style={{
                ...styles.faqItem,
                ...(hoveredFaq === index ? styles.faqItemHover : {})
              }}
              onMouseEnter={() => setHoveredFaq(index)}
              onMouseLeave={() => setHoveredFaq(-1)}
            >
              <div style={styles.faqQuestion}>
                <span style={{ color: '#485eff', fontSize: '16px' }}>Q:</span>
                {faq.question}
              </div>
              <div style={styles.faqAnswer}>{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;


