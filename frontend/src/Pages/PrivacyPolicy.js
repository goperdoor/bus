import React from 'react';
import { useEffect } from 'react';
import { Shield, Lock, Gavel, Mail, Phone, Globe, AlertTriangle, Users, Eye, Cookie, UserCheck, MessageCircle, XCircle, Edit, Ban, Calendar, CheckCircle, ArrowRight, Info } from 'lucide-react';

const LegalPage = () => {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  const mainStyle = {
    background: 'linear-gradient(135deg, rgb(243, 231, 255) 0%, rgb(224, 242, 254) 50%, rgb(252, 228, 236) 100%)',
    minHeight: '100vh',
    padding: window.innerWidth <= 768 ? '10px' : '20px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333'
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    marginTop: window.innerWidth <= 768 ? '100px' : '90px',
    
    padding: window.innerWidth <= 768 ? '15px' : window.innerWidth <= 1024 ? '20px' : '30px',
    borderRadius: window.innerWidth <= 768 ? '8px' : '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)'
  };

  const titleStyle = {
    fontSize: window.innerWidth <= 768 ? '20px' : window.innerWidth <= 1024 ? '24px' : '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: window.innerWidth <= 768 ? '20px' : '30px',
    color: '#2c3e50',
    borderBottom: '10px solid rgb(122 89 255)',
    
    paddingBottom: '15px',
    display: 'flex',
    flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: window.innerWidth <= 768 ? '5px' : '10px',
    flexWrap: 'wrap',
   
  };

  const sectionTitleStyle = {
    fontSize: window.innerWidth <= 768 ? '18px' : window.innerWidth <= 1024 ? '20px' : '22px',
    fontWeight: 'bolder',
    marginTop: window.innerWidth <= 768 ? '20px' : '30px',
    marginBottom: '15px',
    color: '#e74c3c',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap'

  };

  const textStyle = {
    fontSize: window.innerWidth <= 768 ? '14px' : '16px',
    marginBottom: '15px',
    textAlign: window.innerWidth <= 768 ? 'left' : 'justify',
    lineHeight: '1.7'
  };

  const listStyle = {
    marginLeft: window.innerWidth <= 768 ? '10px' : '20px',
    marginBottom: '15px'
  };

  const listItemStyle = {
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '5px',
    fontSize: window.innerWidth <= 768 ? '14px' : '16px'
  };

  const highlightBoxStyle = {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '8px',
    padding: window.innerWidth <= 768 ? '10px' : '15px',
    margin: window.innerWidth <= 768 ? '15px 0' : '20px 0',
    borderLeft: '4px solid #f39c12',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: window.innerWidth <= 768 ? '14px' : '16px'
  };

  const contactBoxStyle = {
    backgroundColor: '#e8f5e8',
    border: '1px solid #c3e6cb',
    borderRadius: '8px',
    padding: window.innerWidth <= 768 ? '15px' : '20px',
    margin: window.innerWidth <= 768 ? '15px 0' : '20px 0',
    textAlign: 'center'
  };

  const lastUpdatedStyle = {
    textAlign: 'center',
    fontSize: window.innerWidth <= 768 ? '12px' : '14px',
    color: '#666',
    marginTop: window.innerWidth <= 768 ? '20px' : '30px',
    fontStyle: 'italic',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px'
  };

  const iconStyle = {
    fontSize: window.innerWidth <= 768 ? '16px' : '20px',
    flexShrink: 0
  };

  return (
    <div style={mainStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>
          <Shield style={{...iconStyle, marginRight: window.innerWidth <= 768 ? '5px' : '10px'}} />
          <span style={{wordBreak: 'break-word'}}>GoPerdoor – Privacy Policy, Disclaimer & Terms of Use</span>
        </h1>

        <section>
          <h2 style={sectionTitleStyle}>
            <AlertTriangle style={iconStyle} />
            <span>Disclaimer</span>
          </h2>
          <p style={textStyle}>
GoPerdoor is an independent website created to help the residents of Perdoor access bus timing information for routes from Perdoor to various local destinations.          </p>
          <p style={textStyle}>
            All bus timings listed on this site are based on:
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <ArrowRight style={{...iconStyle, color: '#3498db', marginTop: '2px'}} />
              <span>Local observations</span>
            </li>
            <li style={listItemStyle}>
              <ArrowRight style={{...iconStyle, color: '#3498db', marginTop: '2px'}} />
              <span>Public knowledge</span>
            </li>
            <li style={listItemStyle}>
              <ArrowRight style={{...iconStyle, color: '#3498db', marginTop: '2px'}} />
              <span>Informal community inputs</span>
            </li>
          </ul>
          <p style={textStyle}>
            We do not claim 100% accuracy of the timings, as actual bus schedules may change due to traffic, maintenance, or operational reasons.
          </p>
          <div style={highlightBoxStyle}>
            <Info style={{...iconStyle, color: '#f39c12', marginTop: '2px'}} />
            <div>
              <strong>Important:</strong><br />
              GoPerdoor is not affiliated with any government body, private transport company, or bus operator. It is a community-driven platform built with the intention of helping local commuters.
            </div>
          </div>
        </section>

        <section>
          <h2 style={sectionTitleStyle}>
            <Lock style={iconStyle} />
            <span>Privacy Policy</span>
          </h2>
          <p style={textStyle}>
            We respect your privacy and take it seriously. Here's how we handle data:
          </p>
          
          <h3 style={{...sectionTitleStyle, fontSize: window.innerWidth <= 768 ? '16px' : '18px', marginTop: '20px', color: '#2c3e50'}}>
            <UserCheck style={{...iconStyle, fontSize: window.innerWidth <= 768 ? '14px' : '16px'}} />
            <span>1. No Personal Data Collected:</span>
          </h3>
          <p style={textStyle}>
            <CheckCircle style={{...iconStyle, color: '#27ae60', marginRight: '8px',marginBottom:'-8px'}} />
            We do not collect names, emails, phone numbers, or any personally identifiable information from our users.
          </p>

          <h3 style={{...sectionTitleStyle, fontSize: window.innerWidth <= 768 ? '16px' : '18px', marginTop: '20px', color: '#2c3e50'}}>
            <Cookie style={{...iconStyle, fontSize: window.innerWidth <= 768 ? '14px' : '16px'}} />
            <span>2. No Cookies or Tracking:</span>
          </h3>
          <p style={textStyle}>
            <CheckCircle style={{...iconStyle, color: '#27ae60', marginRight: '8px',marginBottom:'-8px'}} />
            We do not use cookies, tracking tools, or third-party analytics tools to monitor user activity.
          </p>

          <h3 style={{...sectionTitleStyle, fontSize: window.innerWidth <= 768 ? '16px' : '18px', marginTop: '20px', color: '#2c3e50'}}>
            <Users style={{...iconStyle, fontSize: window.innerWidth <= 768 ? '14px' : '16px'}} />
            <span>3. No Registration or Login Required:</span>
          </h3>
          <p style={textStyle}>
            <CheckCircle style={{...iconStyle, color: '#27ae60', marginRight: '8px',marginBottom:'-8px'}} />
            GoPerdoor is a fully open-access platform. Users can view bus information without creating accounts.
          </p>

          <h3 style={{...sectionTitleStyle, fontSize: window.innerWidth <= 768 ? '16px' : '18px', marginTop: '20px', color: '#2c3e50'}}>
            <MessageCircle style={{...iconStyle, fontSize: window.innerWidth <= 768 ? '14px' : '16px'}} />
            <span>4. Feedback or Contact:</span>
          </h3>
          <p style={textStyle}>
            <CheckCircle style={{...iconStyle, color: '#27ae60', marginRight: '8px',marginBottom:'-8px'}} />
            If users provide feedback through a contact form, it is used only to improve the platform. We do not share or store this data.
          </p>
        </section>

        <section>
          <h2 style={sectionTitleStyle}>
            <Gavel style={iconStyle} />
            <span>Terms of Use</span>
          </h2>
          <p style={textStyle}>
            By using GoPerdoor, you agree to the following terms:
          </p>

          <h3 style={{...sectionTitleStyle, fontSize: window.innerWidth <= 768 ? '16px' : '18px', marginTop: '20px', color: '#2c3e50'}}>
            <Eye style={{...iconStyle, fontSize: window.innerWidth <= 768 ? '14px' : '16px'}} />
            <span>1. Use at Your Own Risk:</span>
          </h3>
          <p style={textStyle}>
            <ArrowRight style={{...iconStyle, color: '#3498db', marginRight: '8px',marginBottom:'-8px'}} />
            The data on this site is intended for informational purposes only. Users are encouraged to verify timings from official or on-ground sources.
          </p>

          <h3 style={{...sectionTitleStyle, fontSize: window.innerWidth <= 768 ? '16px' : '18px', marginTop: '20px', color: '#2c3e50'}}>
            <XCircle style={{...iconStyle, fontSize: window.innerWidth <= 768 ? '14px' : '16px'}} />
            <span>2. No Legal Liability:</span>
          </h3>
          <p style={textStyle}>
            <ArrowRight style={{...iconStyle, color: '#3498db', marginRight: '8px',marginBottom:'-8px'}} />
            We are not responsible for any delays, missed buses, or other issues that occur due to inaccurate or outdated information.
          </p>

          <h3 style={{...sectionTitleStyle, fontSize: window.innerWidth <= 768 ? '16px' : '18px', marginTop: '20px', color: '#2c3e50'}}>
            <Edit style={{...iconStyle, fontSize: window.innerWidth <= 768 ? '14px' : '16px'}} />
            <span>3. Content Removal Requests:</span>
          </h3>
          <p style={textStyle}>
            <ArrowRight style={{...iconStyle, color: '#3498db', marginRight: '8px',marginBottom:'-8px'}} />
            If you are a bus conductor, operator, or authority and want your information updated or removed, please contact us directly using the email below. We will respond promptly.
          </p>

          <h3 style={{...sectionTitleStyle, fontSize: window.innerWidth <= 768 ? '16px' : '18px', marginTop: '20px', color: '#2c3e50'}}>
            <Ban style={{...iconStyle, fontSize: window.innerWidth <= 768 ? '14px' : '16px'}} />
            <span>4. Prohibited Use:</span>
          </h3>
          <p style={textStyle}>
            <ArrowRight style={{...iconStyle, color: '#3498db', marginRight: '8px',marginBottom:'-8px'}} />
            You may not use this platform to spread misinformation or upload harmful or unauthorized content.
          </p>
        </section>

        <section>
          <h2 style={sectionTitleStyle}>
            <Mail style={iconStyle} />
            <span>Contact Us</span>
          </h2>
          <div style={contactBoxStyle}>
            <p style={textStyle}>
              If you have concerns, suggestions, or want to report any data, contact us at:
            </p>
            <p style={{...textStyle, fontSize: window.innerWidth <= 768 ? '16px' : '18px', fontWeight: 'bold'}}>
              <Mail style={{...iconStyle, color: '#3498db', marginRight: '8px',marginBottom:'-8px'}} />
              Email:goperdoor576124@gmail.com
            </p>
            
            <p style={textStyle}>
              <Globe style={{...iconStyle, color: '#e74c3c', marginRight: '8px',marginBottom:'-8px'}} />
              Website: http://goperdoor.com
            </p>
          </div>
        </section>

        <div style={lastUpdatedStyle}>
          <Calendar style={iconStyle} />
          <span>Last Updated: July 13, 2025</span>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
