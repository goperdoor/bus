import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import BusCard from '../components/BusCard';

function Home() {
  const [destination, setDestination] = useState('');
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!destination.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get(`/api/buses/search`, {
        params: { destination: destination.trim() },
      });
      setBuses(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="g-2 align-items-center justify-content-center">
          <Col xs={8} sm={6} md={4}>
            <Form.Control
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : 'Search'}
            </Button>
          </Col>
        </Row>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {buses.map((bus) => (
        <BusCard key={bus._id} bus={bus} />
      ))}
    </div>
  );
}

export default Home;