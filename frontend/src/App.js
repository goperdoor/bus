
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import PerdoorTempleHistory from './Pages/PerdoorTempleHistory'
import './App.css';
import ContactForm from './Pages/ContactForm'
import PerdoorPage from './Pages/PerdoorPage'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import Header from './components/BusTimingHeader';
import Footer from './components/Footer';
import WisdomWall from './Pages/WisdomWall';
import AboutUs from './Pages/AboutUs';

function App() {
  const [isPWA, setIsPWA] = useState(false);
   useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         window.navigator.standalone === true;
    setIsPWA(isStandalone);
  }, []);
  const containerStyle = isPWA
    ? {
        maxWidth: '480px',
        width: '100%',
        margin: '0 auto',
        height: '100vh',
        overflowY: 'auto',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
 
        fontFamily: 'sans-serif'
      }
    : {};

  return (
    
      <div className="App" style={containerStyle}  style={{
    background: 'linear-gradient(135deg, rgb(243, 231, 255) 0%, rgb(224, 242, 254) 50%, rgb(252, 228, 236) 100%)'
  }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/PerdoorTempleHistory" element={<PerdoorTempleHistory />} />
          <Route path="/ContactForm" element={<ContactForm />} />
          <Route path="/PerdoorPage" element={<PerdoorPage />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/WisdomWall" element={<WisdomWall />} />
  <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>

  );
}

export default App;
