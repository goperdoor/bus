import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <style jsx>{`
        .privacy-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
          padding: 30px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 10px;
        }

        .header h1 {
          margin: 0;
          font-size: 2.5em;
          font-weight: 700;
        }

        .header p {
          margin: 10px 0 0 0;
          font-size: 1.1em;
          opacity: 0.9;
        }

        .content {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .section {
          margin-bottom: 30px;
        }

        .section h2 {
          color: #667eea;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
          margin-bottom: 20px;
          font-size: 1.5em;
        }

        .section h3 {
          color: #555;
          margin-top: 25px;
          margin-bottom: 15px;
          font-size: 1.2em;
        }

        .section p {
          margin-bottom: 15px;
          text-align: justify;
        }

        .section ul {
          margin-left: 20px;
          margin-bottom: 15px;
        }

        .section li {
          margin-bottom: 8px;
        }

        .highlight {
          background-color: #e8f0fe;
          padding: 15px;
          border-left: 4px solid #667eea;
          margin: 20px 0;
          border-radius: 5px;
        }

        .contact-info {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-top: 30px;
        }

        .contact-info h3 {
          color: #667eea;
          margin-top: 0;
        }

        .effective-date {
          font-style: italic;
          color: #666;
          text-align: center;
          margin-bottom: 30px;
          font-size: 0.95em;
        }

        .footer {
          text-align: center;
          margin-top: 40px;
          padding: 20px;
          background: #667eea;
          color: white;
          border-radius: 10px;
        }

        @media (max-width: 768px) {
          .privacy-container {
            padding: 10px;
          }
          
          .content {
            padding: 20px;
          }
          
          .header h1 {
            font-size: 2em;
          }
        }
      `}</style>

      <div className="header">
        <h1>Privacy Policy</h1>
        <p>PerDoor Bus Timing Service</p>
      </div>

      <div className="content">
        <div className="effective-date">
          <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
        </div>

        <div className="section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to PerDoor Bus Timing Service. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you use our bus timing website and services.
          </p>
          <div className="highlight">
            <strong>Your privacy matters to us.</strong> We only collect information necessary to provide you with accurate bus timing information and improve our services.
          </div>
        </div>

        <div className="section">
          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Information You Provide</h3>
          <ul>
            <li>Location preferences for bus routes</li>
            <li>Favorite bus stops and routes</li>
            <li>Contact information (if you contact us for support)</li>
            <li>Feedback and reviews you submit</li>
          </ul>

          <h3>2.2 Information We Collect Automatically</h3>
          <ul>
            <li>Your IP address and general location (city/region level)</li>
            <li>Device type, browser information, and operating system</li>
            <li>Pages visited and time spent on our website</li>
            <li>Search queries for bus routes and stops</li>
            <li>Usage patterns and preferences</li>
          </ul>

          <h3>2.3 Location Information</h3>
          <p>
            With your permission, we may collect precise location data to provide nearby bus stops and real-time arrival information. You can disable location sharing at any time through your browser settings.
          </p>
        </div>

        <div className="section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide accurate bus timing and route information</li>
            <li>Show nearby bus stops based on your location</li>
            <li>Remember your preferred routes and stops</li>
            <li>Improve our service accuracy and user experience</li>
            <li>Send service updates and notifications (if opted in)</li>
            <li>Analyze usage patterns to optimize our website</li>
            <li>Respond to your inquiries and provide customer support</li>
          </ul>
        </div>

        <div className="section">
          <h2>4. Information Sharing and Disclosure</h2>
          <p>We do not sell, rent, or trade your personal information to third parties. We may share information only in the following circumstances:</p>
          <ul>
            <li><strong>Transit Authorities:</strong> We may share aggregated, non-personal data with bus operators to improve service</li>
            <li><strong>Service Providers:</strong> We work with trusted third parties who help us operate our website (hosting, analytics)</li>
            <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In case of merger or acquisition, user information may be transferred</li>
          </ul>
        </div>

        <div className="section">
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>
          <ul>
            <li>Data encryption in transit and at rest</li>
            <li>Regular security audits and updates</li>
            <li>Access controls and authentication</li>
            <li>Secure data storage practices</li>
          </ul>
        </div>

        <div className="section">
          <h2>6. Your Rights and Choices</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to processing of your information</li>
            <li>Withdraw consent for location tracking</li>
            <li>Export your data in a portable format</li>
          </ul>
          <div className="highlight">
            <strong>Managing Your Preferences:</strong> You can update your preferences, clear saved routes, and manage location settings directly through our website interface.
          </div>
        </div>

        <div className="section">
          <h2>7. Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze website usage. You can control cookies through your browser settings.
          </p>
          <h3>Types of Cookies We Use:</h3>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how you use our website</li>
          </ul>
        </div>

        <div className="section">
          <h2>8. Third-Party Services</h2>
          <p>
            Our website may integrate with third-party services such as mapping providers, analytics tools, and transit data sources. These services have their own privacy policies, and we encourage you to review them.
          </p>
        </div>

        <div className="section">
          <h2>9. Data Retention</h2>
          <p>
            We retain your information for as long as necessary to provide our services and comply with legal obligations. Personal information is typically retained for:
          </p>
          <ul>
            <li>User preferences: Until you delete them or close your account</li>
            <li>Usage analytics: Aggregated data for up to 2 years</li>
            <li>Support communications: Up to 3 years</li>
          </ul>
        </div>

        <div className="section">
          <h2>10. Children's Privacy</h2>
          <p>
            Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
          </p>
        </div>

        <div className="section">
          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the effective date. We encourage you to review this Privacy Policy periodically.
          </p>
        </div>

        <div className="contact-info">
          <h3>12. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> privacy@perdoorbus.com<br/>
            <strong>Phone:</strong> +1-800-BUS-TIME<br/>
            <strong>Address:</strong> 123 Transit Avenue, City, State 12345
          </p>
        </div>
      </div>

      <div className="footer">
        <p>© 2024 PerDoor Bus Timing Service. All rights reserved.</p>
        <p>Committed to protecting your privacy while keeping you on time.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;