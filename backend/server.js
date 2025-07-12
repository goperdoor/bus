const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment');
const Bus = require('./models/Bus');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/perdoor-bus-timing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Helper function to check if bus is available today
const isBusAvailableToday = (availability) => {
  const today = moment().day();
  if (availability === 'daily') return true;
  if (availability === 'weekdays' && today >= 1 && today <= 5) return true;
  return false;
};

// Helper function to get upcoming buses
const getUpcomingBuses = (buses) => {
  const now = moment();
  const currentTime = now.format('HH:mm');
  
  return buses
    .filter(bus => bus.active && isBusAvailableToday(bus.availability))
    .map(bus => {
      const leavingTime = moment(bus.leavingTimeFromPerdoor, 'HH:mm');
      const arrivalTime = moment(bus.arrivalTimeToPerdoor, 'HH:mm');
      
      // Calculate next departure time
      let nextDeparture = leavingTime.clone();
      if (nextDeparture.isBefore(now)) {
        nextDeparture.add(1, 'day');
      }
      
      return {
        ...bus.toObject(),
        nextDeparture: nextDeparture.format('HH:mm'),
        minutesUntilDeparture: nextDeparture.diff(now, 'minutes')
      };
    })
    .sort((a, b) => a.minutesUntilDeparture - b.minutesUntilDeparture);
};

// PUBLIC ROUTES

// Get all destinations
app.get('/api/destinations', async (req, res) => {
  try {
    const destinations = await Bus.distinct('destination', { active: true });
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search buses by destination
app.get('/api/buses/search', async (req, res) => {
  try {
    const { destination } = req.query;
    
    if (!destination) {
      return res.status(400).json({ error: 'Destination is required' });
    }
    
    const buses = await Bus.find({
      destination: new RegExp(destination, 'i'),
      active: true
    });
    
    if (buses.length === 0) {
      return res.json({ message: 'No buses found for this destination', buses: [] });
    }
    
    const upcomingBuses = getUpcomingBuses(buses);
    res.json({ buses: upcomingBuses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADMIN ROUTES

// Get all buses (admin)
app.get('/api/admin/buses', async (req, res) => {
  try {
    const buses = await Bus.find().sort({ createdAt: -1 });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new bus (admin)
app.post('/api/admin/buses', async (req, res) => {
  try {
    const bus = new Bus(req.body);
    const savedBus = await bus.save();
    res.status(201).json(savedBus);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Bus number already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Update bus (admin)
app.put('/api/admin/buses/:id', async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedBus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    
    res.json(updatedBus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete bus (admin)
app.delete('/api/admin/buses/:id', async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);
    
    if (!deletedBus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    
    res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bus by ID (admin)
app.get('/api/admin/buses/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    
    res.json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});