import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { isStoreOpen, formatOperatingHours } from '../utils/storeUtils';

const StoreStatus = ({ store, showDetails = false }) => {
  const status = isStoreOpen(store.operatingHours);
  const hours = formatOperatingHours(store.operatingHours);

  const statusStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    backgroundColor: status.isOpen ? '#d4edda' : '#f8d7da',
    color: status.isOpen ? '#155724' : '#721c24',
    border: `1px solid ${status.isOpen ? '#c3e6cb' : '#f5c6cb'}`,
    marginBottom: showDetails ? '15px' : '0'
  };

  const hoursStyle = {
    background: 'white',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginTop: '10px'
  };

  const hourItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 0',
    borderBottom: '1px solid #f0f0f0'
  };

  return (
    <div>
      <div style={statusStyle}>
        {status.isOpen ? (
          <CheckCircle size={16} />
        ) : (
          <XCircle size={16} />
        )}
        <span>{status.isOpen ? 'Open Now' : 'Closed'}</span>
        <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
          • {status.message}
        </span>
      </div>

      {showDetails && hours.length > 0 && (
        <div style={hoursStyle}>
          <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} />
            Operating Hours
          </h4>
          {hours.map((day, index) => (
            <div key={index} style={hourItemStyle}>
              <span style={{ fontWeight: day.day === 'Sunday' ? 'bold' : 'normal' }}>
                {day.day}
              </span>
              <span style={{ 
                color: day.isOpen ? '#28a745' : '#dc3545',
                fontWeight: day.isOpen ? 'normal' : 'bold'
              }}>
                {day.hours}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreStatus;
