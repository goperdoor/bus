import React from 'react';
import { Code, Smartphone, Globe, Zap, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';
import './AboutUs.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


export default function AboutUs() {
useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const services = [
    {
      icon: <Globe className="service-icon" />,
      title: "Custom Websites",
      description: "Tailored web solutions built from scratch to match your unique business needs"
    },
    {
      icon: <Smartphone className="service-icon" />,
      title: "Mobile-First Design",
      description: "Responsive designs that work flawlessly across all devices and screen sizes"
    },
    {
      icon: <Code className="service-icon" />,
      title: "Modern Technologies",
      description: "React, Node.js, and cutting-edge frameworks for fast, scalable applications"
    },
    {
      icon: <Zap className="service-icon" />,
      title: "Lightning Fast",
      description: "Optimized performance with quick loading times and smooth user experiences"
    }
  ];

  const features = [
    "Custom Web Development",
    "E-commerce Solutions",
    "Progressive Web Apps",
    "API Integration",
    "Database Design",
    "SEO Optimization",
    "Maintenance & Support",
    "Performance Optimization"
  ];

  const stats = [
    { number: "100+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "24/7", label: "Support Available" },
    { number: "99%", label: "Client Satisfaction" }
  ];

  return (
    <div className="about-us-container">
      <div className="max-width-container">
        
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-icon-container">
            <Code className="hero-icon" />
          </div>
          <h1 className="hero-title">
            About Our <span className="highlight">Web Development</span> Team
          </h1>
          <p className="hero-description">
            We are passionate web developers ready to bring your digital vision to life. 
            From simple landing pages to complex web applications, we create stunning, 
            functional websites that drive results.
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">
                {stat.number}
              </div>
              <div className="stat-label">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="main-content-grid">
          
          {/* Left Column - About Content */}
          <div className="content-column">
            <div className="content-card">
              <div className="card-header">
                <Users className="card-header-icon" />
                <h2 className="card-title">Who We Are</h2>
              </div>
              <p className="card-text">
               We are Anvith Shetty and Rohan Shetty, a dedicated duo of web developers with a passion for creating 
                exceptional digital experiences. Our expertise spans across modern web 
                technologies, ensuring your website is not just beautiful, but also 
                functional and future-proof.
              </p>
              <p className="card-text">
                Whether you need a simple business website, an e-commerce platform, 
                or a complex web application, we have the skills and experience to 
                deliver outstanding results that exceed your expectations.
              </p>
            </div>

            <div className="content-card">
              <div className="card-header">
                <Award className="card-header-icon" />
                <h2 className="card-title">Our Expertise</h2>
              </div>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <CheckCircle className="feature-icon" />
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Services */}
          <div className="content-column">
            <div className="content-card">
              <h2 className="card-title">Our Services</h2>
              <div className="services-list">
                {services.map((service, index) => (
                  <div key={index} className="service-item">
                    <div className="service-icon-container">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="service-title">
                        {service.title}
                      </h3>
                      <p className="service-description">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="why-choose-section">
          <div className="why-choose-header">
            <h2 className="why-choose-title">
              Why Choose Our Web Development Services?
            </h2>
            <p className="why-choose-description">
              We combine technical expertise with creative vision to deliver websites 
              that not only look amazing but also perform exceptionally well.
            </p>
          </div>

          <div className="why-choose-grid">
            <div className="why-choose-item">
              <div className="why-choose-icon-container">
                <Zap className="why-choose-icon" />
              </div>
              <h3 className="why-choose-item-title">Fast Delivery</h3>
              <p className="why-choose-item-description">Quick turnaround without compromising quality</p>
            </div>
            
            <div className="why-choose-item">
              <div className="why-choose-icon-container">
                <Users className="why-choose-icon" />
              </div>
              <h3 className="why-choose-item-title">Client-Focused</h3>
              <p className="why-choose-item-description">Your success is our priority in every project</p>
            </div>
            
            <div className="why-choose-item">
              <div className="why-choose-icon-container">
                <Award className="why-choose-icon" />
              </div>
              <h3 className="why-choose-item-title">Quality Assured</h3>
              <p className="why-choose-item-description">Rigorous testing and ongoing support</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <h2 className="cta-title">
            Ready to Build Your Dream Website?
          </h2>
          <p className="cta-description">
            Let's discuss your project and create a website that perfectly represents 
            your brand and achieves your business goals.
          </p>
         
<Link to="/ContactForm#scroll">
  <button className="cta-button">
    Get Started Today
    <ArrowRight className="cta-button-icon" />
  </button>
</Link>
        </div>
      </div>
    </div>
  );
}
