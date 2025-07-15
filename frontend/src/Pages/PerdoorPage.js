import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock, Star } from 'lucide-react';

const PerdoorPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel images for Perdoor
  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&h=600&fit=crop",
      alt: "Perdoor Temple Complex",
      title: "Sacred Temples of Perdoor"
    },
    {
      src: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=1200&h=600&fit=crop",
      alt: "Perdoor Landscape",
      title: "Natural Beauty of Perdoor"
    },
    {
      src: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200&h=600&fit=crop",
      alt: "Traditional Architecture",
      title: "Heritage Architecture"
    },
    {
      src: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1200&h=600&fit=crop",
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
      description: "Ancient temple dedicated to Lord Krishna with beautiful murals and traditional architecture",
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
      {/* CSS Animations */}
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
        `}
      </style>

      {/* Carousel Section */}
      <section id="carousel" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          marginTop:'80px',
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
                padding: '2rem'
              }}>
                <h2 style={{
                  fontSize: '3rem',
                  margin: '0 0 1rem 0',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  animation: 'fadeInUp 1s ease-out'
                }}>
                  {img.title}
                </h2>
                <p style={{
                  fontSize: '1.2rem',
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
        <button onClick={prevSlide} style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          transition: 'background 0.3s'
        }}>
          <ChevronLeft size={24} />
        </button>

        <button onClick={nextSlide} style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          transition: 'background 0.3s'
        }}>
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px'
        }}>
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: '12px',
                height: '12px',
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
      <section id="temples" style={{ padding: '4rem 0', background: 'rgba(255, 255, 255, 0.3)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem',
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
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
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(107, 70, 193, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(107, 70, 193, 0.15)';
              }}>
                <div style={{
                  height: '250px',
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
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem', color: '#6b46c1' }}>{temple.name}</h3>
                  <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.95rem' }}>{temple.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '0.9rem' }}>
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
      <section id="tourist-places" style={{ padding: '4rem 0', background: 'rgba(255, 255, 255, 0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem',
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
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
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}>
                <div style={{
                  height: '250px',
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
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem', color: '#0ea5e9' }}>{place.name}</h3>
                  <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.95rem' }}>{place.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {place.activities.map((activity, idx) => (
                      <span key={idx} style={{
                        background: 'rgba(14, 165, 233, 0.1)',
                        color: '#0ea5e9',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
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
      <section id="unique-things" style={{ padding: '4rem 0', background: 'rgba(236, 72, 153, 0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem',
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {uniqueThings.map((thing, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center',
                transition: 'transform 0.3s ease, background 0.3s ease',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 25px rgba(236, 72, 153, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{thing.icon}</div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem', color: '#ec4899' }}>{thing.title}</h3>
                <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.95rem' }}>
                  {thing.description}
                </p>
                <div style={{
                  background: 'rgba(236, 72, 153, 0.1)',
                  color: '#ec4899',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  display: 'inline-block',
                  fontSize: '0.85rem',
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
