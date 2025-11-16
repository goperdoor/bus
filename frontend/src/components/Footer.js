import React from 'react';
import { MapPin, Mail, Bus, Instagram, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="simple-footer">
      <div className="footer-content">
        {/* First Row: Brand + Social */}
        <div className="first-row">
          <div className="footer-brand">
            <Bus size={24} />
            <div>
              <div className="brand-name">GoPerdoor</div>
              <div className="brand-tagline">ಇಲ್ಲಿದೆ ಬಸ್ ಟೈಮ್ !</div>
            </div>
          </div>

          {/* Social */}
          <div className="footer-social">
            <button 
              className="social-btn" 
              onClick={() => window.location.href = 'mailto:goperdoor576124@gmail.com'}
              aria-label="Email"
            >
              <Mail size={18} />
            </button>
            <button 
              className="social-btn" 
              onClick={() => window.open('https://www.instagram.com/goperdoor?igsh=NzdnNnVpbjJrN3Fh', '_blank')}
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </button>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-info">
          <div className="info-item">
            <MapPin size={14} />
            <span>Perdoor, Udupi, Karnataka</span>
          </div>
          <div className="info-item">
            <Mail size={14} />
            <span>goperdoor576124@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bar">
        <div className="copyright">© 2024 GoPerdoor. All rights reserved.</div>
        <div className="developer">
          <Code size={14} />
          <span>Built by Anvith & Rohan</span>
        </div>
      </div>

      <style jsx>{`
        .simple-footer {
          background: #f8f9fa81;
          padding: 32px 20px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .footer-content {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
          padding-bottom: 24px;
          border-bottom: 2px solid #e9ecef;
        }

        .first-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex: 1;
        }

        .footer-brand {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .footer-brand svg {
          color: #485eff;
        }

        .brand-name {
          font-size: 20px;
          font-weight: 800;
          color: #2c3e50;
        }

        .brand-tagline {
          font-size: 11px;
          color: #6c757d;
          font-weight: 600;
        }

        .footer-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #495057;
          font-size: 14px;
        }

        .info-item svg {
          color: #485eff;
        }

        .footer-social {
          display: flex;
          gap: 10px;
        }

        .social-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 2px solid #e9ecef;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #485eff;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .social-btn:hover {
          background: #485eff;
          color: white;
          border-color: #485eff;
          transform: translateY(-2px);
        }

        .footer-bar {
          max-width: 1000px;
          margin: 0 auto;
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copyright {
          color: #6c757d;
          font-size: 13px;
        }

        .developer {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6c757d;
          font-size: 13px;
        }

        .developer svg {
          color: #485eff;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .first-row {
            width: 100%;
          }

          .footer-info {
            width: 100%;
          }

          .footer-bar {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .simple-footer {
            padding: 24px 16px 16px;
          }

          .first-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .brand-name {
            font-size: 18px;
          }

          .info-item {
            font-size: 13px;
          }

          .social-btn {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;