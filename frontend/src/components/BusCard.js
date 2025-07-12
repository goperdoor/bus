import React from 'react';
import { Card, Badge } from 'react-bootstrap';

function formatMinutes(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins} min`;
  return `${hrs}h ${mins}m`;
}

const BusCard = ({ bus }) => {
  const diffMinutes = Math.round(bus.nextArrivalDiff / 60000);

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <span>{bus.busName} ({bus.busNumber})</span>
          {bus.availability === 'weekdays' && <Badge bg="info">Weekdays</Badge>}
        </Card.Title>
        <Card.Text className="mb-1">
          Destination: <strong>{bus.destination}</strong>
        </Card.Text>
        <Card.Text className="mb-1">
          Arrives at Perdoor: <strong>{bus.arrivalTime}</strong>
        </Card.Text>
        <Card.Text className="mb-1">
          Leaves Perdoor: <strong>{bus.departureTime}</strong>
        </Card.Text>
        <Card.Text className="text-success fw-bold">
          {diffMinutes === 0 ? 'Arriving now' : `Arrives in ${formatMinutes(diffMinutes)}`}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BusCard;