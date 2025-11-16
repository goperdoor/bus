import React from 'react';

export default function ErrorPage() {
  const goBack = () => {
    window.history.back();
  };

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="error-page">

      <style jsx>{`
        .error-page {
          min-height: 100vh;
          background: linear-gradient(135deg, rgb(243, 231, 255) 0%, rgb(224, 242, 254) 50%, rgb(252, 228, 236) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .error-container {
          text-align: center;
          max-width: 500px;
          margin-top: 100px;
          width: 100%;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .error-number {
          font-size: 8rem;
          font-weight: 900;
          background: linear-gradient(45deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
          line-height: 1;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .error-title {
          font-size: 2rem;
          color: #333;
          margin: 20px 0 10px 0;
          font-weight: 700;
        }

        .error-message {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .button-container {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 14px 28px;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          min-width: 120px;
        }

        .btn-primary {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.8);
          color: #333;
          border: 2px solid rgba(102, 126, 234, 0.2);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 1);
          border-color: rgba(102, 126, 234, 0.4);
          transform: translateY(-2px);
        }

        .door-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 30px auto;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.2);
        }

        .door-svg {
          width: 40px;
          height: 40px;
          fill: white;
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .error-page {
            padding: 15px;
          }

          .error-container {
            padding: 30px 20px;
            border-radius: 15px;
          }

          .error-number {
            font-size: 6rem;
          }

          .error-title {
            font-size: 1.8rem;
          }

          .error-message {
            font-size: 1rem;
            margin-bottom: 25px;
          }

          .button-container {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 280px;
            padding: 16px 20px;
            font-size: 1.1rem;
          }

          .door-icon {
            width: 70px;
            height: 70px;
            margin-bottom: 25px;
          }

          .door-svg {
            width: 35px;
            height: 35px;
          }
        }

        /* Small Mobile Phones */
        @media (max-width: 480px) {
          .error-page {
            padding: 10px;
          }

          .error-container {
            padding: 25px 15px;
            border-radius: 12px;
          }

          .error-number {
            font-size: 5rem;
          }

          .error-title {
            font-size: 1.5rem;
            margin: 15px 0 8px 0;
          }

          .error-message {
            font-size: 0.95rem;
            margin-bottom: 20px;
          }

          .btn {
            padding: 14px 18px;
            font-size: 1rem;
          }

          .door-icon {
            width: 60px;
            height: 60px;
            margin-bottom: 20px;
          }

          .door-svg {
            width: 30px;
            height: 30px;
          }
        }

        /* Very Small Screens */
        @media (max-width: 360px) {
          .error-number {
            font-size: 4.5rem;
          }

          .error-title {
            font-size: 1.3rem;
          }

          .error-container {
            padding: 20px 12px;
          }
        }
      `}</style>

      <div className="error-container">
        <div className="door-icon">
          <svg className="door-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,3C13.11,3 14,3.9 14,5V7H18A2,2 0 0,1 20,9V19A2,2 0 0,1 18,21H6A2,2 0 0,1 4,19V9A2,2 0 0,1 6,7H10V5C10,3.9 10.9,3 12,3M12,5V7H12V5M14,11A1,1 0 0,0 13,12A1,1 0 0,0 14,13A1,1 0 0,0 15,12A1,1 0 0,0 14,11Z"/>
          </svg>
        </div>
        
        <h1 className="error-number">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          Oops! The page you're looking for seems to have wandered off. 
          Don't worry, we'll help you find the right door to your destination.
        </p>
        
        <div className="button-container">
          <button className="btn btn-primary" onClick={goHome}>
            Go Home
          </button>
          <button className="btn btn-secondary" onClick={goBack}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}