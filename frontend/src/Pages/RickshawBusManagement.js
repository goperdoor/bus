import React, { useState, useEffect } from 'react';
import './RickshawBusManagement.css';

const RickshawBusManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('rickshaw');
  
  const rickshawRef = React.useRef(null);
  const carRef = React.useRef(null);
  const busRef = React.useRef(null);
  const p2bRef = React.useRef(null);
  const othersRef = React.useRef(null);

  const handleTabClick = (tabName, ref) => {
    setActiveTab(tabName);
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const [stand1Rickshaws] = useState([
    { id: 1, number: 'KA20 AC 7097', driverName: 'ವಿಜಯ', phone: '9686424495' },
  ]);
  const [stand2Rickshaws] = useState([]);
  const [stand3Rickshaws] = useState([
    { id: 1, number: 'UNKNOWN', driverName: 'ಅನಿಲ್ ಕುಮಾರ್', phone: '8747887655' },
    { id: 2, number: 'UNKNOWN', driverName: 'ಪ್ರದೀಪ ಶೆಟ್ಟಿ', phone: '9769261093' },
  ]);

  const [carStand] = useState([
    { id: 1, number: 'UNKNOWN', driverName: 'ಸುಕೇಶ್ ಶೆಟ್ಟಿ', phone: '9743638002' },
  ]);

  const [touristBusesData] = useState([
    { id: 1, name: 'Bhagavathi Tourist', capacity: 40, route: 'Any (Tourist Bus)', facilities: ['Push-back Seats', 'AC Seater'], contactNumber: '+91 97400 05170', fareRange: 'Based on Trip' },
    { id: 2, name: 'Kavya Holidays', capacity: 49, route: 'Any (Tourist Bus)', facilities: ['DJ System', 'Push-back Seats', 'Friendly Staff', 'Experienced Driver', 'Well-maintained Bus', 'Sound System', 'Light System'], contactNumber: '+91 94482 34585', fareRange: 'Based on Trip' },
    { id: 3, name: 'Karavali Travel Solution', capacity: 49, route: 'Any (Tourist Bus)', facilities: ['DJ System', 'Push-back Seats', 'Friendly Staff', 'Experienced Driver', 'Well-maintained Bus', 'Sound System', 'Light System'], contactNumber: '+91 90085 25333', fareRange: 'Based on Trip' },
    { id: 4, name: 'Mookambika Holidays', capacity: 40, route: 'Any (Tourist Bus)', facilities: ['DJ System', 'Push-back Seats', 'Friendly Staff', 'Experienced Driver', 'Well-maintained Bus', 'Sound System', 'Light System'], contactNumber: '+91 81474 31529', fareRange: 'Based on Trip' },
    { id: 5, name: 'Sheethal Holidays', capacity: 33, route: 'Any (Tourist Bus)', facilities: ['DJ System', 'Push-back Seats', 'Friendly Staff', 'Experienced Driver', 'Well-maintained Bus', 'Sound System', 'Light System'], contactNumber: '95917 22657', fareRange: 'Based on Trip' },
    { id: 6, name: 'Varija Holidays', capacity: 25, route: 'Any (Tourist Bus)', facilities: ['DJ System', 'Push-back Seats', 'Friendly Staff', 'Experienced Driver', 'Well-maintained Bus', 'Sound System', 'Light System'], contactNumber: '+91 99803 80206', fareRange: 'Based on Trip' },
    { id: 7, name: 'Karavali Holidays', capacity: 21, route: 'Any (Tourist Bus)', facilities: ['DJ System', 'Push-back Seats', 'Friendly Staff', 'Experienced Driver', 'Well-maintained Bus', 'Sound System', 'Light System'], contactNumber: '+91 73493 43133', fareRange: 'Based on Trip' },
    { id: 8, name: 'Mahakali Holidays', capacity: 14, route: 'Any (Tourist Bus)', facilities: ['DJ System', 'Push-back Seats', 'Friendly Staff', 'Experienced Driver', 'Well-maintained Bus', 'Sound System', 'Light System'], contactNumber: '99865 15839', fareRange: 'Based on Trip' },
    { id: 9, name: 'SDM Tourist, Hebri', capacity: 40, route: 'Any (Tourist Bus)', facilities: ['Push-back Seats', 'AC Seater', 'Friendly Staff', 'Well-maintained Bus'], contactNumber: '7019614226', fareRange: 'Based on Trip' },
    { id: 10, name: 'Sri Durgaparameshwari - Ayyappa Tourist, Hebri', capacity: '13 seater (TT) / 21 seater Mini Bus', route: 'Any (Tourist Bus)', facilities: ['Friendly Staff', 'Experienced Driver', 'Well-maintained Bus', 'Sound System', 'Light System'], contactNumber: '94805 71771', fareRange: 'Based on Trip' },
  ]);

  const getRandomizedBuses = () => {
    return [...touristBusesData].sort(() => Math.random() - 0.5);
  };

  const [p2bServices] = useState([
    {
      id: 1,
      name: 'Bhagavathi Tourist',
      from: 'Perdoor (8:20 PM)',
      to: 'Bangalore',
      contactNumber: '+91 97400 05170',
      bookingLink: 'https://www.bhagavathibus.in',
      msgShort: 'Also available in Redbus, abhibus',
      facilities: ['Non AC Sleeper', 'Charging Points', 'Live Tracking', 'Well-maintained Bus', 'Experienced Driver'],
    },
    {
      id: 2,
      name: 'Sugama Tourist - APM',
      from: 'Perdoor (8:25 PM)',
      to: 'Bangalore',
      contactNumber: '7019614226 / 9481748911',
      bookingLink: 'https://www.sugamabus.com',
      msgShort: 'Also available in Redbus, abhibus',
      facilities: ['AC', 'On board Washroom', 'Charging Points', 'Live Tracking', 'Well-maintained Bus', 'Experienced Driver'],
    },
  ]);

  const CarTable = ({ title, cars }) => (
    <div className="rickshaw-stand-card">
      <h2 className="stand-title">{title}</h2>
      <div className="table-container">
        <table className="rickshaw-table">
          <thead>
            <tr>
              <th>Car Number</th>
              <th>Owner Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-data">No cars available at this stand</td>
              </tr>
            ) : (
              cars.map((car) => (
                <tr key={car.id}>
                  <td>{car.number}</td>
                  <td>{car.driverName}</td>
                  <td>
                    <a href={`tel:${car.phone}`} className="phone-link">📞 {car.phone}</a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const RickshawTable = ({ title, rickshaws }) => (
    <div className="rickshaw-stand-card">
      <h2 className="stand-title">{title}</h2>
      <div className="table-container">
        <table className="rickshaw-table">
          <thead>
            <tr>
              <th>Rickshaw Number</th>
              <th>Driver Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rickshaws.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-data">No rickshaws available at this stand</td>
              </tr>
            ) : (
              rickshaws.map((rickshaw) => (
                <tr key={rickshaw.id}>
                  <td>{rickshaw.number}</td>
                  <td>{rickshaw.driverName}</td>
                  <td>
                    <a href={`tel:${rickshaw.phone}`} className="phone-link">📞 {rickshaw.phone}</a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="rickshaw-management-page">
      <div className="page-container">
        <div className="hero-header">
          <h1 className="page-title">🚖 Travel Management</h1>
          
        
          <div className="tabs-container" role="tablist" aria-label="Sections">
            <button className={`tab-button ${activeTab === 'rickshaw' ? 'active' : ''}`} role="tab" aria-selected={activeTab === 'rickshaw'} aria-controls="tab-panel-rickshaw" onClick={() => handleTabClick('rickshaw', rickshawRef)}>Rickshaw Stands</button>
            <button className={`tab-button ${activeTab === 'car' ? 'active' : ''}`} role="tab" aria-selected={activeTab === 'car'} aria-controls="tab-panel-car" onClick={() => handleTabClick('car', carRef)}>Car Stand</button>
            <button className={`tab-button ${activeTab === 'bus' ? 'active' : ''}`} role="tab" aria-selected={activeTab === 'bus'} aria-controls="tab-panel-bus" onClick={() => handleTabClick('bus', busRef)}>Tourist Bus Services</button>
            <button className={`tab-button ${activeTab === 'p2b' ? 'active' : ''}`} role="tab" aria-selected={activeTab === 'p2b'} aria-controls="tab-panel-p2b" onClick={() => handleTabClick('p2b', p2bRef)}>Perdoor → Bangalore</button>
            <button className={`tab-button ${activeTab === 'others' ? 'active' : ''}`} role="tab" aria-selected={activeTab === 'others'} aria-controls="tab-panel-others" onClick={() => handleTabClick('others', othersRef)}>Others</button>
             <button type="button" onClick={() => window.open('https://forms.gle/5KUnkXEG5QnZfPot6', '_blank')} className="submit-button">📌 Submit Your Vehicle Info</button>
          </div>
          {/* <p className="submit-description">
            <h3 className="submit-title">🚖 Are you a rickshaw driver, taxi owner, or tourist bus operator?</h3>
            Help us add new vehicles by submitting this form.
          </p> */}
         
        </div>

        {activeTab === 'rickshaw' && (
          <div ref={rickshawRef} id="tab-panel-rickshaw" className="section-container" role="tabpanel" aria-label="Rickshaw Stands">
            <h2 className="section-heading">Rickshaw Stands</h2>
            <RickshawTable title="Stand 1 - ಕೆಳಪೇಟೆ ಆಟೋ ನಿಲ್ದಾಣ" rickshaws={stand1Rickshaws} />
            <RickshawTable title="Stand 2 - ಮಲ್ಪೇಟೆ ಆಟೋ ನಿಲ್ದಾಣ" rickshaws={stand2Rickshaws} />
            <RickshawTable title="Stand 3 - ದೇವಾಲಯದ ಬಳಿ" rickshaws={stand3Rickshaws} />
          </div>
        )}

        {activeTab === 'car' && (
          <div ref={carRef} id="tab-panel-car" className="section-container" role="tabpanel" aria-label="Car Stand">
            <h2 className="section-heading">🚗 Car Stand</h2>
            <CarTable title="ಕಾರ್ ನಿಲ್ದಾಣ - ಮಲ್ಪೇಟೆ" cars={carStand} />
          </div>
        )}

        {activeTab === 'bus' && (
          <div ref={busRef} id="tab-panel-bus" className="section-container" role="tabpanel" aria-label="Tourist Bus Services">
            <h2 className="section-heading">🚌 Tourist Bus Services</h2>
            <div className="bus-grid">
              {getRandomizedBuses().map((bus) => (
                <div key={bus.id} className="bus-card">
                  <h3 className="bus-name">{bus.name}</h3>
                  <div className="bus-details">
                    <div className="detail-row"><span className="detail-label">Capacity:</span><span className="detail-value">{bus.capacity} passengers</span></div>
                    <div className="detail-row"><span className="detail-label">Route:</span><span className="detail-value">{bus.route || 'On Request'}</span></div>
                    <div className="detail-row"><span className="detail-label">Fare:</span><span className="detail-value fare">{bus.fareRange}</span></div>
                    <div className="detail-row"><span className="detail-label">Contact:</span>{bus.contactNumber ? (<a href={`tel:${bus.contactNumber}`} className="phone-link">📞 {bus.contactNumber}</a>) : (<span className="detail-value">Call for details</span>)}</div>
                  </div>
                  <div className="facilities-section">
                    <h4 className="facilities-title">Facilities:</h4>
                    <div className="facilities-tags">
                      {bus.facilities.map((facility, index) => (<span key={index} className="facility-tag">{facility}</span>))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'p2b' && (
          <div ref={p2bRef} id="tab-panel-p2b" className="section-container" role="tabpanel" aria-label="Perdoor to Bangalore">
            <h2 className="section-heading">🚌 Perdoor → Bangalore</h2>
            <div className="bus-grid">
              {p2bServices.map((service) => (
                <div key={service.id} className="bus-card">
                  <h3 className="bus-name">{service.name}</h3>
                  <div className="bus-details">
                    <div className="detail-row"><span className="detail-label">From:</span><span className="detail-value">{service.from}</span></div>
                    <div className="detail-row"><span className="detail-label">To:</span><span className="detail-value">{service.to}</span></div>
                    <div className="detail-row"><span className="detail-label">Contact:</span>{service.contactNumber ? (<a href={`tel:${service.contactNumber}`} className="phone-link">📞 {service.contactNumber}</a>) : (<span className="detail-value">Call for details</span>)}</div>
                    <div className="detail-row"><span className="detail-label">Booking:</span>{service.bookingLink ? (<a href={service.bookingLink} target="_blank" rel="noopener noreferrer" className="phone-link">🔗 Book Now</a>) : (<span className="detail-value">Link not available</span>)}</div>
                    <div className="detail-row"><span className="detail-label">Info:</span><span className="detail-value">{service.msgShort}</span></div>
                  </div>
                  <div className="facilities-section">
                    <h4 className="facilities-title">Facilities:</h4>
                    <div className="facilities-tags">
                      {service.facilities.map((facility, index) => (
                        <span key={index} className="facility-tag">{facility}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="rickshaw-stand-card" style={{ marginTop: '20px' }}>
              <p className="submit-description">Operate on this route? Add your service to help commuters find you.</p>
              <button type="button" onClick={() => window.open('https://forms.gle/5KUnkXEG5QnZfPot6', '_blank')} className="submit-button">Add Your Route</button>
            </div> */}
          </div>
        )}

        {activeTab === 'others' && (
          <div ref={othersRef} id="tab-panel-others" className="section-container" role="tabpanel" aria-label="Other Services">
            <h2 className="section-heading">📚 Others</h2>
            {/* <div className="rickshaw-stand-card">
              <p className="submit-description">Other transport services and information will appear here. Share details to help the community.</p>
              <button type="button" onClick={() => window.open('https://forms.gle/5KUnkXEG5QnZfPot6', '_blank')} className="submit-button">Submit Other Service</button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default RickshawBusManagement;
