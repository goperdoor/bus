import React from 'react';

const BackgroundVideo = () => {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          filter: 'brightness(0.6)', // Light dim effect
        }}
      >
        <source src="/perdoordrone.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional Light Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light translucent layer
          zIndex: 0,
        }}
      ></div>

      {/* Foreground Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          color: 'white',
          textAlign: 'center',
          paddingTop: '40vh',
        }}
      >
        <h1>Welcome to My Site</h1>
        <p>This is a background video with light and loop</p>
      </div>
    </div>
  );
};

export default BackgroundVideo;