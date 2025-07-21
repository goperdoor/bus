import React from 'react';
import { MapPin, Phone, Mail, Clock, Bus, Facebook, Twitter, Instagram , Code } from 'lucide-react';

const Footer = () => {
 const footerStyle = {
  backgroundColor: '#1a202c',
  color: '#e2e8f0',
  padding: '60px 20px 20px',
  borderTopLeftRadius: '27px',
  borderTopRightRadius: '27px',
  fontFamily: 'Arial, sans-serif',
  paddingTop: '45px',
   boxShadow: '0px -3px 20px rgba(0, 0, 0, 0.5)',
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
    marginBottom: '1px',
    color: '#60a5fa',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const linkStyle = {
    color: '#cbd5e0',
    textDecoration: 'none',
    padding: '0px 0',
    transition: 'color 0.3s ease',
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    textAlign:'center',
    gap: '21px',
    paddingleft:'0px'
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
    fontSize: '14px',
   
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
              GoPerdoor
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
                   onClick={() => window.open('https://www.instagram.com/goperdoor?igsh=NzdnNnVpbjJrN3Fh', '_blank')}
              >
                <Instagram size={20} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          
          {/* Contact Info */}
          <div style={sectionStyle}>
            <h3 style={titleStyle}>
              <MapPin size={20} />
              Contact Us
            </h3>
            <div style={{ ...linkStyle, cursor: 'default' }}>
              <MapPin size={16} />
              Perdoor Udupi, Karnataka
            </div>
            
            <div style={{ ...linkStyle, cursor: 'default' }}>
              <Mail size={16} />
              goperdoor576124@gmail.com
            </div>

           <div style={{ ...linkStyle, cursor: 'default', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '21px' }}>
  <Code size={14} />
  Developed by Anvith Shetty & Rohan Shetty
</div>

            
          </div>
        </div>

        {/* Bottom Section */}
        <div style={bottomStyle}>
          <p>© 2024 GoPerdoor. All rights reserved. | Privacy Policy | Terms of Service | Accessibility</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
