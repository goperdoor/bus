import React from 'react';
import { Facebook, Twitter, Instagram, Globe } from 'lucide-react';

const SocialLinks = ({ socialLinks, storeName }) => {
  if (!socialLinks || Object.keys(socialLinks).length === 0) {
    return null;
  }

  const socialPlatforms = [
    { key: 'facebook', icon: Facebook, label: 'Facebook' },
    { key: 'twitter', icon: Twitter, label: 'Twitter' },
    { key: 'instagram', icon: Instagram, label: 'Instagram' },
    { key: 'website', icon: Globe, label: 'Website' }
  ];

  const activePlatforms = socialPlatforms.filter(platform => 
    socialLinks[platform.key] && socialLinks[platform.key].trim() !== ''
  );

  if (activePlatforms.length === 0) {
    return null;
  }

  return (
    <div className="social-links">
      <h4>Connect with us:</h4>
      <div className="social-icons">
        {activePlatforms.map(platform => {
          const Icon = platform.icon;
          let url = socialLinks[platform.key];
          
          // Ensure URLs have proper protocol
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = `https://${url}`;
          }

          return (
            <a
              key={platform.key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              title={`${storeName} on ${platform.label}`}
            >
              <Icon size={20} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;
