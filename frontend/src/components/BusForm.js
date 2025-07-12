import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const defaultState = {
  busName: '',
  busNumber: '',
  destination: '',
  arrivalTime: '',
  departureTime: '',
  availability: 'daily',
  active: true,
};

const BusForm = ({ show, onHide, onSaved, editBus }) => {
  const [formData, setFormData] = useState(defaultState);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editBus) {
      setFormData({ ...editBus });
    } else {
      setFormData(defaultState);
    }
  }, [editBus]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editBus) {
        await axios.put(`/api/buses/${editBus._id}`, formData);
      } else {
        await axios.post('/api/buses', formData);
      }
      onSaved();
      onHide();
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving bus');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editBus ? 'Edit Bus' : 'Add Bus'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-2">
            <Col xs={12} md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Bus Name</Form.Label>
                <Form.Control
                  name="busName"
                  value={formData.busName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Bus Number</Form.Label>
                <Form.Control
                  name="busNumber"
                  value={formData.busNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group className="mb-2">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-2">
                <Form.Label>Arrival Time (HH:mm)</Form.Label>
                <Form.Control
                  type="time"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-2">
                <Form.Label>Departure Time (HH:mm)</Form.Label>
                <Form.Control
                  type="time"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-2">
                <Form.Label>Availability</Form.Label>
                <Form.Select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                >
                  <option value="daily">Daily</option>
                  <option value="weekdays">Weekdays</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={6} className="d-flex align-items-end">
              <Form.Check
                type="checkbox"
                label="Active"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <div className="d-grid mt-3">
            <Button type="submit" variant="success" disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BusForm;