import React from 'react';
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
  return (
    
      <div className="App">
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
