import React, { useState } from 'react';
import { Calendar, MapPin, Crown, Star, Clock, Users, Camera } from 'lucide-react';

const PerdoorTempleHistory = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const timelineEvents = [
    {
      year: '12th Century',
      title: 'Foundation Era',
      description: 'The temple was established during the reign of the Hoysala dynasty, marking the beginning of its spiritual journey.'
    },
    {
      year: '15th Century',
      title: 'Architectural Expansion',
      description: 'Major renovations and expansions were undertaken, adding intricate carvings and sculptures.'
    },
    {
      year: '18th Century',
      title: 'Cultural Renaissance',
      description: 'The temple became a center for cultural activities and religious festivals.'
    },
    {
      year: '20th Century',
      title: 'Modern Restoration',
      description: 'Comprehensive restoration efforts preserved the ancient glory for future generations.'
    }
  ];

  const features = [
    {
      icon: <Crown style={{ width: '24px', height: '24px' }} />,
      title: 'Royal Heritage',
      description: 'Built under royal patronage with exquisite craftsmanship'
    },
    {
      icon: <Star style={{ width: '24px', height: '24px' }} />,
      title: 'Sacred Traditions',
      description: 'Centuries-old rituals and festivals celebrated annually'
    },
    {
      icon: <Users style={{ width: '24px', height: '24px' }} />,
      title: 'Community Hub',
      description: 'Center of spiritual and cultural activities for devotees'
    },
    {
      icon: <Camera style={{ width: '24px', height: '24px' }} />,
      title: 'Architectural Marvel',
      description: 'Stunning stone carvings and traditional temple architecture'
    }
  ];

  const festivals = [
    {
      title: 'Maha Shivaratri',
      period: 'February/March',
      description: 'The grand festival celebrating Lord Shiva with night-long prayers and special abhishekams.',
      gradient: 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
    },
    {
      title: 'Navaratri',
      period: 'September/October',
      description: 'Nine nights of divine celebration with classical dance performances and devotional music.',
      gradient: 'linear-gradient(135deg, #EC4899, #DC2626)'
    },
    {
      title: 'Kartik Purnima',
      period: 'November',
      description: 'Festival of lights celebrating the full moon with special pujas and community feasts.',
      gradient: 'linear-gradient(135deg, #EAB308, #EA580C)'
    }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF7ED, #FFFBEB, #FEF2F2)'
    },
    hero: {
      position: 'relative',
      background: 'linear-gradient(135deg, #EA580C, #DC2626, #EC4899)',
      color: 'white',
      overflow: 'hidden'
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    heroContent: {
      position: 'relative',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '80px 24px',
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: '4rem',
      fontWeight: 'bold',
      marginBottom: '24px',
      background: 'linear-gradient(135deg, #FEF3C7, #FED7AA)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    heroSubtitle: {
      fontSize: '1.5rem',
      marginBottom: '32px',
      color: '#FED7AA'
    },
    heroMeta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      fontSize: '1.125rem',
      flexWrap: 'wrap'
    },
    heroMetaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    heroBottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '80px',
      background: 'linear-gradient(to top, #FFF7ED, transparent)'
    },
    navigation: {
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
      borderBottom: '4px solid #FED7AA'
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    navList: {
      display: 'flex',
      gap: '32px',
      overflowX: 'auto'
    },
    navButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '16px 24px',
      borderBottom: '2px solid transparent',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: 'transparent',
      whiteSpace: 'nowrap'
    },
    navButtonActive: {
      borderBottomColor: '#EA580C',
      color: '#EA580C',
      backgroundColor: '#FFF7ED'
    },
    navButtonInactive: {
      color: '#6B7280'
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '64px 24px'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '24px',
      textAlign: 'center'
    },
    sectionSubtitle: {
      fontSize: '1.25rem',
      color: '#6B7280',
      lineHeight: '1.75',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '32px',
      marginTop: '64px'
    },
    featureCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #FED7AA',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    featureIcon: {
      color: '#EA580C',
      marginBottom: '16px',
      transition: 'transform 0.3s ease'
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '12px'
    },
    featureDescription: {
      color: '#6B7280',
      lineHeight: '1.5'
    },
    highlightBox: {
      background: 'linear-gradient(135deg, #FED7AA, #FEF3C7)',
      borderRadius: '24px',
      padding: '48px',
      textAlign: 'center',
      marginTop: '64px'
    },
    highlightTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '24px'
    },
    highlightText: {
      fontSize: '1.125rem',
      color: '#374151',
      lineHeight: '1.75',
      maxWidth: '800px',
      margin: '0 auto'
    },
    timeline: {
      position: 'relative',
      marginTop: '64px'
    },
    timelineLine: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '4px',
      height: '100%',
      background: 'linear-gradient(to bottom, #FB923C, #EF4444)'
    },
    timelineEvent: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '48px'
    },
    timelineEventReverse: {
      flexDirection: 'row-reverse'
    },
    timelineContent: {
      width: '50%',
      padding: '0 48px'
    },
    timelineCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #FED7AA',
      transition: 'all 0.3s ease'
    },
    timelineYear: {
      color: '#EA580C',
      fontWeight: 'bold',
      fontSize: '1.125rem',
      marginBottom: '8px'
    },
    timelineTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '16px'
    },
    timelineDescription: {
      color: '#6B7280',
      lineHeight: '1.75'
    },
    timelineDot: {
      position: 'relative'
    },
    timelineDotCircle: {
      width: '24px',
      height: '24px',
      backgroundColor: '#EA580C',
      borderRadius: '50%',
      border: '4px solid white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    timelineSpacer: {
      width: '50%'
    },
    archGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '48px',
      marginTop: '64px'
    },
    archColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    },
    archCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #FED7AA'
    },
    archCardTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '16px'
    },
    archCardText: {
      color: '#6B7280',
      lineHeight: '1.75'
    },
    festivalsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '32px',
      marginTop: '64px'
    },
    festivalCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #FED7AA',
      transition: 'all 0.3s ease'
    },
    festivalHeader: {
      height: '128px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    festivalTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center'
    },
    festivalContent: {
      padding: '24px'
    },
    festivalPeriod: {
      color: '#EA580C',
      fontWeight: '600',
      marginBottom: '8px'
    },
    festivalDescription: {
      color: '#6B7280',
      lineHeight: '1.75'
    },
    footer: {
      background: 'linear-gradient(135deg, #1F2937, #111827)',
      color: 'white',
      padding: '48px 0',
      textAlign: 'center'
    },
    footerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    footerTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '16px'
    },
    footerSubtitle: {
      color: '#D1D5DB',
      marginBottom: '24px'
    },
    footerMeta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px',
      fontSize: '0.875rem',
      flexWrap: 'wrap'
    },
    footerMetaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  };

  // Add hover effects
  const handleFeatureHover = (e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
    const icon = e.currentTarget.querySelector('.feature-icon');
    if (icon) icon.style.transform = 'scale(1.1)';
  };

  const handleFeatureLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    const icon = e.currentTarget.querySelector('.feature-icon');
    if (icon) icon.style.transform = 'scale(1)';
  };

  const handleNavHover = (e) => {
    if (!e.currentTarget.classList.contains('active')) {
      e.currentTarget.style.color = '#EA580C';
      e.currentTarget.style.borderBottomColor = '#FED7AA';
    }
  };

  const handleNavLeave = (e) => {
    if (!e.currentTarget.classList.contains('active')) {
      e.currentTarget.style.color = '#6B7280';
      e.currentTarget.style.borderBottomColor = 'transparent';
    }
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Perdoor Temple</h1>
          <p style={styles.heroSubtitle}>A Sacred Journey Through Time and Devotion</p>
          <div style={styles.heroMeta}>
            <div style={styles.heroMetaItem}>
              <MapPin style={{ width: '20px', height: '20px' }} />
              <span>Karnataka, India</span>
            </div>
            <div style={styles.heroMetaItem}>
              <Calendar style={{ width: '20px', height: '20px' }} />
              <span>12th Century</span>
            </div>
          </div>
        </div>
        <div style={styles.heroBottom}></div>
      </div>

      {/* Navigation */}
      <div style={styles.navigation}>
        <div style={styles.navContainer}>
          <nav style={styles.navList}>
            {[
              { id: 'overview', label: 'Overview', icon: <Star style={{ width: '16px', height: '16px' }} /> },
              { id: 'history', label: 'History', icon: <Clock style={{ width: '16px', height: '16px' }} /> },
              { id: 'architecture', label: 'Architecture', icon: <Crown style={{ width: '16px', height: '16px' }} /> },
              { id: 'festivals', label: 'Festivals', icon: <Users style={{ width: '16px', height: '16px' }} /> }
            ].map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                onMouseEnter={handleNavHover}
                onMouseLeave={handleNavLeave}
                className={activeSection === id ? 'active' : ''}
                style={{
                  ...styles.navButton,
                  ...(activeSection === id ? styles.navButtonActive : styles.navButtonInactive)
                }}
              >
                {icon}
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div>
            <div style={{ marginBottom: '64px' }}>
              <h2 style={styles.sectionTitle}>Temple Overview</h2>
              <p style={styles.sectionSubtitle}>
                Perdoor Temple stands as a magnificent testament to Karnataka's rich spiritual heritage, 
                blending ancient architectural brilliance with profound religious significance. This sacred 
                sanctuary has welcomed devotees for over eight centuries, serving as a beacon of faith and 
                cultural preservation.
              </p>
            </div>

            <div style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  style={styles.featureCard}
                  onMouseEnter={handleFeatureHover}
                  onMouseLeave={handleFeatureLeave}
                >
                  <div className="feature-icon" style={styles.featureIcon}>
                    {feature.icon}
                  </div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>

            <div style={styles.highlightBox}>
              <h3 style={styles.highlightTitle}>Sacred Significance</h3>
              <p style={styles.highlightText}>
                The temple is dedicated to Lord Shiva and houses several ancient deities. It serves as a 
                spiritual center where traditional rituals, classical music, and dance performances create 
                an atmosphere of divine serenity. The temple's spiritual energy draws thousands of devotees 
                seeking blessings and inner peace.
              </p>
            </div>
          </div>
        )}

        {/* History Section */}
        {activeSection === 'history' && (
          <div>
            <div style={{ marginBottom: '64px' }}>
              <h2 style={styles.sectionTitle}>Historical Timeline</h2>
              <p style={styles.sectionSubtitle}>
                Journey through the centuries of Perdoor Temple's remarkable history
              </p>
            </div>

            <div style={styles.timeline}>
              <div style={styles.timelineLine}></div>
              
              {timelineEvents.map((event, index) => (
                <div 
                  key={index} 
                  style={{
                    ...styles.timelineEvent,
                    ...(index % 2 === 1 ? styles.timelineEventReverse : {})
                  }}
                >
                  <div style={styles.timelineContent}>
                    <div style={styles.timelineCard}>
                      <div style={styles.timelineYear}>{event.year}</div>
                      <h3 style={styles.timelineTitle}>{event.title}</h3>
                      <p style={styles.timelineDescription}>{event.description}</p>
                    </div>
                  </div>
                  <div style={styles.timelineDot}>
                    <div style={styles.timelineDotCircle}></div>
                  </div>
                  <div style={styles.timelineSpacer}></div>
                </div>
              ))}
            </div>

            <div style={{
              ...styles.highlightBox,
              background: 'linear-gradient(135deg, #FECACA, #FED7AA)'
            }}>
              <h3 style={styles.highlightTitle}>Legacy of Faith</h3>
              <p style={styles.highlightText}>
                Throughout its existence, Perdoor Temple has weathered the storms of time while maintaining 
                its spiritual essence. The temple has been a witness to the rise and fall of empires, yet 
                its devotional atmosphere remains unchanged, continuing to inspire generations of worshippers.
              </p>
            </div>
          </div>
        )}

        {/* Architecture Section */}
        {activeSection === 'architecture' && (
          <div>
            <div style={{ marginBottom: '64px' }}>
              <h2 style={styles.sectionTitle}>Architectural Marvel</h2>
              <p style={styles.sectionSubtitle}>
                Discover the intricate craftsmanship and divine artistry of Perdoor Temple
              </p>
            </div>

            <div style={styles.archGrid}>
              <div style={styles.archColumn}>
                <div style={styles.archCard}>
                  <h3 style={styles.archCardTitle}>Dravidian Style</h3>
                  <p style={styles.archCardText}>
                    The temple showcases classic Dravidian architecture with its towering gopurams, 
                    intricate stone carvings, and perfectly proportioned sanctum sanctorum. Every 
                    pillar tells a story through its detailed sculptures.
                  </p>
                </div>
                <div style={styles.archCard}>
                  <h3 style={styles.archCardTitle}>Sacred Geometry</h3>
                  <p style={styles.archCardText}>
                    The temple's layout follows ancient Vastu Shastra principles, creating a harmonious 
                    balance between the physical and spiritual realms. The geometric precision reflects 
                    the mathematical knowledge of ancient builders.
                  </p>
                </div>
              </div>
              <div style={styles.archColumn}>
                <div style={styles.archCard}>
                  <h3 style={styles.archCardTitle}>Stone Carvings</h3>
                  <p style={styles.archCardText}>
                    Master craftsmen have adorned the temple with exquisite stone carvings depicting 
                    mythological stories, celestial beings, and floral motifs. Each carving represents 
                    hours of meticulous work and artistic devotion.
                  </p>
                </div>
                <div style={styles.archCard}>
                  <h3 style={styles.archCardTitle}>Mandapa Halls</h3>
                  <p style={styles.archCardText}>
                    The temple features multiple mandapas (halls) with ornate pillars and ceiling 
                    sculptures. These spaces serve as gathering areas for devotees and venues for 
                    religious ceremonies and cultural performances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Festivals Section */}
        {activeSection === 'festivals' && (
          <div>
            <div style={{ marginBottom: '64px' }}>
              <h2 style={styles.sectionTitle}>Sacred Festivals</h2>
              <p style={styles.sectionSubtitle}>
                Experience the vibrant celebrations that bring the temple to life
              </p>
            </div>

            <div style={styles.festivalsGrid}>
              {festivals.map((festival, index) => (
                <div key={index} style={styles.festivalCard}>
                  <div style={{
                    ...styles.festivalHeader,
                    background: festival.gradient
                  }}>
                    <h3 style={styles.festivalTitle}>{festival.title}</h3>
                  </div>
                  <div style={styles.festivalContent}>
                    <div style={styles.festivalPeriod}>{festival.period}</div>
                    <p style={styles.festivalDescription}>{festival.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              ...styles.highlightBox,
              background: 'linear-gradient(135deg, #E9D5FF, #FBCFE8)'
            }}>
              <h3 style={styles.highlightTitle}>Cultural Heritage</h3>
              <p style={styles.highlightText}>
                The festivals at Perdoor Temple are not just religious observances but celebrations of 
                cultural heritage. They bring together communities, preserve ancient traditions, and 
                create lasting memories for devotees who travel from far and wide to participate in 
                these sacred celebrations.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <h3 style={styles.footerTitle}>Visit Perdoor Temple</h3>
          <p style={styles.footerSubtitle}>
            Experience the divine serenity and rich heritage of this sacred sanctuary
          </p>
          <div style={styles.footerMeta}>
            <div style={styles.footerMetaItem}>
              <Clock style={{ width: '16px', height: '16px' }} />
              <span>Open Daily: 5:00 AM - 9:00 PM</span>
            </div>
            <div style={styles.footerMetaItem}>
              <MapPin style={{ width: '16px', height: '16px' }} />
              <span>Karnataka, India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PerdoorTempleHistory;