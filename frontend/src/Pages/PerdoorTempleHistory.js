import React, { useState, useEffect } from 'react';

const TempleHistoryPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1582632503489-208e296d3ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "ಪೆರ್ಡೂರು ಶ್ರೀ ಅನಂತಪದ್ಮನಾಭ ಸ್ವಾಮಿ ದೇವಾಲಯ - Main temple structure"
    },
    {
      url: "https://images.unsplash.com/photo-1605036047789-9b7b1f9c8b1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Traditional temple entrance with devotees offering prayers"
    },
    {
      url: "https://images.unsplash.com/photo-1597149258161-8e6c5f4e6c69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Intricate stone carvings depicting Lord Ananthapadmanabha"
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Rathotsava celebrations during Kumbha Masa"
    },
    {
      url: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Pushkarani (temple pond) and surrounding peaceful gardens"
    },
    {
      url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Temple bells and traditional elements during evening prayers"
    },
    {
      url: "https://images.unsplash.com/photo-1580490069045-f4e2d66e1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Devotees performing Banana Seva (ಸಾವಿರದೊಂದು ಸೇವೆ)"
    },
    {
      url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Teertha Mantapa with Ganapati pillar"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex(currentImageIndex === carouselImages.length - 1 ? 0 : currentImageIndex + 1);
  };

  const prevImage = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? carouselImages.length - 1 : currentImageIndex - 1);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const mainStyle = {
    background: 'linear-gradient(135deg, rgb(243, 231, 255) 0%, rgb(224, 242, 254) 50%, rgb(252, 228, 236) 100%)',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    marginTop:'70px',

  };

  const heroSectionStyle = {
    position: 'relative',
    height: '450px',
    backgroundImage: 'url("https://images.unsplash.com/photo-1582632503489-208e296d3ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  };

  const titleStyle = {
    fontSize: '1.5em',
    color: 'white',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
    fontWeight: 'bold',
    margin: '0 0 10px 0'
    
  };

  const subtitleStyle = {
    fontSize: '1.5em',
    color: 'white',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
    margin: 0
  };

  const contentStyle = {
    padding: '50px'
  };

  const sectionStyle = {
    marginBottom: '40px'
  };

  const sectionTitleStyle = {
    fontSize: '2.2em',
    color: '#333',
    marginBottom: '20px',
    borderBottom: '3px solid #ff6b6b',
    paddingBottom: '10px',
    fontWeight: 'bold'
  };

  const paragraphStyle = {
    fontSize: '1.1em',
    lineHeight: '1.8',
    color: '#555',
    marginBottom: '20px',
    textAlign: 'justify',
    fontWeight: 'bold',
  };

  const kannadaTextStyle = {
    fontSize: '1.2em',
    lineHeight: '1.9',
    color: '#444',
    marginBottom: '20px',
    textAlign: 'justify',
    fontWeight: '500',
    fontWeight: 'bold',
  };

  const highlightBoxStyle = {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '10px',
    padding: '20px',
    margin: '20px 0',
    fontSize: '1.1em',
    fontStyle: 'italic',
    color: '#856404'
  };

  const infoBoxStyle = {
    backgroundColor: '#e8f5e8',
    border: '1px solid #4caf50',
    borderRadius: '10px',
    padding: '20px',
    margin: '20px 0',
    fontSize: '1.1em',
    color: '#2e7d32'
  };

  const carouselContainerStyle = {
    position: 'relative',
    maxWidth: '900px',
    margin: '40px auto',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
  };

  const carouselImageStyle = {
    width: '100%',
    height: '450px',
    objectFit: 'cover',
    display: 'block'
  };

  const carouselNavStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  };

  const carouselNavHoverStyle = {
    backgroundColor: 'rgba(255, 107, 107, 0.8)',
    transform: 'translateY(-50%) scale(1.1)'
  };

  const carouselDotContainerStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
    zIndex: 2
  };

  const carouselDotStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid white'
  };

  const carouselDotActiveStyle = {
    backgroundColor: '#ff6b6b',
    transform: 'scale(1.2)'
  };

  const carouselCaptionStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '15px 20px',
    fontSize: '1.1em',
    textAlign: 'center'
  };

  const timelineStyle = {
    position: 'relative',
    paddingLeft: '30px'
  };

  const timelineItemStyle = {
    position: 'relative',
    marginBottom: '30px',
    paddingLeft: '30px'
  };

  const timelineDotStyle = {
    position: 'absolute',
    left: '-35px',
    top: '5px',
    width: '12px',
    height: '12px',
    backgroundColor: '#ff6b6b',
    borderRadius: '50%',
    border: '3px solid white',
    boxShadow: '0 0 0 3px #ff6b6b'
  };

  const timelineLineStyle = {
    position: 'absolute',
    left: '-30px',
    top: '20px',
    width: '2px',
    height: 'calc(100% - 20px)',
    backgroundColor: '#ddd'
  };

  const timelineYearStyle = {
    fontSize: '1.3em',
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: '8px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    margin: '30px 0'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease'
  };

  const iconStyle = {
    fontSize: '2em',
    color: '#ff6b6b',
    marginBottom: '15px'
  };

  return (
    <div style={mainStyle}>
      <div style={containerStyle}>
        <div style={heroSectionStyle}>
          <div style={overlayStyle}>
            <h1 style={titleStyle}>🔱 ಪೆರ್ಡೂರು ಶ್ರೀ ಅನಂತಪದ್ಮನಾಭ ಸ್ವಾಮಿ ದೇವಾಲಯ</h1>
            <p style={subtitleStyle}>Perdoor Sri Ananthapadmanabha Swamy Temple</p>
          </div>
        </div>

        <div style={contentStyle}>
          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🌿 ದೇವಾಲಯದ ಪರಿಚಯ - Temple Overview</h2>
            <p style={kannadaTextStyle}>
              ಪೆರ್ಡೂರು ಶ್ರೀ ಅನಂತಪದ್ಮನಾಭ ಸ್ವಾಮಿ ದೇವಾಲಯವು ಕರ್ನಾಟಕದ ಉಡುಪಿ ಜಿಲ್ಲೆಯಲ್ಲಿ ನೆಲೆಸಿದ್ದು, ಉಡುಪಿಯಿಂದ 20 ಕಿಲೋಮೀಟರ್ ಮತ್ತು ಹೆಬ್ರಿಯಿಂದ 14 ಕಿಲೋಮೀಟರ್ ದೂರದಲ್ಲಿದೆ. ಈ ಪ್ರಾಚೀನ ದೇವಾಲಯವು 6-7ನೇ ಶತಮಾನದಲ್ಲಿ ನಿರ್ಮಿಸಲಾಗಿದ್ದು, ಸುಮಾರು 800 ವರ್ಷಗಳ ಇತಿಹಾಸವನ್ನು ಹೊಂದಿದೆ.
            </p>
            
            <p style={paragraphStyle}>
              The temple houses a magnificent 2-feet tall idol of Lord Ananthapadmanabha Swamy in standing posture, adorned with Shankha (conch), Chakra (discus), and Abhaya Hasta (blessing gesture). The deity is also known as Kadalipriya Anantha Padmanabha Swamy, reflecting the special connection with banana offerings.
            </p>
            
            <div style={highlightBoxStyle}>
              "ಶ್ರೀ ಅನಂತಪದ್ಮನಾಭ ಸ್ವಾಮಿ ದೇವರ ವಿಗ್ರಹವು ಶಂಖ, ಚಕ್ರ ಮತ್ತು ಅಭಯ ಹಸ್ತವನ್ನು ಹೊಂದಿದ್ದು, ಅದ್ಭುತ ಶಿಲ್ಪಕಲೆಯಿಂದ ಕೂಡಿದೆ."
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>📜 ಐತಿಹಾಸಿಕ ಹಿನ್ನೆಲೆ - Historical Background</h2>
            <p style={kannadaTextStyle}>
              ಸ್ಥಳ ಪುರಾಣದ ಪ್ರಕಾರ, ಈ ದೇವಾಲಯವನ್ನು ಕೋಟಿಕುಂಜದ ರಾಜ ಶಂಕರನ ಕಾಲದಲ್ಲಿ ಕೃಷ್ಣ ಶರ್ಮಾ ಎಂಬ ಬ್ರಾಹ್ಮಣನು ಸ್ಥಾಪಿಸಿದ್ದನು. ಶ್ರೀ ಕೃಷ್ಣ ಹೆಬ್ಬಾರ್ ಎಂಬವರು 1754 ರಿಂದ 1821 ರವರೆಗೆ ಈ ದೇವಾಲಯವನ್ನು ಪುನಃ ನಿರ್ಮಿಸಿದರು.
            </p>
            
            <p style={paragraphStyle}>
              The temple's significance grew when Raja Vijayappa Odeyar donated the entire Banampalli village as an Umbali (gift) for the temple's maintenance and upkeep. This royal patronage established the temple as a major pilgrimage center in the region.
            </p>

            <div style={infoBoxStyle}>
              <strong>Ancient Inscriptions:</strong><br/>
              • 1458 CE: Deity referred to as "Janardhana Deva" and later as "Ananta Deva"<br/>
              • 1520 CE: Clearly mentions "Sri Ananthapadmanabha Swamy"
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🎋 ಪೂಜಾ ಕ್ರಮ ಮತ್ತು ಸಂಪ್ರದಾಯಗಳು - Worship Rituals & Traditions</h2>
            
            <div style={gridStyle}>
              <div style={cardStyle}>
                <div style={iconStyle}>🙏</div>
                <h3>ಸಾವಿರದೊಂದು ಸೇವೆ (Banana Seva)</h3>
                <p style={kannadaTextStyle}>
                  ಭಕ್ತರು ತಮ್ಮ ಇಚ್ಛೆಗಳು ಪೂರ್ಣಗೊಂಡ ಮೇಲೆ ದೇವರಿಗೆ 1001 ಬಾಳೆಹಣ್ಣುಗಳನ್ನು ಅರ್ಪಿಸುವ "ಸಾವಿರದೊಂದು ಸೇವೆ" ಅಥವಾ "ಹರಿಕೆ ಸೇವೆ" ಇತ್ತೀಚಿನ ವರ್ಷಗಳಲ್ಲಿ ಹೆಚ್ಚು ಪ್ರಸಿದ್ಧವಾಗಿದೆ.
                </p>
              </div>
              
              <div style={cardStyle}>
                <div style={iconStyle}>🕉️</div>
                <h3>ಗಣಪತಿ ಪೂಜೆ</h3>
                <p style={kannadaTextStyle}>
                  ಪೂಜೆಗಳಿಗೆ ಮೊದಲು ತೀರ್ಥ ಮಂಟಪದ ಗಣಪತಿಗೆ ಪೂಜೆ ಸಲ್ಲಿಸುವುದು ಆಚರಣೆಯಾಗಿದೆ. ಸ್ತಂಭದ ಮೇಲಿರುವ ಗಣಪತಿ ಪ್ರಮುಖ ವೈಶಿಷ್ಟ್ಯವಾಗಿದೆ.
                </p>
              </div>
              
              <div style={cardStyle}>
                <div style={iconStyle}>🥈</div>
                <h3>ಬೆಳ್ಳಿ ಅಂಗಾಂಗ ಮಾದರಿಗಳು</h3>
                <p style={kannadaTextStyle}>
                  ಹಲವರು ಬೆಳ್ಳಿಯ ಅಂಗಾಂಗ ಮಾದರಿಗಳನ್ನು (ಕೈ, ಕಾಲು, ಕಣ್ಣು ಮುಂತಾದವು) ಅರ್ಪಿಸುವ ಮೂಲಕ ತಮ್ಮ ಇಚ್ಛೆ ಪೂರೈಕೆಗಾಗಿ ಕೃತಜ್ಞತೆ ಸಲ್ಲಿಸುತ್ತಾರೆ.
                </p>
              </div>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🖼️ ದೇವಾಲಯ ಚಿತ್ರಗಳು - Temple Image Gallery</h2>
            <p style={paragraphStyle}>
              Explore the divine beauty and architectural splendor of Perdoor Sri Ananthapadmanabha Temple through this collection of sacred images.
            </p>
            
            <div style={carouselContainerStyle}>
              <img 
                src={carouselImages[currentImageIndex].url}
                alt={carouselImages[currentImageIndex].caption}
                style={carouselImageStyle}
              />
              
              <button 
                style={{...carouselNavStyle, left: '15px'}}
                onMouseOver={(e) => Object.assign(e.target.style, carouselNavHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, carouselNavStyle)}
                onClick={prevImage}
              >
                ❮
              </button>
              
              <button 
                style={{...carouselNavStyle, right: '15px'}}
                onMouseOver={(e) => Object.assign(e.target.style, carouselNavHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, carouselNavStyle)}
                onClick={nextImage}
              >
                ❯
              </button>
              
              <div style={carouselDotContainerStyle}>
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    style={{
                      ...carouselDotStyle,
                      ...(index === currentImageIndex ? carouselDotActiveStyle : {})
                    }}
                    onClick={() => goToImage(index)}
                  />
                ))}
              </div>
              
              <div style={carouselCaptionStyle}>
                {carouselImages[currentImageIndex].caption}
              </div>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🛕 ದೇವಾಲಯದ ವಿನ್ಯಾಸ ಮತ್ತು ವೈಶಿಷ್ಟ್ಯಗಳು - Temple Architecture & Features</h2>
            
            <div style={gridStyle}>
              <div style={cardStyle}>
                <div style={iconStyle}>🏛️</div>
                <h3>ಮುಖ್ಯ ವಿಗ್ರಹ</h3>
                <p style={kannadaTextStyle}>
                  ಶ್ರೀ ಅನಂತಪದ್ಮನಾಭಸ್ವಾಮಿ ದೇವರ 2 ಅಡಿ ಎತ್ತರದ ನಿಂತ ವಿಗ್ರಹವು ಶಂಖ, ಚಕ್ರ ಮತ್ತು ಅಭಯ ಹಸ್ತವನ್ನು ಹೊಂದಿದ್ದು, ಅದ್ಭುತ ಶಿಲ್ಪಕಲೆಯಿಂದ ಕೂಡಿದೆ.
                </p>
              </div>
              
              <div style={cardStyle}>
                <div style={iconStyle}>🏊</div>
                <h3>ಪಾದಕೋಣೆ (Pushkarani)</h3>
                <p style={kannadaTextStyle}>
                  ದೇವಾಲಯಕ್ಕೆ ಲಗತ್ತಿಸಲಾದ ಪದ್ಮ ಸರೋವರ (ಪುಷ್ಕರಿಣಿ) ಸುತ್ತಲೂ ಮೆಟ್ಟಿಲುಗಳಿರುವ ಪವಿತ್ರ ಜಲಾಶಯವಾಗಿದೆ. ಇದನ್ನು ಮಾಧ್ವಾಚಾರ್ಯರು ತಮ್ಮ ತಾಯಿಗಾಗಿ ನಿರ್ಮಿಸಿದ್ದಾರೆ ಎಂದು ನಂಬಲಾಗಿದೆ.
                </p>
              </div>
              
              <div style={cardStyle}>
                <div style={iconStyle}>🕉️</div>
                <h3>ಸಹದೇವತೆಗಳು</h3>
                <p style={kannadaTextStyle}>
                  ದೇವಾಲಯದ ಒಳಗೆ ರುದ್ರಲಿಂಗ, ರಥೋತ್ಸವ ಕಟ್ಟೆ, ಮತ್ತು ತೀರ್ಥ ಮಂದಿರದಲ್ಲಿರುವ ಸ್ತಂಭದ ಮೇಲಿರುವ ಗಣಪತಿ ಪ್ರಮುಖ ವೈಶಿಷ್ಟ್ಯಗಳಾಗಿವೆ.
                </p>
              </div>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🎊 ವಿಶೇಷ ಉತ್ಸವಗಳು - Special Festivals</h2>
            
            <div style={timelineStyle}>
              <div style={timelineItemStyle}>
                <div style={timelineDotStyle}></div>
                <div style={timelineLineStyle}></div>
                <div style={timelineYearStyle}>ರಥೋತ್ಸವ (Rathotsava)</div>
                <p style={kannadaTextStyle}>
                  ಕುಂಭ ಮಾಸದಲ್ಲಿ 5 ದಿನಗಳ ಕಾಲ ಉತ್ಸವ ನಡೆಯುತ್ತದೆ. ಭಕ್ತರು ದೇವಾಲಯದ ಸುತ್ತಲೂ ರಥವನ್ನು ಎಳೆಯುವ ಮೂಲಕ ಭಾಗವಹಿಸುತ್ತಾರೆ. ಈ ಸಮಯದಲ್ಲಿ "ಸಾವಿರಪ್ರಂಧ" ಎಂದೂ ಕರೆಯುವ ಬಾಳೆಹಣ್ಣು ಸೇವೆ ಇನ್ನೂ ವಿಶಿಷ್ಟವಾಗಿದೆ.
                </p>
              </div>
              
              <div style={timelineItemStyle}>
                <div style={timelineDotStyle}></div>
                <div style={timelineLineStyle}></div>
                <div style={timelineYearStyle}>ಸಂಕ್ರಮಣ ಪೂಜೆ</div>
                <p style={kannadaTextStyle}>
                  ಸಿಂಹ ಮತ್ತು ಮೀನಾ ಸಂಕ್ರಮಣದ ಸಂದರ್ಭದಲ್ಲಿ ವಿಶೇಷ ಆರಾಧನೆ ಮತ್ತು ಪವಿತ್ರತೆಯೊಂದಿಗೆ ಆಚರಣೆ ನಡೆಯುತ್ತದೆ. ಭಕ್ತರು ದೂರದೂರದಿಂದ ಬಂದು ಈ ಪೂಜೆಯಲ್ಲಿ ಭಾಗವಹಿಸುತ್ತಾರೆ.
                </p>
              </div>
              
              <div style={timelineItemStyle}>
                <div style={timelineDotStyle}></div>
                <div style={timelineLineStyle}></div>
                <div style={timelineYearStyle}>ಇತರ ಪ್ರಮುಖ ಉತ್ಸವಗಳು</div>
                <p style={kannadaTextStyle}>
                  ಮಾಸಿಕ ಏಕಾದಶಿ, ಅಮಾವಾಸ್ಯೆ, ಪೂರ್ಣಿಮೆ ಮತ್ತು ಸಂಕ್ರಮಣ ದಿನಗಳಲ್ಲಿ ವಿಶೇಷ ಪೂಜೆಗಳು ನಡೆಯುತ್ತವೆ. ಕೃಷ್ಣಾಷ್ಟಮಿ ಮತ್ತು ರಾಮನವಮಿಯಲ್ಲಿ ಭವ್ಯ ಆಚರಣೆಗಳು ನಡೆಯುತ್ತವೆ.
                </p>
              </div>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🕒 ದೇವಾಲಯದ ಸಮಯಗಳು - Temple Timings</h2>
            
            <div style={infoBoxStyle}>
              <strong>ದೈನಂದಿನ ಸಮಯಗಳು:</strong><br/>
              • ಪ್ರಾತಃಕಾಲ: 6:00 AM - 12:30 PM<br/>
              • ಸಾಯಂಕಾಲ: 4:00 PM - 8:30 PM<br/><br/>
              <strong>ಪ್ರಮುಖ ಪೂಜೆಗಳು:</strong><br/>
              • ಪ್ರಾತಃ ಪೂಜೆ: 7:00 AM<br/>
              • ಮಧ್ಯಾಹ್ನದ ಪೂಜೆ: 12:30 PM<br/>
              • ಸಂಜೆ ಪೂಜೆ: 7:30 PM
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🧭 ದೇವಾಲಯಕ್ಕೆ ಹೇಗೆ ತಲುಪುವುದು - How to Reach</h2>
            
            <div style={gridStyle}>
              <div style={cardStyle}>
                <div style={iconStyle}>🚌</div>
                <h3>ಬಸ್ ಸೇವೆ</h3>
                <p style={kannadaTextStyle}>
                  ಉಡುಪಿ (20 ಕಿಮೀ) ಮತ್ತು ಮಂಗಳೂರು (60 ಕಿಮೀ) ಇಂದ ನಿಯಮಿತ ಬಸ್ ಸೇವೆ ಲಭ್ಯವಿದೆ. ಹೆಬ್ರಿಯಿಂದ 14 ಕಿಮೀ ದೂರದಲ್ಲಿದೆ.
                </p>
              </div>
              
              <div style={cardStyle}>
                <div style={iconStyle}>🚂</div>
                <h3>ರೈಲು ಸೇವೆ</h3>
                <p style={kannadaTextStyle}>
                  ಹತ್ತಿರದ ನಿಲ್ದಾಣ ಉಡುಪಿ (20 ಕಿಮೀ). ಮಂಗಳೂರು ಸೆಂಟ್ರಲ್ (60 ಕಿಮೀ) ಮತ್ತು ಮಂಗಳೂರು ಜಂಕ್ಷನ್ (65 ಕಿಮೀ) ಇಂದ ಟ್ಯಾಕ್ಸಿ ಸೇವೆ ಲಭ್ಯ.
                </p>
              </div>
              
              <div style={cardStyle}>
                <div style={iconStyle}>✈️</div>
                <h3>ವಿಮಾನ ನಿಲ್ದಾಣ</h3>
                <p style={kannadaTextStyle}>
                  ಮಂಗಳೂರು ಅಂತರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ (80 ಕಿಮೀ). ಬೆಂಗಳೂರು ಅಂತರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ (400 ಕಿಮೀ).
                </p>
              </div>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>📚 ಶಿಕ್ಷಣ ಮತ್ತು ಗ್ರಾಮೀಣ ಅಭಿವೃದ್ಧಿ - Education & Development</h2>
            
            <div style={highlightBoxStyle}>
              <strong>ಪ್ರಮುಖ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಗಳು:</strong><br/>
              • B.M ಪ್ರಾಥಮಿಕ ಶಾಲೆ (100+ ವರ್ಷಗಳ ಇತಿಹಾಸ)<br/>
              • ಪೆರ್ಡೂರು ಹೈಸ್ಕೂಲ್<br/>
              • ಇಂಡಸ್ಟ್ರಿಯಲ್ ಟ್ರೈನಿಂಗ್ ಇನ್ಸ್ಟಿಟ್ಯೂಟ್<br/>
              • ಆದರ್ಶ ಪದವಿಪೂರ್ವ ಕಾಲೇಜು (2011-12 ರಲ್ಲಿ ಸ್ಥಾಪಿತ)
            </div>
            
            <p style={paragraphStyle}>
              ದೇವಾಲಯದ ಸುತ್ತಲಿನ ಕಾಡನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಿ ಈಗ ಸಂಪೂರ್ಣ ನಗರವನ್ನಾಗಿ ಪರಿವರ್ತಿಸಲಾಗಿದೆ. ಆಧುನಿಕ ಸೌಲಭ್ಯಗಳೊಂದಿಗೆ ಪ್ರಾಚೀನ ಸಂಸ್ಕೃತಿಯನ್ನು ಸಂರಕ್ಷಿಸುವ ಪ್ರಯತ್ನ ಮಾಡಲಾಗಿದೆ.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🍽️ ಸ್ಥಳೀಯ ಆಹಾರ ಮತ್ತು ವಸತಿ - Local Food & Accommodation</h2>
            
            <div style={gridStyle}>
              <div style={cardStyle}>
                <div style={iconStyle}>🍽️</div>
                <h3>ಪ್ರಮುಖ ರೆಸ್ಟೋರೆಂಟ್‌ಗಳು</h3>
                <p style={kannadaTextStyle}>
                  • ಶ್ರೀ ಕೃಷ್ಣ ಭವನ್ (ಶುದ್ಧ ಶಾಕಾಹಾರಿ)<br/>
                  • ಡಯಾನಾ ವುಡ್‌ಲ್ಯಾಂಡ್ಸ್<br/>
                  • ಸ್ಥಳೀಯ ಉಡುಪಿ ಶೈಲಿಯ ಆಹಾರ
                </p>
              </div>
              
              <div style={cardStyle}>
                <div style={iconStyle}>🏨</div>
                <h3>ವಸತಿ ಸೌಲಭ್ಯಗಳು</h3>
                <p style={kannadaTextStyle}>
                  ದೇವಾಲಯದ ಸುತ್ತಲೂ ಗೆಸ್ಟ್ ಹೌಸ್‌ಗಳು, ಧರ್ಮಶಾಲೆಗಳು ಮತ್ತು ಹೋಟೆಲ್‌ಗಳು ಲಭ್ಯವಿದೆ. ಮುಂಚಿತವಾಗಿ ಬುಕ್ಕಿಂಗ್ ಮಾಡಿಕೊಳ್ಳುವುದು ಉತ್ತಮ.
                </p>
              </div>
              
              <div style={cardStyle}>
                <div style={iconStyle}>🛍️</div>
                <h3>ಸ್ಥಳೀಯ ಉತ್ಪಾದನೆಗಳು</h3>
                <p style={kannadaTextStyle}>
                  ಪ್ರಸಾದಮ್, ಪೂಜಾ ಸಾಮಗ್ರಿಗಳು, ಸ್ಥಳೀಯ ಕರಕುಶಲ ವಸ್ತುಗಳು ಮತ್ತು ಧಾರ್ಮಿಕ ಪುಸ್ತಕಗಳು ಲಭ್ಯವಿದೆ.
                </p>
              </div>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🌐 ಸಂಪರ್ಕ ಮಾಹಿತಿ - Contact Information</h2>
            
            <div style={infoBoxStyle}>
              <strong>ಮುಖ್ಯ ಮಾಹಿತಿ:</strong><br/>
              • ವೆಬ್‌ಸೈಟ್: perdoorshriananthapadmanabhatemple.org<br/>
              • ಸ್ಥಳ: ಪೆರ್ಡೂರು, ಉಡುಪಿ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ<br/>
              • ಪಿನ್ ಕೋಡ್: 576112<br/>
              • ಹತ್ತಿರದ ಪೋಸ್ಟ್ ಆಫೀಸ್: ಪೆರ್ಡೂರು<br/>
              • ಪೊಲೀಸ್ ಠಾಣೆ: ಹೆಬ್ರಿ<br/>
              • ಆಸ್ಪತ್ರೆ: ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆ, ಹೆಬ್ರಿ
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🔮 ಭಕ್ತರ ಅನುಭವಗಳು - Devotee Experiences</h2>
            
            <div style={highlightBoxStyle}>
              <strong>ಪ್ರಮುಖ ಮಹತ್ವ:</strong><br/>
              • ಕದಳಿಪ್ರಿಯ ಅನಂತ ಪದ್ಮನಾಭ ಸ್ವಾಮಿ - ಬಾಳೆಹಣ್ಣುಗಳಿಗೆ ವಿಶೇಷ ಪ್ರೀತಿ<br/>
              • ಇಚ್ಛಾಪೂರ್ತಿ ದೇವರು - ಭಕ್ತರ ಮನಸ್ಕಾಮನೆಗಳನ್ನು ಈಡೇರಿಸುವ ಶಕ್ತಿ<br/>
              • ಶಾಂತಿ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಅನುಭವ ಪ್ರದಾನ<br/>
              • ಐತಿಹಾಸಿಕ ಮಹತ್ವ ಮತ್ತು ಪ್ರಾಚೀನತೆ
            </div>
            
            <p style={paragraphStyle}>
              ಶತಮಾನಗಳಿಂದ ಭಕ್ತರು ಈ ಪವಿತ್ರ ಕ್ಷೇತ್ರಕ್ಕೆ ಬಂದು ತಮ್ಮ ಮನಸ್ಕಾಮನೆಗಳನ್ನು ಈಡೇರಿಸಿಕೊಂಡಿದ್ದಾರೆ. ವಿಶೇಷವಾಗಿ ಬಾಳೆಹಣ್ಣು ಸೇವೆ, ಬೆಳ್ಳಿಯ ಅಂಗಾಂಗ ಮಾದರಿಗಳ ಅರ್ಪಣೆ ಮತ್ತು ರಥೋತ್ಸವದ ಸಂದರ್ಭದಲ್ಲಿ ಭಕ್ತರು ಅದ್ಭುತ ಅನುಭವಗಳನ್ನು ಹೊಂದಿದ್ದಾರೆ.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🕊️ ಸಮಾಪನ - Conclusion</h2>
            
            <p style={kannadaTextStyle}>
              ಪೆರ್ಡೂರು ಶ್ರೀ ಅನಂತಪದ್ಮನಾಭ ಸ್ವಾಮಿ ದೇವಾಲಯವು ಕೇವಲ ಒಂದು ಪೂಜಾ ಸ್ಥಳವಲ್ಲ, ಇದು ವೈಷ್ಣವ-ಶೈವ ಸಂಸ್ಕೃತಿಯ ಸಂಯೋಜನೆಯುಳ್ಳ ಪವಿತ್ರ ಕ್ಷೇತ್ರವಾಗಿದೆ. ಶ್ರದ್ಧೆ, ಇತಿಹಾಸ, ಆಚರಣೆಗಳು ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಅನುಭವಗಳಿಂದ ಕೂಡಿದ ಈ ದೇವಾಲಯವು ಭಕ್ತರ ಹೃದಯದಲ್ಲಿ ಅಮಿತ ಸ್ಥಾನವನ್ನು ಪಡೆದಿದೆ.
            </p>
            
            <p style={paragraphStyle}>
              Whether you come for the famous Banana Seva, to witness the grand Rathotsava celebrations, or simply to experience the divine peace of this ancient temple, Perdoor Sri Ananthapadmanabha Temple offers a unique spiritual journey that connects devotees to centuries of tradition and faith.
            </p>
            
            <div style={highlightBoxStyle}>
              <strong>🙏 ಓಂ ಶ್ರೀ ಅನಂತಪದ್ಮನಾಭಾಯ ನಮಃ 🙏</strong><br/>
              <em>ಭಕ್ತರ ಮನಸ್ಕಾಮನೆಗಳನ್ನು ಈಡೇರಿಸುವ ಕೃಪಾಮಯ ದೇವರಿಗೆ ನಮಸ್ಕಾರ</em>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TempleHistoryPage;
