import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock, Star } from 'lucide-react';


const PerdoorPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Carousel images for Perdoor
  const carouselImages = [
    {
      src: "https://www.perdoorshriananthapadmanabhatemple.org/assets/theme/images/festivals/fest7.jpg",
      alt: "Perdoor Temple Complex",
      title: "Sacred Temples of Perdoor"
    },
    {
      src: "https://www.perdoorshriananthapadmanabhatemple.org/assets/theme/images/festivals/fest7.jpg",
      alt: "Perdoor Landscape",
      title: "Natural Beauty of Perdoor"
    },
    {
      src: "https://www.perdoorshriananthapadmanabhatemple.org/assets/theme/images/festivals/fest7.jpg",
      alt: "Traditional Architecture",
      title: "Heritage Architecture"
    },
    {
      src: "https://www.perdoorshriananthapadmanabhatemple.org/assets/theme/images/festivals/fest7.jpg",
      alt: "Cultural Festival",
      title: "Vibrant Cultural Heritage"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const temples = [
    {
      name: "Perdoor Sree Krishna Temple",
      description: "https://www.perdoorshriananthapadmanabhatemple.org/assets/theme/images/festivals/fest7.jpg",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      timings: "5:00 AM - 12:00 PM, 5:00 PM - 8:00 PM",
      rating: 4.8
    },
    {
      name: "Perdoor Bhagavathy Temple",
      description: "Sacred temple known for its annual festival and traditional Kerala architecture",
      image: "https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=400&h=300&fit=crop",
      timings: "5:30 AM - 11:30 AM, 5:30 PM - 8:30 PM",
      rating: 4.7
    },
    {
      name: "Perdoor Ganapathy Temple",
      description: "Ancient Ganesha temple believed to bring good fortune to devotees",
      image: "https://images.unsplash.com/photo-1609766389130-9e6d2d8d8d9b?w=400&h=300&fit=crop",
      timings: "6:00 AM - 12:00 PM, 6:00 PM - 8:00 PM",
      rating: 4.6
    }
  ];

  const touristPlaces = [
    {
      name: "Perdoor Backwaters",
      description: "Serene backwaters perfect for houseboat cruises and nature photography",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop",
      activities: ["Houseboat Tours", "Bird Watching", "Photography"]
    },
    {
      name: "Perdoor Beach",
      description: "Pristine beach with golden sand and calm waters ideal for relaxation",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      activities: ["Beach Walks", "Sunset Views", "Water Sports"]
    },
    {
      name: "Perdoor Spice Gardens",
      description: "Aromatic spice plantations showcasing Kerala's rich agricultural heritage",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
      activities: ["Spice Tours", "Cooking Classes", "Organic Shopping"]
    }
  ];

  const uniqueThings = [
    {
      title: "Traditional Kathakali Performances",
      description: "Experience the classical dance drama with elaborate costumes and makeup",
      icon: "🎭",
      highlight: "Every Friday Evening"
    },
    {
      title: "Perdoor Handloom Weaving",
      description: "Witness skilled artisans creating beautiful traditional textiles",
      icon: "🧵",
      highlight: "Live Demonstrations"
    },
    {
      title: "Ayurvedic Wellness Centers",
      description: "Authentic Ayurvedic treatments and therapies in natural settings",
      icon: "🌿",
      highlight: "Traditional Healing"
    },
    {
      title: "Local Fish Market",
      description: "Vibrant morning fish market showcasing fresh catch from Arabian Sea",
      icon: "🐟",
      highlight: "Early Morning Experience"
    }
  ];

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      lineHeight: '1.6', 
      color: '#333',
      background: 'linear-gradient(135deg, rgb(243, 231, 255) 0%, rgb(224, 242, 254) 50%, rgb(252, 228, 236) 100%)',
      minHeight: '100vh'
    }}>
      {/* CSS Animations and Media Queries */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          a:hover {
            opacity: 0.8;
          }

          /* Mobile Responsive Styles */
          @media (max-width: 768px) {
            .carousel-title {
              font-size: 2rem !important;
            }
            
            .carousel-subtitle {
              font-size: 1rem !important;
            }
            
            .section-title {
              font-size: 2rem !important;
            }
            
            .nav-button {
              width: 40px !important;
              height: 40px !important;
            }
            
            .carousel-dot {
              width: 10px !important;
              height: 10px !important;
            }
            
            .card-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            
            .card-image {
              height: 200px !important;
            }
            
            .card-padding {
              padding: 1rem !important;
            }
            
            .unique-card {
              padding: 1.5rem !important;
            }
          }

          @media (max-width: 480px) {
            .carousel-title {
              font-size: 1.5rem !important;
            }
            
            .carousel-subtitle {
              font-size: 0.9rem !important;
            }
            
            .section-title {
              font-size: 1.8rem !important;
            }
            
            .nav-button {
              width: 35px !important;
              height: 35px !important;
            }
            
            .card-image {
              height: 180px !important;
            }
            
            .unique-card {
              padding: 1rem !important;
            }
          }
        `}
      </style>

      {/* Carousel Section */}
      <section id="carousel" style={{ 
        position: 'relative', 
        height: isMobile ? '95vh' : '100vh', 
        overflow: 'hidden' 
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          marginTop: isMobile ? '66px' : '66px',
          transform: `translateX(-${currentSlide * 100}%)`
        }}>
          {carouselImages.map((img, index) => (
            <div key={index} style={{
              minWidth: '100%',
              height: '100%',
              position: 'relative',
              backgroundImage: `url(${img.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.4)'
              }} />
              <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                color: 'white',
                padding: isMobile ? '1rem' : '2rem',
                maxWidth: '90%'
              }}>
                <h2 className="carousel-title" style={{
                  fontSize: isMobile ? '2rem' : '3rem',
                  margin: '0 0 1rem 0',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  animation: 'fadeInUp 1s ease-out'
                }}>
                  {img.title}
                </h2>
                <p className="carousel-subtitle" style={{
                  fontSize: isMobile ? '1rem' : '1.2rem',
                  margin: 0,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                  animation: 'fadeInUp 1s ease-out 0.3s both'
                }}>
                  Discover the spiritual and cultural heart of Kerala
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button onClick={prevSlide} className="nav-button" style={{
          position: 'absolute',
          left: isMobile ? '10px' : '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: isMobile ? '40px' : '50px',
          height: isMobile ? '40px' : '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          transition: 'background 0.3s'
        }}>
          <ChevronLeft size={isMobile ? 20 : 24} />
        </button>

        <button onClick={nextSlide} className="nav-button" style={{
          position: 'absolute',
          right: isMobile ? '10px' : '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: isMobile ? '40px' : '50px',
          height: isMobile ? '40px' : '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          transition: 'background 0.3s'
        }}>
          <ChevronRight size={isMobile ? 20 : 24} />
        </button>

        {/* Dots Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: isMobile ? '8px' : '10px'
        }}>
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="carousel-dot"
              style={{
                width: isMobile ? '10px' : '12px',
                height: isMobile ? '10px' : '12px',
                borderRadius: '50%',
                border: 'none',
                background: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
            />
          ))}
        </div>
      </section>

      {/* Temples Section */}
      <section id="temples" style={{ 
        padding: isMobile ? '2rem 0' : '4rem 0', 
        background: 'rgba(255, 255, 255, 0.3)' 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : '0 1rem' 
        }}>
          <h2 className="section-title" style={{
            textAlign: 'center',
            fontSize: isMobile ? '2rem' : '2.5rem',
            marginBottom: isMobile ? '2rem' : '3rem',
            color: '#6b46c1',
            position: 'relative'
          }}>
            Sacred Temples
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: '#8b5cf6',
              borderRadius: '2px'
            }} />
          </h2>
          <div className="card-grid" style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: isMobile ? '1rem' : '2rem'
          }}>
            {temples.map((temple, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(107, 70, 193, 0.15)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(107, 70, 193, 0.25)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(107, 70, 193, 0.15)';
                }
              }}>
                <div className="card-image" style={{
                  height: isMobile ? '200px' : '250px',
                  backgroundImage: `url(${temple.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '20px',
                    padding: '5px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <Star size={16} fill="#ffd700" color="#ffd700" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>{temple.rating}</span>
                  </div>
                </div>
                <div className="card-padding" style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                  <h3 style={{ 
                    margin: '0 0 0.5rem 0', 
                    fontSize: isMobile ? '1.2rem' : '1.3rem', 
                    color: '#6b46c1' 
                  }}>
                    {temple.name}
                  </h3>
                  <p style={{ 
                    margin: '0 0 1rem 0', 
                    color: '#666', 
                    fontSize: isMobile ? '0.9rem' : '0.95rem' 
                  }}>
                    {temple.description}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    color: '#888', 
                    fontSize: isMobile ? '0.8rem' : '0.9rem',
                    flexWrap: 'wrap'
                  }}>
                    <Clock size={16} />
                    <span>{temple.timings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tourist Places Section */}
      <section id="tourist-places" style={{ 
        padding: isMobile ? '2rem 0' : '4rem 0', 
        background: 'rgba(255, 255, 255, 0.2)' 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : '0 1rem' 
        }}>
          <h2 className="section-title" style={{
            textAlign: 'center',
            fontSize: isMobile ? '2rem' : '2.5rem',
            marginBottom: isMobile ? '2rem' : '3rem',
            color: '#0ea5e9',
            position: 'relative'
          }}>
            Tourist Places
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: '#38bdf8',
              borderRadius: '2px'
            }} />
          </h2>
          <div className="card-grid" style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: isMobile ? '1rem' : '2rem'
          }}>
            {touristPlaces.map((place, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(14, 165, 233, 0.15)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}>
                <div className="card-image" style={{
                  height: isMobile ? '200px' : '250px',
                  backgroundImage: `url(${place.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(14, 165, 233, 0.8)',
                    color: 'white',
                    borderRadius: '20px',
                    padding: '5px 15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <MapPin size={16} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Perdoor</span>
                  </div>
                </div>
                <div className="card-padding" style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                  <h3 style={{ 
                    margin: '0 0 0.5rem 0', 
                    fontSize: isMobile ? '1.2rem' : '1.3rem', 
                    color: '#0ea5e9' 
                  }}>
                    {place.name}
                  </h3>
                  <p style={{ 
                    margin: '0 0 1rem 0', 
                    color: '#666', 
                    fontSize: isMobile ? '0.9rem' : '0.95rem' 
                  }}>
                    {place.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {place.activities.map((activity, idx) => (
                      <span key={idx} style={{
                        background: 'rgba(14, 165, 233, 0.1)',
                        color: '#0ea5e9',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: isMobile ? '0.75rem' : '0.8rem',
                        fontWeight: '500'
                      }}>
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Things Section */}
      <section id="unique-things" style={{ 
        padding: isMobile ? '2rem 0' : '4rem 0', 
        background: 'rgba(236, 72, 153, 0.1)' 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : '0 1rem' 
        }}>
          <h2 className="section-title" style={{
            textAlign: 'center',
            fontSize: isMobile ? '2rem' : '2.5rem',
            marginBottom: isMobile ? '2rem' : '3rem',
            color: '#ec4899',
            position: 'relative'
          }}>
            Unique Experiences
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: '#f472b6',
              borderRadius: '2px'
            }} />
          </h2>
          <div className="card-grid" style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? '1rem' : '2rem'
          }}>
            {uniqueThings.map((thing, index) => (
              <div key={index} className="unique-card" style={{
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '15px',
                padding: isMobile ? '1.5rem' : '2rem',
                textAlign: 'center',
                transition: 'transform 0.3s ease, background 0.3s ease',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 25px rgba(236, 72, 153, 0.15)'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                }
              }}>
                <div style={{ 
                  fontSize: isMobile ? '2.5rem' : '3rem', 
                  marginBottom: '1rem' 
                }}>
                  {thing.icon}
                </div>
                <h3 style={{ 
                  margin: '0 0 1rem 0', 
                  fontSize: isMobile ? '1.2rem' : '1.3rem', 
                  color: '#ec4899' 
                }}>
                  {thing.title}
                </h3>
                <p style={{ 
                  margin: '0 0 1rem 0', 
                  color: '#666', 
                  fontSize: isMobile ? '0.9rem' : '0.95rem' 
                }}>
                  {thing.description}
                </p>
                <div style={{
                  background: 'rgba(236, 72, 153, 0.1)',
                  color: '#ec4899',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  display: 'inline-block',
                  fontSize: isMobile ? '0.8rem' : '0.85rem',
                  fontWeight: 'bold'
                }}>
                  {thing.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PerdoorPage;
