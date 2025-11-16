import React from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import { createWhatsAppLink, createSMSLink } from '../utils/storeUtils';

const ContactActions = ({ store, product = null, message = null }) => {
  const whatsappNumber = store.whatsappNumber || store.phone;
  const inquiryMessage = message || (product 
    ? `Hi ${store.name}! I'm interested in "${product.name}" (₹${product.price}). Could you please provide more details?`
    : `Hi ${store.name}! I'm interested in your products and services. Could you share more information?`
  );

  const actionsStyle = {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginTop: '15px'
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '25px',
    border: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none'
  };

  const whatsappStyle = {
    ...buttonStyle,
    backgroundColor: '#25d366',
    color: 'white'
  };

  const callStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white'
  };

  const smsStyle = {
    ...buttonStyle,
    backgroundColor: '#ffc107',
    color: '#000'
  };

  const handleWhatsApp = () => {
    const whatsappUrl = createWhatsAppLink(whatsappNumber, inquiryMessage);
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${store.phone}`, '_self');
  };

  const handleSMS = () => {
    const smsUrl = createSMSLink(store.phone, inquiryMessage);
    window.open(smsUrl, '_self');
  };

  return (
    <div style={actionsStyle}>
      {whatsappNumber && (
        <button
          style={whatsappStyle}
          onClick={handleWhatsApp}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#128c7e';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#25d366';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <MessageCircle size={18} />
          WhatsApp
        </button>
      )}
      
      <button
        style={callStyle}
        onClick={handleCall}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#0056b3';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#007bff';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
      >
        <Phone size={18} />
        Call Now
      </button>
      
      <button
        style={smsStyle}
        onClick={handleSMS}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#e6ac00';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 15px rgba(255, 193, 7, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#ffc107';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
      >
        <Mail size={18} />
        SMS
      </button>
    </div>
  );
};

export default ContactActions;