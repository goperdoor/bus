import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const StoreStatus = ({ store, showDetails = false }) => {
  // Get current day and time in IST (Indian Standard Time)
  const now = new Date();
  const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
  const currentDay = istTime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTime = istTime.getHours() * 60 + istTime.getMinutes(); // Convert to minutes

  // Convert time string (e.g., "09:00") to minutes
  const timeToMinutes = (timeStr) => {
    if (!timeStr || timeStr === '') return null;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Format time for display
  const formatTime = (timeStr) => {
    if (!timeStr || timeStr === '') return 'Not set';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Check if store is currently open
  const isCurrentlyOpen = () => {
    if (!store.operatingHours || !store.operatingHours[currentDay]) {
      return false;
    }

    const daySchedule = store.operatingHours[currentDay];
    
    // If the day is marked as closed
    if (!daySchedule.isOpen) {
      return false;
    }

    const openTime = timeToMinutes(daySchedule.open);
    const closeTime = timeToMinutes(daySchedule.close);

    // If times are not set
    if (openTime === null || closeTime === null) {
      return false;
    }

    // Handle overnight hours (e.g., 22:00 to 02:00)
    if (closeTime < openTime) {
      return currentTime >= openTime || currentTime <= closeTime;
    }

    // Normal hours
    return currentTime >= openTime && currentTime <= closeTime;
  };

  // Get today's operating hours
  const getTodayHours = () => {
    if (!store.operatingHours || !store.operatingHours[currentDay]) {
      return 'Hours not set';
    }

    const daySchedule = store.operatingHours[currentDay];
    
    if (!daySchedule.isOpen) {
      return 'Closed today';
    }

    if (!daySchedule.open || !daySchedule.close) {
      return 'Hours not set';
    }

    return `${formatTime(daySchedule.open)} - ${formatTime(daySchedule.close)}`;
  };

  // Get next opening time if currently closed
  const getNextOpenTime = () => {
    if (!store.operatingHours) return null;

    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDayIndex = days.indexOf(currentDay);
    
    // Check next 7 days
    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (currentDayIndex + i) % 7;
      const nextDay = days[nextDayIndex];
      const nextDaySchedule = store.operatingHours[nextDay];
      
      if (nextDaySchedule && nextDaySchedule.isOpen && nextDaySchedule.open) {
        const dayName = nextDay.charAt(0).toUpperCase() + nextDay.slice(1);
        const openTime = formatTime(nextDaySchedule.open);
        
        if (i === 1) {
          return `Opens tomorrow at ${openTime}`;
        } else {
          return `Opens ${dayName} at ${openTime}`;
        }
      }
    }
    
    return null;
  };

  const isOpen = isCurrentlyOpen();
  const todayHours = getTodayHours();
  const nextOpen = getNextOpenTime();

  const statusStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: isOpen ? '#10B981' : '#EF4444',
    marginBottom: showDetails ? '8px' : '0'
  };

  const hoursStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#6B7280',
    marginBottom: '9px',
    marginTop: '9px'
  };

  const nextOpenStyle = {
    fontSize: '12px',
    color: '#9CA3AF',
    fontStyle: 'italic',
      marginBottom: '9px',
    marginTop: '9px'
  };

  return (
    <div className="store-status">
      <div style={statusStyle}>
        {isOpen ? (
          <>
            <CheckCircle size={16} />
            <span>Open now</span>
          </>
        ) : (
          <>
            <CheckCircle size={16} />
            <span>Open now</span>
          </>
                   {/* Advanced Filters <>
            <XCircle size={16} />
            <span>Closed</span>
          </> */}
        )}
      </div>
      
      {showDetails && (
        <div className="store-hours-details">
          <div style={hoursStyle}>
            <Clock size={14} />
            <span>Today: {todayHours}</span>
          </div>
          
          {!isOpen && nextOpen && (
            <div style={nextOpenStyle}>
              {nextOpen}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StoreStatus;
