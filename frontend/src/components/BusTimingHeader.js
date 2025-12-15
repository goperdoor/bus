import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Store,
  Info,
  Users,
  Brain,
  Lock,
  Phone,
  Bus,
  X
} from 'lucide-react';

const BusTimingHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    

    { path: '/RickshawBusManagement', icon: Bus, label: 'Rickshaw & Tourist' },
    { path: '/shops', icon: Store, label: 'Perdoor Shops' },
    { path: '/WisdomWall', icon: Users, label: 'Voice of Perdoor' },
    { path: '/AILearningHub', icon: Brain, label: 'AI Learning Hub' },
        
    { path: '/PrivacyPolicy', icon: Lock, label: 'Privacy Policy' },
    { path: '/ContactForm', icon: Phone, label: 'Contact' }
  ];

  return (
    <>
      <header className="modern-header">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo-link" onClick={closeMenu}>
            <div className="logo">
              <span className="logo-text">GoPerdoor</span>
              <span className="logo-subtitle">ಇಲ್ಲಿದೆ ಬಸ್ ಟೈಮ್ !</span>
            </div>
          </Link>

          {/* Hamburger Button */}
          <button 
            className={`menu-button ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>
        </div>
      </header>

      {/* Navigation Panel */}
      <div className={`nav-panel ${menuOpen ? 'active' : ''}`}>
        <div className="nav-header">
          <h2 className="nav-title">Menu</h2>
          <button className="close-button" onClick={closeMenu} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        
        <nav className="nav-menu">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="nav-link"
                onClick={closeMenu}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon className="nav-icon" size={20} />
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Backdrop */}
      {menuOpen && <div className="backdrop" onClick={closeMenu}></div>}

      <style jsx>{`
        /* Header Styles */
        .modern-header {
          position: relative;
          width: 100%;
       
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
         
         
          z-index: 100;
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 44px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Logo Styles */
        .logo-link {
          text-decoration: none;
          color: inherit;
          transition: opacity 0.2s;
        }

        .logo-link:hover {
          opacity: 0.8;
        }

        .logo {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, #485eff 0%, #a955ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }

        .logo-subtitle {
          font-size: 11px;
          font-weight: 600;
          color: #6c757d;
          letter-spacing: 0.3px;
        }

        /* Modern Hamburger Menu */
        .menu-button {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          transition: transform 0.2s;
          z-index: 101;
        }

        .menu-button:hover {
          transform: scale(1.05);
        }

        .menu-button:active {
          transform: scale(0.95);
        }

        .menu-line {
          display: block;
          width: 28px;
          height: 4px;
          background: linear-gradient(135deg, #485eff 0%, #a955ff 100%);
          border-radius: 3px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .menu-line:nth-child(2) {
          width: 22px;
        }

        .menu-line:nth-child(3) {
          width: 16px;
        }

        .menu-button.open .menu-line:nth-child(1) {
          transform: rotate(45deg) translateY(9px);
          width: 28px;
        }

        .menu-button.open .menu-line:nth-child(2) {
          opacity: 0;
          transform: translateX(20px);
        }

        .menu-button.open .menu-line:nth-child(3) {
          transform: rotate(-45deg) translateY(-9px);
          width: 28px;
        }

        /* Navigation Panel */
        .nav-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 320px;
          max-width: 85vw;
          height: 100vh;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .nav-panel.active {
          transform: translateX(0);
        }

        .nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 24px 20px;
          border-bottom: 2px solid rgba(72, 94, 255, 0.1);
        }

        .nav-title {
          margin: 0;
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, #485eff 0%, #a955ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .close-button {
          background: rgba(72, 94, 255, 0.1);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #485eff;
          transition: all 0.2s;
        }

        .close-button:hover {
          background: rgba(72, 94, 255, 0.2);
          transform: rotate(90deg);
        }

        /* Navigation Menu */
        .nav-menu {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 16px;
          text-decoration: none;
          color: #2c3e50;
          font-size: 16px;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          animation: slideIn 0.4s forwards;
          position: relative;
          overflow: hidden;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .nav-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, #485eff 0%, #a955ff 100%);
          transform: scaleY(0);
          transition: transform 0.25s;
        }

        .nav-link:hover {
          background: linear-gradient(135deg, rgba(72, 94, 255, 0.08) 0%, rgba(169, 85, 255, 0.08) 100%);
          transform: translateX(4px);
          color: #485eff;
        }

        .nav-link:hover::before {
          transform: scaleY(1);
        }

        .nav-link:active {
          transform: translateX(2px) scale(0.98);
        }

        .nav-icon {
          flex-shrink: 0;
          transition: transform 0.25s;
        }

        .nav-link:hover .nav-icon {
          transform: scale(1.1);
        }

        .nav-label {
          flex: 1;
        }

        /* Backdrop */
        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Responsive */
        @media (max-width: 480px) {
          .header-container {
            padding: 14px 16px;
          }

          .logo-text {
            font-size: 20px;
          }

          .logo-subtitle {
            font-size: 10px;
          }

          .nav-panel {
            width: 280px;
          }

          .nav-link {
            padding: 14px 14px;
            font-size: 15px;
          }
        }

        /* Smooth scrolling */
        .nav-panel {
          scrollbar-width: thin;
          scrollbar-color: rgba(72, 94, 255, 0.3) transparent;
        }

        .nav-panel::-webkit-scrollbar {
          width: 6px;
        }

        .nav-panel::-webkit-scrollbar-track {
          background: transparent;
        }

        .nav-panel::-webkit-scrollbar-thumb {
          background: rgba(72, 94, 255, 0.3);
          border-radius: 3px;
        }

        .nav-panel::-webkit-scrollbar-thumb:hover {
          background: rgba(72, 94, 255, 0.5);
        }
      `}</style>
    </>
  );
};

export default BusTimingHeader;
