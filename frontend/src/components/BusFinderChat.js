import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faComments, 
  faTimes, 
  faRedoAlt, 
  faMapMarkerAlt, 
  faClock, 
  faCalendarAlt,
  faRobot,
  faBus
} from '@fortawesome/free-solid-svg-icons';

const BusFinderChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('welcome');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [buses, setBuses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && destinations.length === 0) {
      fetchDestinations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && step === 'welcome') {
      setTimeout(() => {
        addBotMessage('👋 Hi! I\'m your bus assistant. Where would you like to go today?', 'text');
        setStep('selectDestination');
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/destinations`);
      setDestinations(response.data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  const addBotMessage = (text, type = 'text', data = null) => {
    setMessages(prev => [...prev, { 
      sender: 'bot', 
      text, 
      type,
      data,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { 
      sender: 'user', 
      text,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination);
    addUserMessage(`📍 ${destination}`);
    
    setTimeout(() => {
      addBotMessage('Great choice! What time would you like to travel?', 'text');
      setStep('selectTime');
    }, 500);
  };

  const handleTimeSelect = (time, label) => {
    setSelectedTime(time);
    addUserMessage(`🕐 ${label}`);
    
    setTimeout(() => {
      addBotMessage('Searching for buses...', 'loading');
      setLoading(true);
      searchBuses(selectedDestination, time);
    }, 500);
  };

  const searchBuses = async (destination, time) => {
    try {
      console.log('🔍 Searching buses for:', destination, 'at', time);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/buses/search?destination=${encodeURIComponent(destination)}`
      );
      
      console.log('📦 API Response:', response.data);
      let allBuses = Array.isArray(response.data) ? response.data : (response.data.buses || []);
      console.log('🚌 All buses:', allBuses.length);
      
      let filteredBuses = allBuses;
      let searchTime = time;
      
      if (time === 'now') {
        const now = new Date();
        searchTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        filteredBuses = allBuses.filter(bus => bus.leavingTimeFromPerdoor >= searchTime);
        console.log('🕐 After "now" filter:', filteredBuses.length);
      } else if (time !== 'anytime') {
        // Filter buses after selected time (no window restriction)
        filteredBuses = allBuses.filter(bus => bus.leavingTimeFromPerdoor >= time);
        console.log('⏰ After time filter:', filteredBuses.length);
        searchTime = time;
      }
      
      // Sort by departure time
      filteredBuses.sort((a, b) => 
        a.leavingTimeFromPerdoor.localeCompare(b.leavingTimeFromPerdoor)
      );
      
      // Get only next 2 buses
      const next2Buses = filteredBuses.slice(0, 2);
      console.log('🚌 Next 2 buses:', next2Buses.length);
      
      setBuses(next2Buses);
      setLoading(false);
      
      // Remove loading message
      setMessages(prev => prev.filter(msg => msg.type !== 'loading'));
      
      setTimeout(() => {
        if (next2Buses.length > 0) {
          const busText = next2Buses.length === 1 ? 'bus' : 'buses';
          let timeText = '';
          if (time === 'now') {
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            timeText = formatTime(currentTime);
          } else if (time !== 'anytime') {
            timeText = formatTime(time);
          }
          
          if (time === 'anytime') {
            addBotMessage(`✅ Here are the next 2 ${busText} available:`, 'text');
          } else {
            addBotMessage(`✅ Next 2 ${busText} departing after ${timeText}:`, 'text');
          }
          addBotMessage('', 'buses', next2Buses);
        } else {
          if (time === 'anytime') {
            addBotMessage('😔 Sorry, no buses found for this destination.', 'text');
          } else {
            addBotMessage('😔 Sorry, no buses found departing after that time.', 'text');
          }
        }
        setStep('showResults');
      }, 300);
    } catch (error) {
      console.error('❌ Error:', error);
      setLoading(false);
      setMessages(prev => prev.filter(msg => msg.type !== 'loading'));
      addBotMessage('❌ Oops! Something went wrong. Please try again.', 'text');
      setStep('selectDestination');
    }
  };

  const handleReset = () => {
    setStep('welcome');
    setSelectedDestination('');
    setSelectedTime('');
    setBuses([]);
    setMessages([]);
    
    // Restart with welcome message
    setTimeout(() => {
      addBotMessage('👋 Hi! I\'m your bus assistant. Where would you like to go today?', 'text');
      setStep('selectDestination');
    }, 300);
  };

  const formatTime = (time) => {
    if (!time) return 'N/A';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const generateTimeOptions = () => {
    const times = [];
    times.push({ value: 'now', label: '🕐 Now (Next Available)' });
    
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeValue = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const label = `${displayHour}:${String(minute).padStart(2, '0')} ${ampm}`;
        times.push({ value: timeValue, label });
      }
    }
    
    times.push({ value: 'anytime', label: '📋 Show All Buses' });
    return times;
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.floatingButton}
        aria-label="Bus Finder"
      >
        <FontAwesomeIcon icon={faComments} size="lg" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={styles.chatWindow}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerContent}>
              <div style={styles.avatar}>
                <FontAwesomeIcon icon={faBus} />
              </div>
              <div>
                <div style={styles.headerTitle}>Bus Assistant</div>
                <div style={styles.headerSubtitle}>Online</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={styles.messagesArea}>
            {messages.map((msg, index) => (
              <div key={index}>
                {msg.sender === 'bot' ? (
                  <div style={styles.botMessageContainer}>
                    <div style={styles.botAvatar}>
                      <FontAwesomeIcon icon={faRobot} />
                    </div>
                    <div style={styles.botMessage}>
                      {msg.type === 'loading' ? (
                        <div style={styles.typingIndicator}>
                          <span style={styles.typingDot}></span>
                          <span style={{...styles.typingDot, animationDelay: '0.2s'}}></span>
                          <span style={{...styles.typingDot, animationDelay: '0.4s'}}></span>
                        </div>
                      ) : msg.type === 'buses' ? (
                        <div style={styles.busesContainer}>
                          {msg.data.map((bus, idx) => (
                            <div key={idx} style={styles.busCard}>
                              <div style={styles.busHeader}>
                                <span style={styles.busName}>{bus.busName}</span>
                                <span style={styles.busNumber}>{bus.busNumber}</span>
                              </div>
                              <div style={styles.busRoute}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} style={{marginRight: '6px'}} />
                                {bus.destination}
                              </div>
                              <div style={styles.busTimings}>
                                <div style={styles.timing}>
                                  <FontAwesomeIcon icon={faClock} />
                                  <span style={styles.timingLabel}>Departure</span>
                                  <span style={styles.timingValue}>{formatTime(bus.leavingTimeFromPerdoor)}</span>
                                </div>
                              </div>
                              <div style={styles.busSchedule}>
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                <span style={{marginLeft: '4px', fontSize: '11px'}}>
                                  {bus.weekdays && '📅 Weekdays'} 
                                  {bus.weekdays && bus.sunday && ' | '}
                                  {bus.sunday && '📅 Sundays'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>{msg.text}</div>
                      )}
                      <div style={styles.timestamp}>{msg.timestamp}</div>
                    </div>
                  </div>
                ) : (
                  <div style={styles.userMessageContainer}>
                    <div style={styles.userMessage}>
                      {msg.text}
                      <div style={styles.timestamp}>{msg.timestamp}</div>
                    </div>
                  </div>
                )}

                {/* Show Destination Buttons */}
                {msg.sender === 'bot' && step === 'selectDestination' && index === messages.length - 1 && (
                  <div style={styles.optionsContainer}>
                    {destinations.map((dest, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDestinationSelect(dest)}
                        style={styles.optionButton}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{marginRight: '8px'}} />
                        {dest}
                      </button>
                    ))}
                  </div>
                )}

                {/* Show Time Buttons */}
                {msg.sender === 'bot' && step === 'selectTime' && index === messages.length - 1 && (
                  <div style={styles.timeOptionsContainer}>
                    {generateTimeOptions().map((time, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTimeSelect(time.value, time.label)}
                        style={styles.timeButton}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        {time.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Reset Button */}
            {step === 'showResults' && buses.length > 0 && (
              <div style={styles.resetContainer}>
                <button onClick={handleReset} style={styles.resetButton}>
                  <FontAwesomeIcon icon={faRedoAlt} style={{marginRight: '8px'}} />
                  Search Again
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  floatingButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
    transition: 'all 0.3s ease',
    zIndex: 1000,
  },
  chatWindow: {
    position: 'fixed',
    bottom: '90px',
    right: '20px',
    left: '20px',
    width: 'auto',
    height: 'min(650px, calc(100vh - 120px))',
    maxWidth: '420px',
    marginLeft: 'auto',
    backgroundColor: '#f5f5f5',
    borderRadius: '16px',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1001,
    overflow: 'hidden',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  headerTitle: {
    fontSize: '18px',
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: '12px',
    opacity: 0.9,
  },
  closeBtn: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: 'white',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  messagesArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  botMessageContainer: {
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start',
  },
  botAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#667eea',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    flexShrink: 0,
  },
  botMessage: {
    backgroundColor: 'white',
    padding: '12px 16px',
    borderRadius: '12px',
    borderTopLeftRadius: '4px',
    maxWidth: '80%',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  userMessageContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  userMessage: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '12px',
    borderTopRightRadius: '4px',
    maxWidth: '80%',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  timestamp: {
    fontSize: '10px',
    opacity: 0.6,
    marginTop: '4px',
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
    padding: '4px 0',
  },
  typingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#667eea',
    animation: 'typing 1.4s infinite',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '8px',
    marginLeft: '40px',
  },
  optionButton: {
    padding: '12px 16px',
    backgroundColor: 'white',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    color: '#333',
    textAlign: 'left',
    fontWeight: '500',
  },
  timeOptionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '8px',
    marginLeft: '40px',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  timeButton: {
    padding: '10px 14px',
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    transition: 'all 0.2s',
    color: '#333',
    textAlign: 'left',
  },
  busesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '8px',
  },
  busCard: {
    backgroundColor: '#f8f4ff',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e0d4ff',
  },
  busHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  busName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  busNumber: {
    fontSize: '11px',
    color: '#666',
    backgroundColor: '#e0d4ff',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  busRoute: {
    fontSize: '12px',
    color: '#555',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  busTimings: {
    display: 'flex',
    gap: '12px',
    marginBottom: '8px',
  },
  timing: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
  },
  timingLabel: {
    color: '#666',
  },
  timingValue: {
    color: '#667eea',
    fontWeight: '600',
  },
  busSchedule: {
    display: 'flex',
    alignItems: 'center',
    color: '#666',
    fontSize: '11px',
  },
  resetContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
  },
  resetButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.2s',
  },
};

// Add keyframes animation
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(`
      @keyframes typing {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-10px); }
      }
    `, styleSheet.cssRules.length);
  } catch (e) {
    // Ignore if rule already exists
  }
}

export default BusFinderChat;
