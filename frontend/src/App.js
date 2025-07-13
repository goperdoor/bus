
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import PerdoorTempleHistory from './Pages/PerdoorTempleHistory'
import './App.css';
import ContactUs from './Pages/ContactUs'
import PerdoorPage from './Pages/PerdoorPage'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import Header from './components/BusTimingHeader';
import Footer from './components/Footer';
import WisdomWall from './Pages/WisdomWall';


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
        backgroundColor: '#ffffff',
        fontFamily: 'sans-serif'
      }
    : {};

  return (
    
      <div className="App" style={containerStyle}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/PerdoorTempleHistory" element={<PerdoorTempleHistory />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/PerdoorPage" element={<PerdoorPage />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/WisdomWall" element={<WisdomWall />} />
        </Routes>
        <Footer />
      </div>

  );
}

export default App;
