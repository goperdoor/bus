import React from 'react';
import { Instagram, Facebook, Twitter, ExternalLink } from 'lucide-react';

const SocialLinks = ({ socialLinks, storeName }) => {
  if (!socialLinks || (!socialLinks.instagram && !socialLinks.facebook && !socialLinks.twitter)) {
    return null;
  }

  const socialStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
    flexWrap: 'wrap'
  };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    border: '1px solid #ddd'
  };

  const instagramStyle = {
    ...linkStyle,
    backgroundColor: '#ffeef7',
    color: '#d91a7c',
    borderColor: '#f7b2d8'
  };

  const facebookStyle = {
    ...linkStyle,
    backgroundColor: '#e3f2fd',
    color: '#1565c0',
    borderColor: '#90caf9'
  };

  const twitterStyle = {
    ...linkStyle,
    backgroundColor: '#e8f5e8',
    color: '#2e7d32',
    borderColor: '#a5d6a7'
  };

  const handleSocialClick = (url, platform) => {
    if (url) {
      window.open(url.startsWith('http') ? url : `https://${url}`, '_blank');
    }
  };

  return (
    <div>
      <h4 style={{ margin: '15px 0 5px 0', fontSize: '0.9rem', color: '#666' }}>
        Follow {storeName}:
      </h4>
      <div style={socialStyle}>
        {socialLinks.instagram && (
          <button
            style={instagramStyle}
            onClick={() => handleSocialClick(socialLinks.instagram, 'instagram')}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(217, 26, 124, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <Instagram size={16} />
            Instagram
            <ExternalLink size={12} />
          </button>
        )}
        
        {socialLinks.facebook && (
          <button
            style={facebookStyle}
            onClick={() => handleSocialClick(socialLinks.facebook, 'facebook')}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(21, 101, 192, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <Facebook size={16} />
            Facebook
            <ExternalLink size={12} />
          </button>
        )}
        
        {socialLinks.twitter && (
          <button
            style={twitterStyle}
            onClick={() => handleSocialClick(socialLinks.twitter, 'twitter')}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(46, 125, 50, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <Twitter size={16} />
            Twitter
            <ExternalLink size={12} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialLinks;
