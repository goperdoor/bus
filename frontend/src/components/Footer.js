import React from 'react';
import { MapPin, Phone, Mail, Clock, Bus, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#1a202c',
    color: '#e2e8f0',
    padding: '60px 20px 20px',
    fontFamily: 'Arial, sans-serif'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '40px'
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#60a5fa',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const linkStyle = {
    color: '#cbd5e0',
    textDecoration: 'none',
    padding: '8px 0',
    transition: 'color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const socialStyle = {
    display: 'flex',
    gap: '15px',
    marginTop: '10px'
  };

  const socialIconStyle = {
    width: '40px',
    height: '40px',
    backgroundColor: '#2d3748',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#e2e8f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const bottomStyle = {
    borderTop: '1px solid #2d3748',
    paddingTop: '20px',
    textAlign: 'center',
    color: '#a0aec0',
    fontSize: '14px'
  };

  const brandStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#60a5fa',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const handleLinkHover = (e) => {
    e.target.style.color = '#60a5fa';
  };

  const handleLinkLeave = (e) => {
    e.target.style.color = '#cbd5e0';
  };

  const handleSocialHover = (e) => {
    e.target.style.backgroundColor = '#60a5fa';
    e.target.style.transform = 'translateY(-2px)';
  };

  const handleSocialLeave = (e) => {
    e.target.style.backgroundColor = '#2d3748';
    e.target.style.transform = 'translateY(0)';
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          {/* Brand Section */}
          <div style={sectionStyle}>
            <div style={brandStyle}>
              <Bus size={28} />
              BusTime Pro
            </div>
            <p style={{ color: '#a0aec0', lineHeight: '1.6' }}>
              Your reliable companion for bus schedules and real-time updates. 
              Never miss your bus again with our accurate timing information.
            </p>
            <div style={socialStyle}>
              <div 
                style={socialIconStyle}
                onMouseEnter={handleSocialHover}
                onMouseLeave={handleSocialLeave}
              >
                <Facebook size={20} />
              </div>
              <div 
                style={socialIconStyle}
                onMouseEnter={handleSocialHover}
                onMouseLeave={handleSocialLeave}
              >
                <Twitter size={20} />
              </div>
              <div 
                style={socialIconStyle}
                onMouseEnter={handleSocialHover}
                onMouseLeave={handleSocialLeave}
              >
                <Instagram size={20} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div style={sectionStyle}>
            <h3 style={titleStyle}>
              <Clock size={20} />
              Quick Links
            </h3>
            <a 
              href="#" 
              style={linkStyle}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Live Bus Tracking
            </a>
            <a 
              href="#" 
              style={linkStyle}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Route Search
            </a>
            <a 
              href="#" 
              style={linkStyle}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Schedule Updates
            </a>
            <a 
              href="#" 
              style={linkStyle}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Fare Information
            </a>
            <a 
              href="#" 
              style={linkStyle}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Mobile App
            </a>
          </div>

          {/* Services */}
          <div style={sectionStyle}>
            <h3 style={titleStyle}>
              <Bus size={20} />
              Services
            </h3>
            <a 
              href="#" 
              style={linkStyle}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              City Bus Routes
            </a>
            <a 
              href="#" 
              style={linkStyle}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Express Services
            </a>
            <a 
              href="#" 
              style={linkStyle}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Night Services
            </a>
            <a 
              href="#" 
              style={linkStyle}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Holiday Schedule
            </a>
            <a 
              href="#" 
              style={linkStyle}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Route Planner
            </a>
          </div>

          {/* Contact Info */}
          <div style={sectionStyle}>
            <h3 style={titleStyle}>
              <MapPin size={20} />
              Contact Us
            </h3>
            <div style={{ ...linkStyle, cursor: 'default' }}>
              <MapPin size={16} />
              123 Transit Avenue, City Center
            </div>
            <div style={{ ...linkStyle, cursor: 'default' }}>
              <Phone size={16} />
              +1 (555) 123-4567
            </div>
            <div style={{ ...linkStyle, cursor: 'default' }}>
              <Mail size={16} />
              info@bustimepro.com
            </div>
            <div style={{ ...linkStyle, cursor: 'default' }}>
              <Clock size={16} />
              24/7 Customer Support
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={bottomStyle}>
          <p>© 2024 BusTime Pro. All rights reserved. | Privacy Policy | Terms of Service | Accessibility</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
