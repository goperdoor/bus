import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import FluidCustomAd from '../ads/FluidCustomAd';
import BusFinderChat from './BusFinderChat';

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

  // Auto-submit when destination is selected
  const handleDestinationChange = async (e) => {
    const selectedDestination = e.target.value;
    setDestination(selectedDestination);
    
    if (selectedDestination.trim()) {
      setLoading(true);
      setSearched(true);
      setMessage('');

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/buses/search?destination=${selectedDestination}`);
        setBuses(response.data.buses || []);
        setMessage(response.data.message || '');
      } catch (error) {
        console.error('Error searching buses:', error);
        setMessage('Error searching for buses. Please try again.');
        setBuses([]);
      } finally {
        setLoading(false);
      }
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
  

 
 

 
 


  
  return (
    <>
      <style jsx>{`
        .home-container {
          min-height: 100vh;
          padding: 0;
          background: linear-gradient(135deg, rgb(243, 231, 255) 0%, rgb(224, 242, 254) 50%, rgb(252, 228, 236) 100%);
        }

        .hero-section {
          position: relative;
          width: 100%;
          max-width: 1400px;
          margin: 20px auto 90px;
          padding: 0 20px;
        }

        .hero-video-container {
          position: relative;
          width: 100%;
          height: 600px;
          border-radius: 24px;
          overflow: visible;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          animation: fadeInUp 0.8s ease;
        }

        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 24px;
        }

        .hero-overlay {
          position: absolute;
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 600px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 30px;
          border-radius: 24px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .hero-title {
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 800;
          background: linear-gradient(135deg, #485eff 0%, #a955ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 10px 0;
          text-align: center;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 3vw, 1.3rem);
          color: #6c757d;
          margin: 0 0 25px 0;
          font-weight: 600;
          text-align: center;
        }

        .hero-search-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .hero-input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .hero-input-group label {
          font-weight: 700;
          color: #2c3e50;
          font-size: 1rem;
          text-align: center;
        }

        .hero-loading {
          color: #485eff;
          font-size: 0.9rem;
          text-align: center;
          font-weight: 600;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .hero-select {
          width: 100%;
          padding: 16px 18px;
          padding-right: 40px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 1.05rem;
          background: #ffffff;
          color: #333;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 7L10 12L15 7' stroke='%23485eff' stroke-width='2'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 15px center;
          background-size: 16px 16px;
          transition: all 0.3s ease;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .hero-select:hover {
          border-color: #a3bffa;
          cursor: pointer;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(72, 94, 255, 0.15);
        }

        .hero-select:focus {
          outline: none;
          border-color: #485eff;
          box-shadow: 0 0 0 4px rgba(72, 94, 255, 0.2);
        }

        .header2 {
          text-align: center;
          margin: 0 auto 30px;
          max-width: 800px;
          padding: 30px 25px;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 20px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          animation: fadeInUp 0.8s ease;
          margin-top: 20px;
        }

        .header2 h1 {
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          margin: 0 0 10px 0;
          background: linear-gradient(135deg, #485eff 0%, #a955ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .header2 p {
          background: linear-gradient(135deg, #485eff 0%, #a955ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: clamp(1rem, 3.5vw, 1.2rem);
          opacity: 0.9;
          font-weight: 600;
          margin: 0;
        }

        .search-section {
          max-width: 600px;
          margin: 0 auto 30px;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 35px;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease forwards;
        }

        .search-section:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(72, 94, 255, 0.12);
        }

        .search-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .input-group label {
          font-weight: 700;
          color: #555;
          font-size: 1.1rem;
        }

        .input-group select {
          width: 100%;
          padding: 15px;
          padding-right: 40px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 1.1rem;
          background-color: #f9fafb;
          color: #333;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 7L10 12L15 7' stroke='%23667eea' stroke-width='2'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 15px center;
          background-size: 16px 16px;
          transition: all 0.3s ease;
        }

        .input-group select:hover {
          border-color: #a3bffa;
          cursor: pointer;
        }

        .input-group select:focus {
          outline: none;
          border-color: #667eea;
          background-color: #f0f4ff;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
        }

        .search-btn {
          padding: 15px 30px;
          background: linear-gradient(135deg, #485eff 0%, #a955ff 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(72, 94, 255, 0.3);
        }

        .search-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(72, 94, 255, 0.4);
        }

        .search-btn:active {
          transform: translateY(0);
        }

        .search-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .results-section {
          max-width: 900px;
          margin: 30px auto;
          animation: fadeInUp 0.6s ease forwards;
        }

        .results-header {
          text-align: center;
          margin-bottom: 30px;
          padding: 25px 30px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(72, 94, 255, 0.15);
          box-shadow: 0 8px 30px rgba(72, 94, 255, 0.12);
          position: relative;
          overflow: hidden;
        }

        .results-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #485eff 0%, #a955ff 50%, #ff6b9d 100%);
        }

        .results-header h2 {
          font-size: clamp(1.5rem, 4vw, 2rem);
          background: linear-gradient(135deg, #485eff 0%, #a955ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .no-results {
          text-align: center;
          padding: 40px 30px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          font-size: 1.1rem;
          color: #6c757d;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }

        .bus-results {
          display: grid;
          grid-template-columns: 1fr;
          gap: 25px;
        }

        .bus-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 25px;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(72, 94, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.5s ease forwards;
          position: relative;
          overflow: hidden;
        }

        .bus-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background: linear-gradient(135deg, #485eff 0%, #a955ff 100%);
          transform: scaleY(0);
          transition: transform 0.4s ease;
        }

        .bus-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(72, 94, 255, 0.15);
          border-color: rgba(72, 94, 255, 0.25);
        }

        .bus-card:hover::before {
          transform: scaleY(1);
        }

        .bus-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: nowrap;
          gap: 15px;
          padding-bottom: 15px;
          border-bottom: 2px solid rgba(72, 94, 255, 0.1);
        }

        .bus-name {
          font-size: clamp(1.1rem, 3.5vw, 1.5rem);
          font-weight: 800;
          color: #2c3e50;
          letter-spacing: -0.3px;
          flex: 1;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .bus-number {
          background: linear-gradient(135deg, #485eff 0%, #a955ff 100%);
          color: white;
          padding: clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px);
          border-radius: 25px;
          font-size: clamp(0.8rem, 2.5vw, 0.95rem);
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(72, 94, 255, 0.3);
          letter-spacing: 0.5px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .bus-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 18px;
        }

        .detail-item {
          text-align: center;
          padding: 16px;
          background: linear-gradient(135deg, rgba(248, 249, 250, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 14px;
          border: 1px solid rgba(72, 94, 255, 0.08);
          transition: all 0.3s ease;
        }

        .detail-item:hover {
          background: linear-gradient(135deg, rgba(72, 94, 255, 0.05) 0%, rgba(169, 85, 255, 0.05) 100%);
          border-color: rgba(72, 94, 255, 0.2);
          transform: translateY(-2px);
        }

        .detail-label {
          font-size: 0.85rem;
          color: #6c757d;
          font-weight: 700;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-value {
          font-size: 1.3rem;
          font-weight: 800;
          color: #2c3e50;
          letter-spacing: -0.3px;
        }

        .next-departure {
          text-align: center;
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          padding: 18px 20px;
          border-radius: 16px;
          margin-top: 18px;
          box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
          position: relative;
          overflow: hidden;
        }

        .next-departure::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { transform: translate(-50%, -50%); }
          50% { transform: translate(0%, 0%); }
        }

        .next-departure-time {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 5px;
          position: relative;
          z-index: 1;
        }

        .minutes-left {
          font-size: 1.05rem;
          opacity: 0.95;
          font-weight: 600;
          position: relative;
          z-index: 1;
        }

        .availability-badge-container {
          text-align: center;
          margin-top: 15px;
        }

        .availability-badge {
          display: inline-block;
          padding: 8px 18px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
        }

        .availability-daily {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
        }

        .availability-weekdays {
          background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
          color: white;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .home-container {
            padding: 0;
          }

          .hero-section {
            margin: 15px auto 70px;
            padding: 0 15px;
          }

          .hero-video-container {
            height: 250px;
            border-radius: 20px;
          }

          .hero-video {
            border-radius: 20px;
          }

          .hero-overlay {
            bottom: -35px;
            width: 95%;
            padding: 10px;
            border-radius: 20px;
          }

          .hero-search-form {
            gap: 12px;
          }

          .hero-input-group label {
            font-size: 0.95rem;
          }

          .hero-select {
            padding: 12px 15px;
            padding-right: 35px;
            font-size: 1rem;
          }

          .header2 {
            padding: 25px 20px;
            margin: 20px 15px;
          }

          .search-section {
            padding: 25px;
            margin: 0 15px 30px;
          }

          .results-section {
            padding: 0 15px;
          }

          .bus-header {
            flex-direction: row;
            align-items: center;
            gap: 10px;
          }

          .bus-name {
            font-size: 1.1rem;
            max-width: calc(100% - 120px);
          }

          .bus-number {
            font-size: 0.8rem;
            padding: 6px 12px;
          }

          .bus-card {
            padding: 20px;
          }

          .detail-item {
            padding: 12px;
          }

          .detail-label {
            font-size: 0.75rem;
          }

          .detail-value {
            font-size: 1.1rem;
          }
        }

        @media (min-width: 480px) and (max-width: 768px) {
          .hero-video-container {
            height: 350px;
          }

          .bus-name {
            font-size: 1.25rem;
            max-width: calc(100% - 140px);
          }

          .bus-number {
            font-size: 0.85rem;
            padding: 7px 14px;
          }

          .bus-card {
            padding: 22px;
          }

          .detail-item {
            padding: 14px;
          }

          .detail-value {
            font-size: 1.2rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-video-container {
            height: 450px;
          }

          .bus-name {
            font-size: 1.35rem;
          }

          .bus-number {
            font-size: 0.9rem;
            padding: 7px 15px;
          }

          .bus-card {
            padding: 24px;
          }
        }

        @media (min-width: 1025px) {
          .hero-video-container {
            height: 600px;
          }

          .bus-name {
            font-size: 1.5rem;
          }

          .bus-number {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 400px) {
          .bus-name {
            font-size: 1rem;
            max-width: calc(100% - 110px);
          }

          .bus-number {
            font-size: 0.75rem;
            padding: 5px 10px;
          }

          .bus-card {
            padding: 18px;
          }

          .bus-details {
            gap: 12px;
          }

          .detail-item {
            padding: 10px;
          }

          .detail-label {
            font-size: 0.7rem;
          }

          .detail-value {
            font-size: 1rem;
          }
        }
      `}</style>
      
      <div className="home-container">
      {/* Hero Section with Video */}
      <section className="hero-section">
        <div className="hero-video-container">
          <video 
            className="hero-video"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/perdoordrone.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay">
           
            {/* Search Form in Hero */}
            <form onSubmit={handleSearch} className="hero-search-form">
              <div className="hero-input-group">
                <select
                  id="hero-destination"
                  value={destination}
                  onChange={handleDestinationChange}
                  required
                  className="hero-select"
                >
                  <option value="" disabled> ಆಯ್ಕೆಮಾಡಿ (Select Destination)</option>
                  {destinations.map((dest, index) => (
                    <option key={index} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
                {loading && <span className="hero-loading">ಲೋಡ್ ಆಗುತ್ತಿದೆ... Loading...</span>}
              </div>
            </form>
          </div>
        </div>
      </section>
<FluidCustomAd />  
    
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Old search section - now in hero overlay 
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
      */}

      {searched && (
        <div className="results-section">
          

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
          <FluidCustomAd />  
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
      </div>
     {/* <Link to="/admin" className="admin-link">
      Admin Panel
</Link> */}

      {/* Bus Finder Chat Component */}
      <BusFinderChat />

      </div>
    </>
  );
};

export default Home;



