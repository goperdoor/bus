import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import BusForm from '../components/BusForm';

function Admin() {
  const [buses, setBuses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBus, setEditBus] = useState(null);

  const fetchBuses = async () => {
    const res = await axios.get('/api/buses');
    setBuses(res.data);
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this bus?')) return;
    await axios.delete(`/api/buses/${id}`);
    fetchBuses();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Manage Buses</h3>
        <Button onClick={() => { setEditBus(null); setShowForm(true); }}>
          Add Bus
        </Button>
      </div>

      <Table bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Destination</th>
            <th>Arrival</th>
            <th>Departure</th>
            <th>Availability</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus._id}>
              <td>{bus.busName}</td>
              <td>{bus.busNumber}</td>
              <td>{bus.destination}</td>
              <td>{bus.arrivalTime}</td>
              <td>{bus.departureTime}</td>
              <td>{bus.availability}</td>
              <td>{bus.active ? 'Yes' : 'No'}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => { setEditBus(bus); setShowForm(true); }}
                >
                  Edit
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(bus._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showForm && (
        <BusForm
          show={showForm}
          onHide={() => setShowForm(false)}
          onSaved={fetchBuses}
          editBus={editBus}
        />
      )}
    </div>
  );
}

export default Admin;