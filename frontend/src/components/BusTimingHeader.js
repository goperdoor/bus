import React, { useState } from 'react';
import {
  Home,
  Landmark,
  MapPinned,
  Users,
  Lock,
  Phone,
  Info,
  BusFront,
  Globe,
  Brain,
  Store
} from 'lucide-react';

import { Link } from 'react-router-dom';

const BusTimingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .header {
          background: linear-gradient(135deg, #485eff 0%, #a955ff 100%);
          color: white;
          padding: 1rem 2rem;
          width: 100%;
         padding-top: 2px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
          z-index: 1000;
          position: fixed;
          border-radius: 0px 0px 27px 27px;
          
        }

        .header-content {
        padding-top: 6px;
        padding-bottom: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0rem;
        }
          .logo h4 {
            margin: 0;
            font-weight:bolder;
      }
        .logo p{
        
          font-size: 0.8rem;

       }
       

        .hamburger {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          padding: 0.5rem;
          transition: transform 0.3s ease;
        }

        .hamburger:hover {
          transform: scale(1.1);
        }

        .bar {
          width: 35px;
          height: 5px;
          background-color: white;
          margin: 3px 0;
          
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .hamburger.active .bar:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active .bar:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active .bar:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          min-width: 200px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-radius: 0 0 0 10px;
          overflow: hidden;
          transform: translateY(-10px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-menu.active {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .menu-item {
              display: flex;
            gap: 0.5rem;
          padding: 1rem 1.5rem;
          color: #333;
          text-decoration: none;
          border-bottom: 1px solid #f0f0f0;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .menu-item:last-child {
          border-bottom: none;
        }

        .menu-item:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          transform: translateX(5px);
        }

        .menu-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .menu-item:hover::before {
          left: 100%;
        }

        @media (max-width: 768px) {
          .header {
            padding: 1rem 1rem;
          }
          
          .logo {
            font-size: 1.4rem;
          }
          
          .mobile-menu {
            right: 1rem;
            font-size: 0.9rem;
            font-weight: 500;
            min-width: 200px;
          }
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 999;
        }

        .overlay.active {
          opacity: 1;
          visibility: visible;
        }
      `}</style>

      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h4>GoPerdoor</h4>
            <p>ಇಲ್ಲಿದೆ ಬಸ್ ಟೈಮ್ !</p>
          </div>
          
          <div 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          
          <nav className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
  <Link to="/" className="menu-item" onClick={() => setIsMenuOpen(false)}>
   <Home size={18} /> Home
  </Link>
  <Link to="/store" className="menu-item" onClick={() => setIsMenuOpen(false)}>
   <Store size={18} /> Goperdoor Store
  </Link>
      <Link to="/AboutUs" className="menu-item" onClick={() => setIsMenuOpen(false)}>
      <Info size={18} /> About Us
  </Link>
 <Link to="/RickshawBusManagement" className="menu-item" onClick={() => setIsMenuOpen(false)}>
     <BusFront size={18} /> Ricksha & tourist
  </Link>
      
 {/* <Link to="/RickshawBusManagement" className="menu-item" onClick={() => setIsMenuOpen(false)}>
     <BusFront size={18} /> Ricksha & tourist
  </Link>
  <Link to="/PerdoorTempleHistorys" className="menu-item" onClick={() => setIsMenuOpen(false)}>
   <Landmark size={18} /> perdoor history 
  </Link>
  <Link to="/PerdoorPages" className="menu-item" onClick={() => setIsMenuOpen(false)}>
   <MapPinned size={18} /> explore perdoor 
  </Link>

<Link to="/WisdomWall" className="menu-item" onClick={() => setIsMenuOpen(false)}>
   <Users size={18} /> Voice of Perdoor
  </Link>
   <Link to="/AILearningHub" className="menu-item" onClick={() => setIsMenuOpen(false)}>
  <Brain size={18} /> AI Learning Hub
</Link>
           
  <Link to="/PrivacyPolicy" className="menu-item" onClick={() => setIsMenuOpen(false)}>
   <Lock size={18} /> Privacy Policy
  </Link>
  <Link to="/ContactForm" className="menu-item" onClick={() => setIsMenuOpen(false)}>
   <Phone size={18} />  Contact
  </Link>
</nav>

        </div>
      </header>

      <div 
        className={`overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      
      
    </div>
  );
};

export default BusTimingHeader;   
